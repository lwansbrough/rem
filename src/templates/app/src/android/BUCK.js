export default (config) => {
  return (
`java_library(
  name = 'rem_build',
  srcs = glob(['**/*.java']),
  deps = [],
)
`);
}

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