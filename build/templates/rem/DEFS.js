"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (dependencies) {
  return "\ndef rem_android_binary(deps = [], *args, **kwargs):\n  android_binary(\n    deps = deps + " + JSON.stringify(dependencies.android) + ",\n    *args,\n    **kwargs\n  )\n  \ndef rem_apple_binary(deps = [], *args, **kwargs):\n  apple_binary(\n    deps = deps + " + JSON.stringify(dependencies.ios) + ",\n    *args,\n    **kwargs\n  )\n";
};

module.exports = exports["default"];
//# sourceMappingURL=../../sourcemaps/templates/rem/DEFS.js.map