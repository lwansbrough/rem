'use strict';

require('instapromise');

const child_process = require('child_process');
const path = require('path');
const fs = require('fs');

const templates = require('./templates');

class BuckLoader {

  constructor(settings: Settings) {
    this.settings = settings;
  }

  /**
   * Reads the BUCK file in the given directory, creating one if it doesn't exist,
   * and returns its contents
   */
  async readEnsuredAsync(): string {
    let directory = this.settings.xcodeProjectDirectory;
    var contents = await this.readAsync(directory);
    if (contents) {
      return contents;
    }

    await this.createAsync(directory);
    contents = this.readAsync(directory);
    if (!contents) {
      throw new Error('Created a Podfile but was unable to read its contents');
    }
    return contents;
  }

  /**
   * Reads the BUCK file in the given directory and returns its contents, or null
   * if it doesn't exist
   */
  async readAsync(): ?string {
    let directory = this.settings.xcodeProjectDirectory;
    let buckPath = path.join(directory, 'BUCK');
    try {
      return await fs.promise.readFile(buckPath, 'utf8');
    } catch (error) {
      if (error.code === 'ENOENT') {
        return null;
      }
      throw error;
    }
  }

  /**
   * Writes the BUCK file in the given directory.
   */
  async writeAsync(contents: string) {
    let directory = this.settings.xcodeProjectDirectory;
    let buckPath = path.join(directory, 'BUCK');
    await fs.promise.writeFile(buckPath, contents, 'utf8');
  }

  /**
   * Creates a module BUCK file in the given directory.
   */
  createModuleAsync(directory): ?string {
    return new Promise((resolve, reject) => {
      let options = {cwd: directory};
      child_process.exec('pod init', options, (processError, stdout, stderr) => {
        if (processError) {
          let error = new Error('Could not create BUCK file:\n' + stdout);
          error.cause = processError;
          error.stdout = stdout;
          error.stderr = stderr;
          reject(error);
        } else {
          resolve({stdout, stderr});
        }
      });
    });
  }
}

export default BuckLoader;
