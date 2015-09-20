export default (config) => {
  return (
`
/**
 * @providesModule ${config.moduleName}
 * @flow
 */
'use strict';

var ${config.android.moduleName} = require('NativeModules').${config.android.moduleName};

var ${config.moduleName} = {
  test: function() {
    ${config.android.moduleName}.test();
  }
};

module.exports = ${config.moduleName};
`);
}