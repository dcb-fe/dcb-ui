import fs from 'fs-extra';
import rawPackageInfo from '../package.json';
import { join } from 'path';
import { omit } from 'vtils';

async function main() {
  const rootDir = join(__dirname, '..');
  const packageDir = join(rootDir, './lib');
  const packageJsonFile = join(packageDir, './package.json');

  const packageInfo = omit(rawPackageInfo, [
    'husky',
    'lint-staged',
    'devDependencies',
    'scripts',
    'resolutions',
  ]);

  await Promise.all([
    fs.outputJSON(packageJsonFile, packageInfo, { spaces: 2 }),
    ...['LICENSE', 'README.md'].map(file => {
      return fs.copyFile(join(rootDir, file), join(packageDir, file));
    }),
  ]);
}

main();
