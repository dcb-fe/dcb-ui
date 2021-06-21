import chokidar from 'chokidar';
import exec from 'execa';
import fs from 'fs-extra';
import path from 'path';
import { debounce } from 'vtils';

async function main() {
  // 复制组件文档
  chokidar
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
  chokidar.watch(path.join(__dirname, '../src/components/*/__demo__/*.vue')).on(
    'all',
    debounce(async () => {
      await exec('npm', ['run', 'gen-index']);
    }, 60),
  );
}

main();
