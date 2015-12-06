export default (dependencies) => {
  return (`
def rem_android_binary(deps = [], *args, **kwargs):
  android_binary(
    deps = deps + ${JSON.stringify(dependencies.android)},
    *args,
    **kwargs
  )
  
def rem_apple_binary(deps = [], *args, **kwargs):
  apple_binary(
    deps = deps + ${JSON.stringify(dependencies.ios)},
    *args,
    **kwargs
  )
`);
};
