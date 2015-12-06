"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (config) {
  return "/**\n * @providesModule " + config.moduleName + "\n * @flow\n */\n'use strict';\n\nvar " + config.android.moduleName + " = require('NativeModules')." + config.android.moduleName + ";\n\nvar " + config.moduleName + " = {\n  test: function() {\n    " + config.android.moduleName + ".test();\n  }\n};\n\nmodule.exports = " + config.moduleName + ";\n";
};

module.exports = exports["default"];
//# sourceMappingURL=../../../sourcemaps/templates/module/src/index.android.js.js.map