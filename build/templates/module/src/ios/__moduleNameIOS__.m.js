"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (config) {
  return `#import "${ config.ios.moduleName }.h"

@implementation ${ config.ios.moduleName }

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(test)
{
  // Your implementation here
}

@end
`;
};

module.exports = exports["default"];
//# sourceMappingURL=../../../../sourcemaps/templates/module/src/ios/__moduleNameIOS__.m.js.map