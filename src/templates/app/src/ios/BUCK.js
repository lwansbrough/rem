export default (config) => {
  return (
`apple_library(
  name = 'rem_build',
  deps = []
)
`);
}

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