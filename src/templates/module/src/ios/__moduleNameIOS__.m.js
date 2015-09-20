export default (config) => {
  return (
`#import "${config.ios.moduleName}.h"

@implementation ${config.ios.moduleName}

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(test)
{
  // Your implementation here
}

@end
`);
}