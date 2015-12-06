"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (config) {
  return "#import \"" + config.ios.moduleName + ".h\"\n\n@implementation " + config.ios.moduleName + "\n\nRCT_EXPORT_MODULE()\n\nRCT_EXPORT_METHOD(test)\n{\n  // Your implementation here\n}\n\n@end\n";
};

module.exports = exports["default"];
//# sourceMappingURL=../../../../sourcemaps/templates/module/src/ios/__moduleNameIOS__.m.js.map