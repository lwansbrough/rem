"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (config) {
  return "package " + config.android.packageIdentifier + ";\n\nimport com.facebook.react.bridge.ReactApplicationContext;\nimport com.facebook.react.bridge.ReactContextBaseJavaModule;\nimport com.facebook.react.bridge.ReactMethod;\nimport com.facebook.react.bridge.ReadableMap;\nimport com.facebook.react.bridge.ReadableArray;\nimport com.facebook.react.bridge.Callback;\n\n/**\n * {@link NativeModule}\n */\n\npublic class " + config.android.moduleName + "Module extends ReactContextBaseJavaModule {\n\n  ReactApplicationContext reactContext;\n\n  public " + config.android.moduleName + "Module(ReactApplicationContext reactContext) {\n    super(reactContext);\n    this.reactContext = reactContext;\n  }\n\n  @Override\n  public String getName() {\n    return \"" + config.android.moduleName + "\";\n  }\n\n  @ReactMethod\n  public void test(ReadableMap options, Callback callback) {\n    callback.invoke(null, \"test\");\n  }\n}\n";
};

module.exports = exports["default"];
//# sourceMappingURL=../../../../../../../sourcemaps/templates/module/src/android/src/main/java/__moduleNameAndroid__Module.java.js.map