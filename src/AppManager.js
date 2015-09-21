import fs from 'fs';
import path from 'path';
import { build } from './templates/app';
import Settings from './Settings';

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

export default class AppManager {
  
  constructor(settings) {
    this.settings = settings;
  }
  
  async createProject(config) {
    // We could use this.settings.npm but we should refetch it to ensure we're getting the most
    // recent changes (user could have left the terminal idle while performing other tasks)
    let packageJSONPath = path.join(this.settings.baseDirectory, 'package.json');
    let packageJSON = JSON.parse(await readAsync(packageJSONPath));
    
    packageJSON.rem = Settings.generateAppSettings();

    await fs.promise.writeFile(packageJSONPath, JSON.stringify(packageJSON, null, 2), 'utf8');
    
    return await build(config, this.settings.baseDirectory);
  }
  
  async installModule(npmName) {
    // 1. Check if module exists in node_modules, if not then install it
    let moduleDir = path.join(this.settings.baseDirectory, 'node_modules', npmName);
    try {
      await fs.promise.access(moduleDir);
    } catch (error) {
      await new Promise((resolve, reject) => {
        let options = { cwd: directory };
        child_process.exec(`npm install ${npmName}`, options, (processError, stdout, stderr) => {
          if (processError) {
            let error = new Error(`Could not install ${npmName}:\n` + stdout);
            error.cause = processError;
            error.stdout = stdout;
            error.stderr = stderr;
            reject(error);
          } else {
            resolve({stdout, stderr});
          }
        });
      });
    }
    // 2. Open the module's package.json
    let packageJSONPath = path.join(moduleDir, 'package.json');
    let packageJSON = JSON.parse(await readAsync(packageJSONPath));
    // 3. Check the package.json for the "rem" key (use the constant provided by Settings)
    // and verify that it is a rem module
    if (!packageJSON.rem || !packageJSON.rem.module) {
      return console.error("Unable to install module via rem, it does not appear to be rem-enabled.")
    }
    // 4. Read the targetDirectories object to determine the location of the various target
    // sources.
    let appTargetDirectories = this.settings.npm.rem.targetDirectories;
    let moduleTargetDirectories = packageJSON.rem.targetDirectories;
    // 5. For each target directory of the current app (apps and modules both have a targetDirectories object)
    // add the corresponding BUCK file from the module's target directory to the app's BUCK file dependencies
    let appSupportedTargets = Object.keys(appTargetDirectories);
    appSupportedTargets.forEach(target => {
      let targetDirectory = moduleTargetDirectories[target];
      if (!targetDirectory) {
        return console.warn(`Target "${target}" is unsupported by ${npmName}`);
      }
      let moduleTargetBuckPath = path.join(moduleDir, targetDirectory);
      let appTargetBuckPath = path.join(this.settings.baseDirectory, appTargetDirectories[target]);
      let buckDependencyPath = path.relative(appTargetBuckPath, moduleTargetBuckPath);
      let buckDependency = `//${buckDependencyPath}/:${Settings.MODULE_BUCK_RULE_KEY}`;
      console.log(buckDependency);
    });
  }
  
  isInitialized() {
    return this.settings.isRemEnabled;
  }
  
  isApp() {
    return !this.settings.isModule;
  }
}