import { build } from './templates/module';

export async function createModuleProject(config, directory) {
  return await build(config, directory);
}