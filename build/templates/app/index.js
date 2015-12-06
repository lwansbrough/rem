'use strict';

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
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

  var walkerFileHandler = createWalkerFileHandler(config, directory);

  return new _Promise(function (resolve, reject) {
    var walker = _walk2['default'].walk(sourcePath);
    walker.on('file', walkerFileHandler);
    walker.on('errors', walkerErrorHandler);
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

var fs = require('fs');

var sourcePath = _path2['default'].join(__dirname, 'src');

function walkerErrorHandler(root, nodeStatsArray, next) {
  nodeStatsArray.forEach(function (n) {
    console.error('[ERROR] ' + n.name);
    console.error(n.error.message || n.error.code + ": " + n.error.path);
  });
  next();
}

function createWalkerFileHandler(config, directory) {

  return _asyncToGenerator(function* (root, stat, next) {
    var originalPath = _path2['default'].join(root, stat.name);
    delete require.cache[originalPath];
    var template = require(originalPath);
    var relativePath = root.replace(sourcePath, '.');
    var finalPath = _path2['default'].join(directory, relativePath);

    // Ensure Android's Java files are added into a folder structure matching the package identifier
    if (relativePath === './android/src/main/java') {
      finalPath = _path2['default'].join(finalPath, config.android.packageIdentifier.replace(new RegExp('\\.', 'g'), '/'));
    }

    var lastDotIndex = stat.name.lastIndexOf('.');
    var extension = stat.name.slice(lastDotIndex);
    if (extension === '.js') {
      stat.name = stat.name.slice(0, lastDotIndex);
    }

    yield writeAsync(finalPath, stat.name, template(config));
    next();
  });
}
//# sourceMappingURL=../../sourcemaps/templates/app/index.js.map