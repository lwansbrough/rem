import fs from 'fs';
import path from 'path';
import buckDefinitionsTemplate from './templates/rem/DEFS';

export function buildDefinitionsForTargets(targets, nodeModulesDirectory) {
  let dependencies = {};
  Object.keys(targets).forEach(t => {
    dependencies[t] = targets[t].packages.map(p => `/${nodeModulesDirectory}/${p.name}/${p.nativePackage.targetDirectories[t]}:`);
  });
   
  return buckDefinitionsTemplate(dependencies);
}

export async function writeDefinitions(definitions, remDirectory) {
  let buckPath = path.join(remDirectory, 'DEFS');
  return new Promise((resolve, reject) => {
    fs.mkdir(remDirectory, function (err) {
      if (err) return reject(err);
      fs.writeFile(buckPath, definitions, {
        encoding: 'utf8'
      }, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  });
}