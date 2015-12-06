"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (config) {
  return "java_library(\n  name = 'rem_build',\n  srcs = glob(['**/*.java']),\n  deps = [],\n)\n";
};

// export default (config) => {
//   return (
// `java_library(
//   name = '${config.android.moduleName}',
//   srcs = glob(['**/*.java']),
//   deps = [
//     '//src/com/facebook/base:base',
//     '//third_party/guava:guava',
//   ],
// )
// `);
// }
module.exports = exports["default"];
//# sourceMappingURL=../../../../sourcemaps/templates/app/src/android/BUCK.js.map