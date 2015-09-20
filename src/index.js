#!/usr/bin/env node
'use strict';

require('instapromise');

const fs = require('fs');

const BuckLoader = require('./BuckLoader');
const BuckEditor = require('./BuckEditor');
const BuckFragmentGenerator = require('./BuckFragmentGenerator');
const Settings = require('./Settings');

import { createModuleProject } from './ModuleManager';

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
    
    case 'module init': {
      await verifyCurrentDirectoryAsync();

      // let settings = await Settings.loadAsync();
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
      
      await createModuleProject({
        moduleName: 'Test',
        android: {
          moduleName: 'REMTest'
        },
        ios: {
          moduleName: 'REMTest'
        }
      }, process.cwd);
      
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

async function verifyCurrentDirectoryAsync() {
  try {
    await fs.promise.access('package.json');
  } catch (error) {
    console.error('package.json not found; run "rem init" in the root directory of your JS project');
    process.exit(1);
  }
}

if (module === require.main) {
  mainAsync().catch((error) => {
    console.error(error.stack);
    process.exit(1);
  });
}
