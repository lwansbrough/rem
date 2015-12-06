#!/usr/bin/env node
'use strict';

import path from 'path';

import * as BuckManager from './BuckManager';
import * as PackageLoader from './PackageLoader';

const fs = require('fs');
const stdio = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

async function mainAsync() {
  let yargs = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command('init', 'Initializes the current directory for a rem-enabled React Native project')
    .command('clean', 'Removes the rem configuration from the project in the current directory')
    .command('buck-fragment', 'Outputs a code fragment to be evaluated inline within a BUCK file')
    .options('d', {
      alias: 'directory',
      describe: 'Root directory of the JS project, relative to the current working directory. Use with podfile-fragment.',
      default: '',
      type: 'string',
    })
    .help('h')
    .alias('h', 'help');

  let argv = yargs.argv;
  let command = argv._[0];

  switch (command) {

    case 'install': {
      console.log('Installing...');
      let rootDirectory = process.cwd();
      let remDirectory = path.join(rootDirectory, '.rem');
      let nodeModulesDirectory = path.join(rootDirectory, 'node_modules');
      let projectPackage = await PackageLoader.getProjectPackage(rootDirectory);
      let isREMSupported = projectPackage.nativePackage && projectPackage.nativePackage.targetDirectories;
      
      if (!isREMSupported) {
        console.error('REM is not supported for the current project, please follow the steps in REM\'s readme.');
        break;
      }
      
      let packages = await PackageLoader.getREMCompatiblePackages(nodeModulesDirectory);
      let targetDirectories = projectPackage.nativePackage.targetDirectories;
      let targets = {};
      
      Object.keys(targetDirectories).forEach(target => {
        targets[target] = {
          directory: targetDirectories[target],
          packages: PackageLoader.filterByTarget(packages, target)
        };
      });
      
      let buckDefinitions = BuckManager.buildDefinitionsForTargets(targets, nodeModulesDirectory);
      await BuckManager.writeDefinitions(buckDefinitions, remDirectory);
      
      break;
    }

    case null: {
      console.error(yargs.help());
      process.exit(1);
      break;
    }

    default: {
      console.error('Unknown command: %s\n%s', command, yargs.help());
      process.exit(1);
      break;
    }
  }
}

mainAsync().catch(err => {
  console.error(err.stack);
  process.exit(1);
});

// 0. The React Native app must have the following:

// > `/package.json`
// {
//   reactNative: {
//     targetDirectories: {
//       android: './android',
//       ios: './ios'
//     }
//   }
// }

// > `/android/BUCK`
// `android_binary` needs to include `/.rem/android/BUCK` as a dependency

// > `/ios/BUCK`
// `apple_binary` needs to include `/.rem/ios/BUCK` as a dependency

// > `/.rem/android/BUCK`
// Unsure which build command to use (`android_library`?) This file contains an automatically
// generated target(s) which includes all the 3rd party modules as dependencies

// > `/.rem/ios/BUCK`
// Unsure which build command to use (`apple_library`?) This file contains an automatically
// generated target(s) which includes all the 3rd party modules as dependencies

// REM's job:
// 1. Get app's target platforms by checking its `package.json` for `reactNative->targetDirectories`
// 2. Get compatible packages from node_modules (has `reactNative` property in `package.json`
// and supports at least 1 of the app's specified platforms)
// 3. Add each module's `BUCK` file locations (specified in their `package.json`
// (`reactNative->targetDirectories`)) for each target to the `.rem/[target]/BUCK` file
// which is dynamically generated each time the installer is run

// Running `buck build` on any of the app's target directories (`android`, `ios`, etc.) will pull
// in the dependencies specified in the generated `.rem/[target]/BUCK` file and build the app.