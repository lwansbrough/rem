import fs from 'fs';
import path from 'path';
import { build } from './templates/module';
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

export default class ModuleManager {
  
  constructor(settings) {
    this.settings = settings;
  }
  
  async createProject(config) {
    let packageJSONPath = path.join(this.settings.baseDirectory, 'package.json');
    let packageJSON = JSON.parse(await readAsync(packageJSONPath));
    
    packageJSON.rem = Settings.generateModuleSettings();
    
    packageJSON.scripts = packageJSON.scripts || {};
    
    let postinstall = `bash -c 'cd ../../ && (rem install ${config.npmName} || echo \"Install rem then reinstall this package.\")'`;
    
    if (packageJSON.scripts.postinstall) {
      console.warn("Combining postinstall scripts -- please verify this has been handled correctly once the build has completed.");
      packageJSON.scripts.postinstall = `(${packageJSON.scripts.postinstall}) && (${postinstall})`;
    }
    else {
      packageJSON.scripts.postinstall = postinstall;
    }
    
    await fs.promise.writeFile(packageJSONPath, JSON.stringify(packageJSON, null, 2), 'utf8');
    
    return await build(config, this.settings.baseDirectory);
  }
  
  isInitialized() {
    return this.settings.isRemEnabled;
  }
  
  isModule() {
    return this.settings.isModule;
  }
}