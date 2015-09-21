export default (config) => {
  return (
`java_library(
  name = 'rem_build',
  srcs = glob(['**/*.java']),
  deps = []
)
`);
}