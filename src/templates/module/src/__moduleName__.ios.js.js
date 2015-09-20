export default (config) => {
  return (
`
/**
 * @providesModule ${config.moduleName}
 * @flow
 */
'use strict';

var ${config.ios.moduleName} = require('NativeModules').${config.ios.moduleName};

var ${config.moduleName} = {
  test: function() {
    ${config.ios.moduleName}.test();
  }
};

module.exports = ${config.moduleName};
`);
}