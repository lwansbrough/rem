"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (config) {
  return `
/**
 * @providesModule ${ config.moduleName }
 * @flow
 */
'use strict';

var ${ config.ios.moduleName } = require('NativeModules').${ config.ios.moduleName };

var ${ config.moduleName } = {
  test: function() {
    ${ config.ios.moduleName }.test();
  }
};

module.exports = ${ config.moduleName };
`;
};

module.exports = exports["default"];
//# sourceMappingURL=../../../sourcemaps/templates/module/src/__moduleName__.ios.js.js.map