'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
require('instapromise');

const child_process = require('child_process');
const path = require('path');
const fs = require('fs');

const templates = require('./templates');

var BuckLoader = (function () {
  function BuckLoader(settings) {
    _classCallCheck(this, BuckLoader);

    this.settings = settings;
  }

  /**
   * Reads the BUCK file in the given directory, creating one if it doesn't exist,
   * and returns its contents
   */

  _createClass(BuckLoader, [{
    key: 'readEnsuredAsync',
    value: _asyncToGenerator(function* () {
      var directory = this.settings.xcodeProjectDirectory;
      var contents = yield this.readAsync(directory);
      if (contents) {
        return contents;
      }

      yield this.createAsync(directory);
      contents = this.readAsync(directory);
      if (!contents) {
        throw new Error('Created a Podfile but was unable to read its contents');
      }
      return contents;
    })

    /**
     * Reads the BUCK file in the given directory and returns its contents, or null
     * if it doesn't exist
     */
  }, {
    key: 'readAsync',
    value: _asyncToGenerator(function* () {
      var directory = this.settings.xcodeProjectDirectory;
      var buckPath = path.join(directory, 'BUCK');
      try {
        return yield fs.promise.readFile(buckPath, 'utf8');
      } catch (error) {
        if (error.code === 'ENOENT') {
          return null;
        }
        throw error;
      }
    })

    /**
     * Writes the BUCK file in the given directory.
     */
  }, {
    key: 'writeAsync',
    value: _asyncToGenerator(function* (contents) {
      var directory = this.settings.xcodeProjectDirectory;
      var buckPath = path.join(directory, 'BUCK');
      yield fs.promise.writeFile(buckPath, contents, 'utf8');
    })

    /**
     * Creates a module BUCK file in the given directory.
     */
  }, {
    key: 'createModuleAsync',
    value: function createModuleAsync(directory) {
      return new _Promise(function (resolve, reject) {
        var options = { cwd: directory };
        child_process.exec('pod init', options, function (processError, stdout, stderr) {
          if (processError) {
            var error = new Error('Could not create BUCK file:\n' + stdout);
            error.cause = processError;
            error.stdout = stdout;
            error.stderr = stderr;
            reject(error);
          } else {
            resolve({ stdout: stdout, stderr: stderr });
          }
        });
      });
    }
  }]);

  return BuckLoader;
})();

exports['default'] = BuckLoader;
module.exports = exports['default'];
//# sourceMappingURL=sourcemaps/BuckLoader.js.map