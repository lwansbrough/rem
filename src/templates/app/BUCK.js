export default (config) => {
  return (
`apple_library(
  name = '${config.ios.moduleName}',
  deps = [
    ':OtherLibrary',
    '//Libraries:YetAnotherLibrary',
  ],
  preprocessor_flags = ['-fobjc-arc'],
  headers = [
    '${config.ios.moduleName}.h',
  ],
  srcs = [
    '${config.ios.moduleName}.m',
  ],
  frameworks = [
    '$SDKROOT/System/Library/Frameworks/UIKit.framework',
    '$SDKROOT/System/Library/Frameworks/Foundation.framework',
  ],
)

java_library(
  name = '${config.android.moduleName}',
  srcs = glob(['**/*.java']),
  deps = [
    '//src/com/facebook/base:base',
    '//third_party/guava:guava',
  ],
)
`);
}