import chokidar from 'chokidar';
import exec from 'execa';
import fs from 'fs-extra';
import path from 'path';
import { debounce, wait } from 'vtils';

async function main() {
  const isOnce = process.argv.includes('--once');

  // 复制组件文档
  const watch1 = chokidar
    .watch(path.join(__dirname, '../src/components/*/*.md'))
    .on('all', async (type, filePath) => {
      const [, $1, $2] = filePath.match(/^.+\/(.+?)\/(.+?)\.md$/);
      if ($1 === $2) {
        const docsFile = path.join(__dirname, `../docs/components/${$1}.md`);
        if (type !== 'unlink' && type !== 'unlinkDir') {
          await fs.writeFile(docsFile, await fs.readFile(filePath));
        }
      }
    });

  // 更新组件演示
  const watch2 = chokidar
    .watch([
      path.join(__dirname, '../src/components/*/__demo__/*.vue'),
      path.join(__dirname, '../docs/**/*.vue'),
    ])
    .on(
      'all',
      debounce(async () => {
        await exec('npm', ['run', 'gen-index']);
      }, 60),
    );

  if (isOnce) {
    await wait(100);
    await Promise.all([watch1.close(), watch2.close()]);
  }
}

main();
