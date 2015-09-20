"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (config) {
  return `/**
 * @providesModule ${ config.moduleName }
 * @flow
 */
'use strict';

var ${ config.android.moduleName } = require('NativeModules').${ config.android.moduleName };

var ${ config.moduleName } = {
  test: function() {
    ${ config.android.moduleName }.test();
  }
};

module.exports = ${ config.moduleName };
`;
};

module.exports = exports["default"];
//# sourceMappingURL=../../../sourcemaps/templates/module/src/index.android.js.js.map