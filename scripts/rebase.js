import exec from 'execa';
import { noop } from 'vtils';

async function main() {
  const { stdout: currentBranch } = await exec('git', [
    'rev-parse',
    '--abbrev-ref',
    'HEAD',
  ]);
  const isMaster = currentBranch === 'master';
  await exec(
    'git',
    ['remote', 'add', 'upstream', 'https://github.com/dcb-fe/dcb-ui.git'],
    {
      stdio: 'inherit',
    },
  ).catch(noop);
  if (!isMaster) {
    await exec('git', ['checkout', 'master'], {
      stdio: 'inherit',
    });
  }
  await exec('git', ['pull', '--rebase', 'upstream', 'master'], {
    stdio: 'inherit',
  });
  await exec('git', ['push', 'origin', 'master'], {
    stdio: 'inherit',
  }).catch(noop);
  if (!isMaster) {
    await exec('git', ['checkout', currentBranch], {
      stdio: 'inherit',
    });
    await exec('git', ['rebase', 'master'], {
      stdio: 'inherit',
    });
    await exec('git', ['push', '--force', 'origin', currentBranch], {
      stdio: 'inherit',
    });
  }
}

main();
