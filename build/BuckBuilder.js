'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.buildDefinitionForTargets = buildDefinitionForTargets;

var _decamelize = require('decamelize');

var _decamelize2 = _interopRequireDefault(_decamelize);

var _templatesBuck = require('./templates/buck');

var buckTemplates = _interopRequireWildcard(_templatesBuck);

var _templatesBuckDEFS = require('./templates/buck/DEFS');

var _templatesBuckDEFS2 = _interopRequireDefault(_templatesBuckDEFS);

function buildProperty(target, property) {
  if (property.indexOf('buck.') === 0) {
    return;
  }
  var propertyValue = target[property];
  property = (0, _decamelize2['default'])(property);

  if (Array.isArray(propertyValue) && propertyValue.length > 0) {
    return buckTemplates.arrayProperty(property, propertyValue);
  } else if (typeof propertyValue === 'string') {
    return buckTemplates.stringProperty(property, propertyValue);
  }

  return null;
}

function buildTarget(target) {
  var buckType = target['buck.type'];
  var properties = _Object$keys(target).map(buildProperty.bind(this, target)).filter(function (p) {
    return !!p;
  }).join(',\n');
  return buckTemplates.target(buckType, properties);
}

function buildDefinitionForTargets(targets, nodeModulesDirectory) {
  var dependencies = {};
  _Object$keys(targets).forEach(function (t) {
    dependencies[t] = targets[t].packages.map(function (p) {
      return '/' + nodeModulesDirectory + '/' + p.name + '/' + p.nativePackage.targetDirectories[t] + ':';
    });
  });

  return (0, _templatesBuckDEFS2['default'])(dependencies);
}
//# sourceMappingURL=sourcemaps/BuckBuilder.js.map