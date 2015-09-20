"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (config) {
  return `package ${ config.android.packageIdentifier };

import java.util.Arrays;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;

public class ${ config.android.moduleName } implements ReactPackage {

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();

    modules.add(new ${ config.android.moduleName }(reactContext));

    return modules;
  }

  @Override
  public List<Class<? extends JavaScriptModule>> createJSModules() {
  	return Collections.emptyList();
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
  	return Collections.emptyList();
  }

}
`;
};

module.exports = exports["default"];
//# sourceMappingURL=../../../../../../../sourcemaps/templates/module/src/android/src/main/java/__moduleNameAndroid__.java.js.map