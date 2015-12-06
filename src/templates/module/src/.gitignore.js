

export default (config) => {
  return (
`node_modules
ios/${config.ios.moduleName}.xcodeproj/xcuserdata
ios/${config.ios.moduleName}.xcodeproj/project.xcworkspace
`);
}