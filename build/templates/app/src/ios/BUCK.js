"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (config) {
  return `apple_library(
  name = 'rem_build',
  deps = []
)
`;
};

// export default (config) => {
//   return (
// `apple_library(
//   name = 'rem_build',
//   deps = [
//     ':OtherLibrary',
//     '//Libraries:YetAnotherLibrary',
//   ],
//   preprocessor_flags = ['-fobjc-arc'],
//   headers = [
//     '${config.ios.moduleName}.h',
//   ],
//   srcs = [
//     '${config.ios.moduleName}.m',
//   ],
//   frameworks = [
//     '$SDKROOT/System/Library/Frameworks/UIKit.framework',
//     '$SDKROOT/System/Library/Frameworks/Foundation.framework',
//   ],
// )
// `);
// }
module.exports = exports["default"];
//# sourceMappingURL=../../../../sourcemaps/templates/app/src/ios/BUCK.js.map