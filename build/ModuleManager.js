'use strict';

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var createModuleProject = _asyncToGenerator(function* (config, directory) {
  return yield (0, _templatesModule.build)(config, directory);
});

exports.createModuleProject = createModuleProject;

var _templatesModule = require('./templates/module');
//# sourceMappingURL=sourcemaps/ModuleManager.js.map