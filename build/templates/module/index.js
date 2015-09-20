'use strict';

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var readAsync = _asyncToGenerator(function* (path) {
  try {
    return yield fs.promise.readFile(path, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
});

var writeAsync = _asyncToGenerator(function* (directory, filename, contents) {
  return new _Promise(function (resolve, reject) {
    (0, _mkdirp2['default'])(directory, _asyncToGenerator(function* (err, success) {
      if (err || !success) return reject(err || new Error('Failed to create directory.'));
      var filePath = _path2['default'].join(directory, filename);
      yield fs.promise.writeFile(filePath, contents, 'utf8');
      resolve();
    }));
  });
});

var build = _asyncToGenerator(function* (config, directory) {

  var pathConfig = {
    moduleName: config.moduleName,
    moduleNameAndroid: config.android.moduleName,
    moduleNameIOS: config.ios.moduleName
  };

  return new _Promise(function (resolve, reject) {
    var walker = _walk2['default'].walk('./src', { followLinks: false });

    walker.on('file', _asyncToGenerator(function* (basedir, stat, next) {
      basedir = basedir.replace('src/templates/module/src/', '');

      if (basedir === 'android/src/main/java') {
        basedir += '/' + config.packageName.replace('.', '/');
      }

      var fixedBaseDir = fixPath(pathConfig, basedir);
      var fixedFilename = fixPath(pathConfig, filename);
      var path = `${ fixedBaseDir }/${ fixedFilename }`;
      var template = yield readAsync(path);

      var lastDotIndex = path.lastIndexOf('.');
      var extension = path.slice(lastDotIndex);
      if (extension === '.js') {
        path = path.slice(0, lastDotIndex);
      }

      yield writeAsync(fixedBaseDir, fixedFilename, template(config));
      next();
    }));

    walker.on('end', resolve);
  });
});

exports.build = build;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _walk = require('walk');

var _walk2 = _interopRequireDefault(_walk);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

const fs = require('fs');

function fixPath(config, path) {
  var keys = _Object$keys(config);
  keys.forEach(function (value, key) {
    path = path.replace(`__${ key }__`, value);
  });
  return path;
}
//# sourceMappingURL=../../sourcemaps/templates/module/index.js.map