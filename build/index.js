#!/usr/bin/env node

'use strict';

var _asyncToGenerator = require('babel-runtime/helpers/async-to-generator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var mainAsync = _asyncToGenerator(function* () {
  var yargs = require('yargs').usage('Usage: $0 <command> [options]').command('init', 'Initializes the current directory for a project that supports native modules').command('clean', 'Removes the rem configuration from the project in the current directory').command('module init', 'Initializes the current directory for a new React Native module').command('buck-fragment', 'Outputs a code fragment to be evaluated inline within a BUCK file').options('d', {
    alias: 'directory',
    describe: 'Root directory of the JS project, relative to the current working directory. Use with podfile-fragment.',
    'default': '',
    type: 'string'
  }).help('h').alias('h', 'help');

  var argv = yargs.argv;
  var command = argv._[0];

  switch (command) {
    // case 'init': {
    //   await verifyCurrentDirectoryAsync();

    //   let settings = await Settings.loadAsync();
    //   let buckLoader = new BuckLoader(settings);
    //   let buckEditor = new BuckEditor(settings);
    //   let buckFile = await buckLoader.readEnsuredAsync();
    //   if (buckEditor.hasRemSection(buckFile)) {
    //     console.log("The project's Podfile is already set up with rem.");
    //   } else {
    //     podfile = buckEditor.addRemSection(podfile);
    //     await buckLoader.writeAsync(podfile);
    //     console.log("The project's Podfile is now set up with rem.");
    //   }
    //   break;
    // }

    // case 'clean': {
    //   await verifyCurrentDirectoryAsync();

    //   let settings = await Settings.loadAsync();
    //   let buckLoader = new BuckLoader(settings);
    //   let buckEditor = new BuckEditor(settings);
    //   let buckFile = await buckLoader.readEnsuredAsync();
    //   if (buckEditor.hasRemSection(buckFile)) {
    //     buckFile = buckEditor.removeRemSection(buckFile);
    //     await buckLoader.writeAsync(buckFile);
    //     console.log("The project's Podfile no longer includes rem.");
    //   } else {
    //     console.log("The project's Podfile already does not include rem.");
    //   }
    //   break;
    // }

    case 'init-module':
      {
        var _ret = yield* (function* () {
          // await verifyCurrentDirectoryAsync();

          // let buckLoader = new BuckLoader(settings);
          // let buckEditor = new BuckEditor(settings);
          // let buckFile = await buckLoader.readEnsuredAsync();
          // if (buckEditor.hasRemSection(buckFile)) {
          //   console.log("The module has already been initialized.");
          // }
          // else {
          //   buckFile = buckEditor.addRemSection(buckFile);
          //   await buckLoader.writeAsync(buckFile);
          //   console.log("The module is now initialized for rem.");
          // }

          yield verifyCurrentDirectoryAsync('run "npm init" in the root directory of your module');

          var settings = yield _Settings2['default'].loadAsync();

          var moduleManager = new _ModuleManager2['default'](settings);
          if (moduleManager.isInitialized() && moduleManager.isModule()) {
            console.log("The module has already been initialized.");
          } else if (moduleManager.isInitialized()) {
            console.log("This directory appears to be initialized by rem, but is not a module. Aborting to avoid potentially destructive changes.");
          } else {
            stdio.question("Set your module's class name (PascalCase, for example: NetworkDiscoverer): ", _asyncToGenerator(function* (moduleName) {
              stdio.question("Set your module's package identifier. The last part must match your module's class name. (For example: com.example.NetworkDiscoverer): ", _asyncToGenerator(function* (packageIdentifier) {
                yield moduleManager.createProject({
                  npmName: settings.npm.name,
                  moduleName: moduleName,
                  android: {
                    moduleName: moduleName,
                    packageIdentifier: packageIdentifier
                  },
                  ios: {
                    moduleName: `REM${ moduleName }`,
                    packageIdentifier: packageIdentifier
                  }
                });
                console.log("The module is now initialized for rem.");
              }));
            }));
          }

          return 'break';
        })();

        if (_ret === 'break') break;
      }

    // case 'buck-fragment': {
    //   let baseDirectory = argv.directory;
    //   let fragment = await BuckFragmentGenerator.fragmentAsync(baseDirectory);
    //   console.log(fragment);
    //   break;
    // }

    case null:
      {
        console.error(yargs.help());
        process.exit(1);
        break;
      }

    default:
      {
        console.error('Unknown command: %s\n%s', command, yargs.help());
        process.exit(1);
        break;
      }
  }
});

var verifyCurrentDirectoryAsync = _asyncToGenerator(function* (message) {
  try {
    yield fs.promise.access('package.json');
  } catch (error) {
    message = message || 'run "rem init" in the root directory of your JS project';
    console.error(`package.json not found; ${ message }`);
    process.exit(1);
  }
});

// const BuckLoader = require('./BuckLoader');
// const BuckEditor = require('./BuckEditor');
// const BuckFragmentGenerator = require('./BuckFragmentGenerator');

var _ModuleManager = require('./ModuleManager');

var _ModuleManager2 = _interopRequireDefault(_ModuleManager);

var _Settings = require('./Settings');

var _Settings2 = _interopRequireDefault(_Settings);

require('instapromise');

const fs = require('fs');
const stdio = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

if (module === require.main) {
  mainAsync()['catch'](function (error) {
    console.error(error.stack);
    process.exit(1);
  });
}
//# sourceMappingURL=sourcemaps/index.js.map