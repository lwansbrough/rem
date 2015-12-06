'use strict';

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.buildDefinitionsForTargets = buildDefinitionsForTargets;

var writeDefinitions = _asyncToGenerator(function* (definitions, remDirectory) {
  var buckPath = _path2['default'].join(remDirectory, 'DEFS');
  return new _Promise(function (resolve, reject) {
    _fs2['default'].mkdir(remDirectory, function (err) {
      if (err) return reject(err);
      _fs2['default'].writeFile(buckPath, definitions, {
        encoding: 'utf8'
      }, function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  });
});

exports.writeDefinitions = writeDefinitions;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _templatesRemDEFS = require('./templates/rem/DEFS');

var _templatesRemDEFS2 = _interopRequireDefault(_templatesRemDEFS);

function buildDefinitionsForTargets(targets, nodeModulesDirectory) {
  var dependencies = {};
  _Object$keys(targets).forEach(function (t) {
    dependencies[t] = targets[t].packages.map(function (p) {
      return '/' + nodeModulesDirectory + '/' + p.name + '/' + p.nativePackage.targetDirectories[t] + ':';
    });
  });

  return (0, _templatesRemDEFS2['default'])(dependencies);
}
//# sourceMappingURL=sourcemaps/BuckManager.js.map