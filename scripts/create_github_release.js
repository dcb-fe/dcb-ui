import path from 'path';
import pkg from '../package.json';
import { getLatestConventionalChangelog } from 'notify-dingtalk';
import { Octokit } from '@octokit/rest';

async function main() {
  const version = `v${pkg.version}`;
  const octokit = new Octokit({
    auth: `token ${process.env.GITHUB_TOKEN}`,
  });
  await octokit.repos.createRelease({
    owner: 'dcb-fe',
    repo: 'dcb-ui',
    tag_name: version,
    name: version,
    body: getLatestConventionalChangelog(
      path.join(__dirname, '../CHANGELOG.md'),
    ),
    draft: false,
    prerelease: pkg.version.includes('beta'),
  });
}

main();
