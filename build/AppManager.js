'use strict';

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

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

var _templatesApp = require('./templates/app');

var _Settings = require('./Settings');

var _Settings2 = _interopRequireDefault(_Settings);

var AppManager = (function () {
  function AppManager(settings) {
    _classCallCheck(this, AppManager);

    this.settings = settings;
  }

  _createClass(AppManager, [{
    key: 'createProject',
    value: _asyncToGenerator(function* (config) {
      // We could use this.settings.npm but we should refetch it to ensure we're getting the most
      // recent changes (user could have left the terminal idle while performing other tasks)
      var packageJSONPath = _path2['default'].join(this.settings.baseDirectory, 'package.json');
      var packageJSON = JSON.parse((yield readAsync(packageJSONPath)));

      packageJSON.rem = _Settings2['default'].generateAppSettings();

      yield _fs2['default'].promise.writeFile(packageJSONPath, JSON.stringify(packageJSON, null, 2), 'utf8');

      return yield (0, _templatesApp.build)(config, this.settings.baseDirectory);
    })
  }, {
    key: 'installModule',
    value: _asyncToGenerator(function* (npmName) {
      var _this = this;

      // 1. Check if module exists in node_modules, if not then install it
      var moduleDir = _path2['default'].join(this.settings.baseDirectory, 'node_modules', npmName);
      try {
        yield _fs2['default'].promise.access();
      } catch (error) {
        yield new _Promise(function (resolve, reject) {
          var options = { cwd: directory };
          child_process.exec(`npm install ${ npmName }`, options, function (processError, stdout, stderr) {
            if (processError) {
              var _error = new Error('Could not create Podfile:\n' + stdout);
              _error.cause = processError;
              _error.stdout = stdout;
              _error.stderr = stderr;
              reject(_error);
            } else {
              resolve({ stdout: stdout, stderr: stderr });
            }
          });
        });
      }
      // 2. Open the module's package.json
      var packageJSONPath = _path2['default'].join(moduleDir, 'package.json');
      var packageJSON = JSON.parse((yield readAsync(packageJSONPath)));
      // 3. Check the package.json for the "rem" key (use the constant provided by Settings)
      // and verify that it is a rem module
      if (!packageJSON.rem || !packageJSON.rem.module) {
        return console.error("Unable to install module via rem, it does not appear to be rem-enabled.");
      }
      // 4. Read the targetDirectories object to determine the location of the various target
      // sources.
      var appTargetDirectories = this.settings.npm.rem.targetDirectories;
      var moduleTargetDirectories = packageJSON.rem.targetDirectories;
      // 5. For each target directory of the current app (apps and modules both have a targetDirectories object)
      // add the corresponding BUCK file from the module's target directory to the app's BUCK file dependencies
      var appSupportedTargets = _Object$keys(appTargetDirectories);
      appSupportedTargets.forEach(function (target) {
        var targetDirectory = moduleTargetDirectories[target];
        if (!targetDirectory) {
          return console.warn(`Target "${ target }" is unsupported by ${ npmName }`);
        }
        var moduleTargetBuckPath = _path2['default'].join(moduleDir, targetDirectory);
        var appTargetBuckPath = _path2['default'].join(_this.settings.baseDirectory, appTargetDirectories[target]);
        var buckDependencyPath = _path2['default'].relative(appTargetBuckPath, moduleTargetBuckPath);
        var buckDependency = `//${ buckDependencyPath }/:${ _Settings2['default'].MODULE_BUCK_RULE_KEY }`;
        console.log(buckDependency);
      });
    })
  }, {
    key: 'isInitialized',
    value: function isInitialized() {
      return this.settings.isRemEnabled;
    }
  }, {
    key: 'isApp',
    value: function isApp() {
      return !this.settings.isModule;
    }
  }]);

  return AppManager;
})();

exports['default'] = AppManager;
module.exports = exports['default'];
//# sourceMappingURL=sourcemaps/AppManager.js.map