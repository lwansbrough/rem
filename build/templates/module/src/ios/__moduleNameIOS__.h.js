"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (config) {
  return "#import \"RCTBridgeModule.h\"\n\n@interface " + config.ios.moduleName + " : NSObject <RCTBridgeModule>\n\n@end\n\n";
};

module.exports = exports["default"];
//# sourceMappingURL=../../../../sourcemaps/templates/module/src/ios/__moduleNameIOS__.h.js.map