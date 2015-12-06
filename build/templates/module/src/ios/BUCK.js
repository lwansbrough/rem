"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (config) {
  return "apple_library(\n  name = 'rem_build',\n  deps = [],\n  preprocessor_flags = ['-fobjc-arc'],\n  headers = [\n    '" + config.ios.moduleName + ".h',\n  ],\n  srcs = [\n    '" + config.ios.moduleName + ".m',\n  ],\n  frameworks = [\n    '$SDKROOT/System/Library/Frameworks/UIKit.framework',\n    '$SDKROOT/System/Library/Frameworks/Foundation.framework',\n  ],\n)\n";
};

module.exports = exports["default"];
//# sourceMappingURL=../../../../sourcemaps/templates/module/src/ios/BUCK.js.map