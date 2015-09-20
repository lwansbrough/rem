export default (config) => {
  return (
`#import "RCTBridgeModule.h"

@interface ${config.ios.moduleName} : NSObject <RCTBridgeModule>

@end

`);
}