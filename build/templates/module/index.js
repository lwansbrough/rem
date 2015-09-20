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
    (0, _mkdirp2['default'])(directory, _asyncToGenerator(function* (err) {
      if (err) return reject(err);
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
    var walker = _walk2['default'].walk(_path2['default'].join(__dirname, 'src'), { followLinks: false });

    walker.on('file', _asyncToGenerator(function* (basedir, stat, next) {

      var template = require(_path2['default'].join(basedir, stat.name));

      var relativePath = basedir.replace(sourcePath, '.');
      var finalPath = _path2['default'].join(process.cwd(), relativePath);

      console.log(relativePath);

      if (relativePath === './android/src/main/java') {
        finalPath = _path2['default'].join(finalPath, config.android.packageIdentifier.replace(new RegExp('\\.', 'g'), '/'));
      }

      var fixedPath = fixPath(pathConfig, finalPath);
      var fixedFilename = fixPath(pathConfig, stat.name);

      var lastDotIndex = fixedFilename.lastIndexOf('.');
      var extension = fixedFilename.slice(lastDotIndex);
      if (extension === '.js') {
        fixedFilename = fixedFilename.slice(0, lastDotIndex);
      }

      yield writeAsync(fixedPath, fixedFilename, template(config));
      next();
    }));

    walker.on('errors', function errorsHandler(root, nodeStatsArray, next) {
      nodeStatsArray.forEach(function (n) {
        console.error("[ERROR] " + n.name);
        console.error(n.error.message || n.error.code + ": " + n.error.path);
      });
      next();
    });

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

const sourcePath = _path2['default'].join(__dirname, 'src');

function fixPath(config, path) {
  var keys = _Object$keys(config);
  keys.forEach(function (key) {
    path = path.replace(`__${ key }__`, config[key]);
  });
  return path;
}
//# sourceMappingURL=../../sourcemaps/templates/module/index.js.map