const fs = require('fs');
import path from 'path';
import walk from 'walk';
import mkdirp from 'mkdirp';

const sourcePath = path.join(__dirname, 'src');

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

function walkerErrorHandler(root, nodeStatsArray, next) {
  nodeStatsArray.forEach(n => {
    console.error(`[ERROR] ${n.name}`);
    console.error(n.error.message || (n.error.code + ": " + n.error.path));
  });
  next();
}

function createWalkerFileHandler(config, directory) {
  
  return async (root, stat, next) => {
    let originalPath = path.join(root, stat.name);
    delete require.cache[originalPath];
    let template = require(originalPath);
    let relativePath = root.replace(sourcePath, '.');
    let finalPath = path.join(directory, relativePath);

    // Ensure Android's Java files are added into a folder structure matching the package identifier
    if (relativePath === './android/src/main/java') {
      finalPath = path.join(finalPath, config.android.packageIdentifier.replace(new RegExp('\\.', 'g'), '/'));
    }
    
    let lastDotIndex = stat.name.lastIndexOf('.');
    let extension = stat.name.slice(lastDotIndex);
    if (extension === '.js') {
      stat.name = stat.name.slice(0, lastDotIndex);
    }
  
    await writeAsync(finalPath, stat.name, template(config));
    next(); 
  }
}

export async function build(config, directory) {
  
  let walkerFileHandler = createWalkerFileHandler(config, directory);
  
  return new Promise((resolve, reject) => {
    let walker = walk.walk(sourcePath);
    walker.on('file', walkerFileHandler);
    walker.on('errors', walkerErrorHandler);
    walker.on('end', resolve);
  });
}