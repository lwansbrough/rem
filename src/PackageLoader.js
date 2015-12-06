import fs from 'fs';
import path from 'path';

async function getAllPackages(nodeModulesDirectory) {
  return new Promise((resolve, reject) => {
    fs.readdir(nodeModulesDirectory, (err, files) => {
      if (err) return reject(err);
      resolve(files);
    });
  });
}

async function readJSONFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, { encoding: 'utf8' }, (err, data) => {
      if (err) return reject(err);
      resolve(JSON.parse(data));
    });
  });
}

export async function getProjectPackage(rootDirectory) {
  return await readJSONFile(path.join(rootDirectory, 'package.json'));
}

export async function getREMCompatiblePackages(nodeModulesDirectory) {
  let packageFiles = await getAllPackages(nodeModulesDirectory);
  let packageConfigFiles = packageFiles.map(f => path.join(nodeModulesDirectory, f, 'package.json'));
  let packageConfigs = await Promise.all(packageConfigFiles.map(readJSONFile));
  return packageConfigs.filter(p => !!p.nativePackage);
}

export function filterByTarget(packages, target) {
  let packagesByTarget = packages
    .filter(p => !!p.nativePackage)
    .reduce((obj, pack) => {
      Object.keys(pack.nativePackage.targetDirectories).forEach(t => {
        obj[t] = obj[t] || [];
        obj[t].push(pack);
      });
      return obj;
    }, {});
  return packagesByTarget[target];
}