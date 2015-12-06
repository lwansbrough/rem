"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (config) {
  return "/**\n * @providesModule " + config.moduleName + "\n * @flow\n */\n'use strict';\n\nvar " + config.ios.moduleName + " = require('NativeModules')." + config.ios.moduleName + ";\n\nvar " + config.moduleName + " = {\n  test: function() {\n    " + config.ios.moduleName + ".test();\n  }\n};\n\nmodule.exports = " + config.moduleName + ";\n";
};

module.exports = exports["default"];
//# sourceMappingURL=../../../sourcemaps/templates/module/src/index.ios.js.js.map