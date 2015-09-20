'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
require('instapromise');

const path = require('path');
const fs = require('fs');

const SETTINGS_KEY = 'rem';
const REACT_NATIVE_PATH_KEY = 'reactNativePath';
const REM_MODULE_KEY = 'module';

const APP_DEFAULT_ANDROID_PATH = './android';
const APP_DEFAULT_IOS_PATH = './ios';
const APP_DEFAULT_REACT_NATIVE_PATH = 'node_modules/react-native';
const MODULE_DEFAULT_REACT_NATIVE_PATH = '../react-native';

var Settings = (function () {
  function Settings(baseDirectory, manifest) {
    _classCallCheck(this, Settings);

    var options = manifest[SETTINGS_KEY] || {};
    this.npm = manifest;
    this.isRemEnabled = !!manifest[SETTINGS_KEY];
    this.isModule = !!options[REM_MODULE_KEY];
    this.baseDirectory = baseDirectory;
    this.reactNativePath = path.resolve(baseDirectory, options[REACT_NATIVE_PATH_KEY] || (this.isModule ? MODULE_DEFAULT_REACT_NATIVE_PATH : APP_DEFAULT_REACT_NATIVE_PATH));
  }

  _createClass(Settings, null, [{
    key: 'generateModuleSettings',
    value: function generateModuleSettings() {
      var _ref;

      return (_ref = {}, _defineProperty(_ref, REM_MODULE_KEY, true), _defineProperty(_ref, REACT_NATIVE_PATH_KEY, MODULE_DEFAULT_REACT_NATIVE_PATH), _defineProperty(_ref, 'targetDirectories', {
        android: APP_DEFAULT_ANDROID_PATH,
        ios: APP_DEFAULT_IOS_PATH
      }), _ref);
    }

    /**
     * Loads the configuration settings from the package.json file in the current
     * working directory.
     */
  }, {
    key: 'loadAsync',
    value: _asyncToGenerator(function* () {
      var baseDirectory = process.cwd();
      var packageJSONPath = path.resolve(baseDirectory, 'package.json');
      var packageJSON = yield fs.promise.readFile(packageJSONPath, 'utf8');
      var manifest = JSON.parse(packageJSON);
      return new Settings(baseDirectory, manifest);
    })
  }]);

  return Settings;
})();

exports['default'] = Settings;
module.exports = exports['default'];
//# sourceMappingURL=sourcemaps/Settings.js.map