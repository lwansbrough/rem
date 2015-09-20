export default (config) => {
  return (
`package ${config.android.packageIdentifier};

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.Callback;

/**
 * {@link NativeModule}
 */

public class ${config.android.moduleName}Module extends ReactContextBaseJavaModule {

  ReactApplicationContext reactContext;

  public ${config.android.moduleName}Module(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "${config.android.moduleName}";
  }

  @ReactMethod
  public void test(ReadableMap options, Callback callback) {
    callback.invoke(null, "test");
  }
}
`);
}