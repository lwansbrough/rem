'use strict';

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var getAllPackages = _asyncToGenerator(function* (nodeModulesDirectory) {
  return new _Promise(function (resolve, reject) {
    _fs2['default'].readdir(nodeModulesDirectory, function (err, files) {
      if (err) return reject(err);
      resolve(files);
    });
  });
});

var readJSONFile = _asyncToGenerator(function* (file) {
  return new _Promise(function (resolve, reject) {
    _fs2['default'].readFile(file, { encoding: 'utf8' }, function (err, data) {
      if (err) return reject(err);
      resolve(JSON.parse(data));
    });
  });
});

var getProjectPackage = _asyncToGenerator(function* (rootDirectory) {
  return yield readJSONFile(_path2['default'].join(rootDirectory, 'package.json'));
});

exports.getProjectPackage = getProjectPackage;

var getREMCompatiblePackages = _asyncToGenerator(function* (nodeModulesDirectory) {
  var packageFiles = yield getAllPackages(nodeModulesDirectory);
  var packageConfigFiles = packageFiles.map(function (f) {
    return _path2['default'].join(nodeModulesDirectory, f, 'package.json');
  });
  var packageConfigs = yield _Promise.all(packageConfigFiles.map(readJSONFile));
  return packageConfigs.filter(function (p) {
    return !!p.nativePackage;
  });
});

exports.getREMCompatiblePackages = getREMCompatiblePackages;
exports.filterByTarget = filterByTarget;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function filterByTarget(packages, target) {
  var packagesByTarget = packages.filter(function (p) {
    return !!p.nativePackage;
  }).reduce(function (obj, pack) {
    _Object$keys(pack.nativePackage.targetDirectories).forEach(function (t) {
      obj[t] = obj[t] || [];
      obj[t].push(pack);
    });
    return obj;
  }, {});
  return packagesByTarget[target];
}
//# sourceMappingURL=sourcemaps/PackageLoader.js.map