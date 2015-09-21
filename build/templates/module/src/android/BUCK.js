"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (config) {
  return `java_library(
  name = 'rem_build',
  srcs = glob(['**/*.java']),
  deps = []
)
`;
};

module.exports = exports["default"];
//# sourceMappingURL=../../../../sourcemaps/templates/module/src/android/BUCK.js.map