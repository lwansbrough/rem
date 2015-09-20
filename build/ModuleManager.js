'use strict';

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var readAsync = _asyncToGenerator(function* (path) {
  try {
    return yield _fs2['default'].promise.readFile(path, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _templatesModule = require('./templates/module');

var _Settings = require('./Settings');

var _Settings2 = _interopRequireDefault(_Settings);

var ModuleManager = (function () {
  function ModuleManager(settings) {
    _classCallCheck(this, ModuleManager);

    this.settings = settings;
  }

  _createClass(ModuleManager, [{
    key: 'createProject',
    value: _asyncToGenerator(function* (config) {
      var packageJSONPath = _path2['default'].join(this.settings.baseDirectory, 'package.json');
      var packageJSON = JSON.parse((yield readAsync(packageJSONPath)));

      packageJSON.rem = _Settings2['default'].generateModuleSettings();

      packageJSON.scripts = packageJSON.scripts || {};

      var postinstall = `bash -c 'cd ../../ && (rem install ${ config.npmName } || echo \"Install rem then reinstall this package.\")'`;

      if (packageJSON.scripts.postinstall) {
        console.warn("Combining postinstall scripts -- please verify this has been handled correctly once the build has completed.");
        packageJSON.scripts.postinstall = `(${ packageJSON.scripts.postinstall }) && (${ postinstall })`;
      } else {
        packageJSON.scripts.postinstall = postinstall;
      }

      yield _fs2['default'].promise.writeFile(packageJSONPath, JSON.stringify(packageJSON, null, 2), 'utf8');

      return yield (0, _templatesModule.build)(config, this.settings.baseDirectory);
    })
  }, {
    key: 'isInitialized',
    value: function isInitialized() {
      return this.settings.isRemEnabled;
    }
  }, {
    key: 'isModule',
    value: function isModule() {
      return this.settings.isModule;
    }
  }]);

  return ModuleManager;
})();

exports['default'] = ModuleManager;
module.exports = exports['default'];
//# sourceMappingURL=sourcemaps/ModuleManager.js.map