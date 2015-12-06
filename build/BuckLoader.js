'use strict';

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var load = _asyncToGenerator(function* (buckPath) {
  return new _Promise(function (resolve, reject) {
    exec('buck targets --json ' + buckPath + ':', function (err, stdout, stderr) {
      if (err) return reject(err);
      resolve(JSON.parse(stdout));
    });
  });
}

//
// class BuckLoader {
//
//   constructor(settings: Settings) {
//     this.settings = settings;
//   }
//
//   /**
//    * Reads the BUCK file in the given directory, creating one if it doesn't exist,
//    * and returns its contents
//    */
//   async readEnsuredAsync(): string {
//     let directory = this.settings.xcodeProjectDirectory;
//     var contents = await this.readAsync(directory);
//     if (contents) {
//       return contents;
//     }
//
//     await this.createAsync(directory);
//     contents = this.readAsync(directory);
//     if (!contents) {
//       throw new Error('Created a Podfile but was unable to read its contents');
//     }
//     return contents;
//   }
//
//   /**
//    * Reads the BUCK file in the given directory and returns its contents, or null
//    * if it doesn't exist
//    */
//   async readAsync(): ?string {
//     let directory = this.settings.xcodeProjectDirectory;
//     let buckPath = path.join(directory, 'BUCK');
//     try {
//       return await fs.promise.readFile(buckPath, 'utf8');
//     } catch (error) {
//       if (error.code === 'ENOENT') {
//         return null;
//       }
//       throw error;
//     }
//   }
//
//   /**
//    * Writes the BUCK file in the given directory.
//    */
//   async writeAsync(contents: string) {
//     let directory = this.settings.xcodeProjectDirectory;
//     let buckPath = path.join(directory, 'BUCK');
//     await fs.promise.writeFile(buckPath, contents, 'utf8');
//   }
//
//   /**
//    * Creates a module BUCK file in the given directory.
//    */
//   async createModuleAsync(directory: string): ?string {
//     return await writeAsync(directory, '');
//   }
// }
//
// export default BuckLoader;
);

exports.load = load;
var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');
//# sourceMappingURL=sourcemaps/BuckLoader.js.map