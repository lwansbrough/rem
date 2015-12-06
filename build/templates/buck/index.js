'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var target = function target(buckType, properties) {
  return buckType + ' (\n' + properties + '\n)';
};
exports.target = target;
var stringProperty = function stringProperty(name, value) {
  return '  ' + name + ' = \'' + value + '\'';
};
exports.stringProperty = stringProperty;
var arrayProperty = function arrayProperty(name, value) {
  var values = value.map(function (v) {
    return '    \'' + v + '\'';
  }).join(',\n');
  return '  ' + name + ' = [\n' + values + '\n  ]';
};
exports.arrayProperty = arrayProperty;
//# sourceMappingURL=../../sourcemaps/templates/buck/index.js.map