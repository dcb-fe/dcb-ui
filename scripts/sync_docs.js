import chokidar from 'chokidar';
import fs from 'fs-extra';
import path from 'path';

async function main() {
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
}

main();
