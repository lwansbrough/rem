'use strict';

require('instapromise');

const path = require('path');
const fs = require('fs');

const SETTINGS_KEY = 'rem';
const REACT_NATIVE_PATH_KEY = 'reactNativePath';
const REM_MODULE_KEY = 'module';
const REM_BUCK_RULE_KEY = 'rem_build';

const APP_DEFAULT_ANDROID_PATH = './android';
const APP_DEFAULT_IOS_PATH = './ios';
const MODULE_DEFAULT_ANDROID_PATH = './android';
const MODULE_DEFAULT_IOS_PATH = './ios';
const APP_DEFAULT_REACT_NATIVE_PATH = 'node_modules/react-native';
const MODULE_DEFAULT_REACT_NATIVE_PATH = '../react-native';

class Settings {

  constructor(baseDirectory, manifest) {
    let options = manifest[SETTINGS_KEY] || {};
    this.npm = manifest;
    this.isRemEnabled = !!manifest[SETTINGS_KEY];
    this.isModule = !!options[REM_MODULE_KEY];
    this.baseDirectory = baseDirectory;
    this.reactNativePath = path.resolve(
      baseDirectory,
      options[REACT_NATIVE_PATH_KEY] || (this.isModule ? MODULE_DEFAULT_REACT_NATIVE_PATH : APP_DEFAULT_REACT_NATIVE_PATH)
    );
  }
  
  static generateAppSettings() {
    return {
      [REACT_NATIVE_PATH_KEY]: APP_DEFAULT_REACT_NATIVE_PATH,
      targetDirectories: {
        android: APP_DEFAULT_ANDROID_PATH,
        ios: APP_DEFAULT_IOS_PATH
      }
    }
  }
  
  static generateModuleSettings() {
    return {
      [REM_MODULE_KEY]: true,
      [REACT_NATIVE_PATH_KEY]: MODULE_DEFAULT_REACT_NATIVE_PATH,
      targetDirectories: {
        android: MODULE_DEFAULT_ANDROID_PATH,
        ios: MODULE_DEFAULT_IOS_PATH
      }
    }
  }

  /**
   * Loads the configuration settings from the package.json file in the current
   * working directory.
   */
  static async loadAsync() {
    let baseDirectory = process.cwd();
    let packageJSONPath = path.resolve(baseDirectory, 'package.json');
    let packageJSON = await fs.promise.readFile(packageJSONPath, 'utf8');
    let manifest = JSON.parse(packageJSON);
    return new Settings(baseDirectory, manifest);
  }
}

export default Settings;