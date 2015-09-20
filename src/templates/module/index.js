const fs = require('fs');
import path from 'path';
import walk from 'walk';
import mkdirp from 'mkdirp';

const sourcePath = path.join(__dirname, 'src');

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
    mkdirp(directory, async (err) => {
      if (err) return reject(err);
      let filePath = path.join(directory, filename);
      await fs.promise.writeFile(filePath, contents, 'utf8');
      resolve();
    });
  });
}

function fixPath(config, path) {
  let keys = Object.keys(config);
  keys.forEach((key) => {
    path = path.replace(`__${key}__`, config[key]);
  });
  return path;
}

function walkerErrorHandler(root, nodeStatsArray, next) {
  nodeStatsArray.forEach(n => {
    console.error(`[ERROR] ${n.name}`);
    console.error(n.error.message || (n.error.code + ": " + n.error.path));
  });
  next();
}

function createWalkerFileHandler(config, directory) {
  let pathConfig = {
    moduleName: config.moduleName,
    moduleNameAndroid: config.android.moduleName,
    moduleNameIOS: config.ios.moduleName
  };
  
  return async (root, stat, next) => {
    let template = require(path.join(root, stat.name));
    let relativePath = root.replace(sourcePath, '.');
    let finalPath = path.join(process.cwd(), relativePath);
    
    if (relativePath === './android/src/main/java') {
      finalPath = path.join(finalPath, config.android.packageIdentifier.replace(new RegExp('\\.', 'g'), '/'));
    }
    
    let fixedPath = fixPath(pathConfig, finalPath);
    let fixedFilename = fixPath(pathConfig, stat.name);
    
    let lastDotIndex = fixedFilename.lastIndexOf('.');
    let extension = fixedFilename.slice(lastDotIndex);
    if (extension === '.js') {
      fixedFilename = fixedFilename.slice(0, lastDotIndex);
    }
  
    await writeAsync(fixedPath, fixedFilename, template(config));
    next(); 
  }
}

export async function build(config, directory) {
  
  let walkerFileHandler = createWalkerFileHandler(config, directory);
  
  return new Promise((resolve, reject) => {
    let walker = walk.walk(path.join(__dirname, 'src'), { followLinks: false });
    walker.on('file', walkerFileHandler);
    walker.on('errors', walkerErrorHandler);
    walker.on('end', resolve);
  });
}