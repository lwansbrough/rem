#!/usr/bin/env node
'use strict';

require('instapromise');

const fs = require('fs');
const stdio = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// const BuckLoader = require('./BuckLoader');
// const BuckEditor = require('./BuckEditor');
// const BuckFragmentGenerator = require('./BuckFragmentGenerator');
import ModuleManager from './ModuleManager';
import Settings from './Settings';

async function mainAsync() {
  let yargs = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command('init', 'Initializes the current directory for a project that supports native modules')
    .command('clean', 'Removes the rem configuration from the project in the current directory')
    .command('module init', 'Initializes the current directory for a new React Native module')
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
    
    case 'init-module': {
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
      
      await verifyCurrentDirectoryAsync('run "npm init" in the root directory of your module');
      
      let settings = await Settings.loadAsync();
      
      let moduleManager = new ModuleManager(settings);
      if (moduleManager.isInitialized() && moduleManager.isModule()) {
        console.log("The module has already been initialized.");
      }
      else if (moduleManager.isInitialized()) {
        console.log("This directory appears to be initialized by rem, but is not a module. Aborting to avoid potentially destructive changes.");
      }
      else {
        stdio.question("Set your module's class name (PascalCase, for example: NetworkDiscoverer): ", async (moduleName) => {
          stdio.question("Set your module's package identifier. The last part must match your module's class name. (For example: com.example.NetworkDiscoverer): ", async (packageIdentifier) => {
            await moduleManager.createProject({
              npmName: settings.npm.name,
              moduleName,
              android: {
                moduleName,
                packageIdentifier
              },
              ios: {
                moduleName: `REM${moduleName}`,
                packageIdentifier
              }
            });
            console.log("The module is now initialized for rem.");
          });
        });
      }
      
      break;
    }

    // case 'buck-fragment': {
    //   let baseDirectory = argv.directory;
    //   let fragment = await BuckFragmentGenerator.fragmentAsync(baseDirectory);
    //   console.log(fragment);
    //   break;
    // }

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

async function verifyCurrentDirectoryAsync(message) {
  try {
    await fs.promise.access('package.json');
  } catch (error) {
    message = message || 'run "rem init" in the root directory of your JS project';
    console.error(`package.json not found; ${message}`);
    process.exit(1);
  }
}

if (module === require.main) {
  mainAsync().catch((error) => {
    console.error(error.stack);
    process.exit(1);
  });
}
