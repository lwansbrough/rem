export default (config) => {
  return (
`
apple_library(
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
`);
}