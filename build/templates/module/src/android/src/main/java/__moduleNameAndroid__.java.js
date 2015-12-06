"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (config) {
  return "package " + config.android.packageIdentifier + ";\n\nimport java.util.Arrays;\nimport java.util.ArrayList;\nimport java.util.Collections;\nimport java.util.List;\n\nimport com.facebook.react.ReactPackage;\nimport com.facebook.react.bridge.NativeModule;\nimport com.facebook.react.bridge.ReactApplicationContext;\nimport com.facebook.react.uimanager.ViewManager;\nimport com.facebook.react.bridge.JavaScriptModule;\n\npublic class " + config.android.moduleName + " implements ReactPackage {\n\n  @Override\n  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {\n    List<NativeModule> modules = new ArrayList<>();\n\n    modules.add(new " + config.android.moduleName + "(reactContext));\n\n    return modules;\n  }\n\n  @Override\n  public List<Class<? extends JavaScriptModule>> createJSModules() {\n  \treturn Collections.emptyList();\n  }\n\n  @Override\n  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {\n  \treturn Collections.emptyList();\n  }\n\n}\n";
};

module.exports = exports["default"];
//# sourceMappingURL=../../../../../../../sourcemaps/templates/module/src/android/src/main/java/__moduleNameAndroid__.java.js.map