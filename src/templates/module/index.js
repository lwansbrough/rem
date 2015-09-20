const fs = require('fs');
import path from 'path';
import walk from 'walk';
import mkdirp from 'mkdirp';

async function readAsync(path) {
  try {
    return await fs.promise.readFile(path, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

async function writeAsync(directory, filename, contents) {
  return new Promise((resolve, reject) => {
    mkdirp(directory, async (err, success) => {
      if (err || !success) return reject(err || new Error('Failed to create directory.'));
      let filePath = path.join(directory, filename);
      await fs.promise.writeFile(filePath, contents, 'utf8');
      resolve();
    });
  });
}

function fixPath(config, path) {
  let keys = Object.keys(config);
  keys.forEach((value, key) => {
    path = path.replace(`__${key}__`, value);
  });
  return path;
}

export async function build(config, directory) {
  
  let pathConfig = {
    moduleName: config.moduleName,
    moduleNameAndroid: config.android.moduleName,
    moduleNameIOS: config.ios.moduleName
  };
  
  return new Promise((resolve, reject) => {
    let walker = walk.walk('./src', { followLinks: false });
    
    walker.on('file', async (basedir, stat, next) => {
      basedir = basedir.replace('src/templates/module/src/', '');
        
      if (basedir === 'android/src/main/java') {
        basedir += '/' + config.packageName.replace('.', '/');
      }
      
      let fixedBaseDir = fixPath(pathConfig, basedir);
      let fixedFilename = fixPath(pathConfig, filename);
      let path = `${fixedBaseDir}/${fixedFilename}`;
      let template = await readAsync(path);
      
      let lastDotIndex = path.lastIndexOf('.');
      let extension = path.slice(lastDotIndex);
      if (extension === '.js') {
        path = path.slice(0, lastDotIndex);
      }
      
      await writeAsync(fixedBaseDir, fixedFilename, template(config));
      next();
    });
    
    walker.on('end', resolve);
  });
}