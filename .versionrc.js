module.exports = {
  header: '# 更新日志\n\n',
  types: [
    { type: 'feat', section: '特性' },
    { type: 'fix', section: '修复' },
    { type: 'docs', section: '文档' },
    { type: 'chore', section: '杂项' },
  ],
  // ref: https://github.com/conventional-changelog/standard-version#can-i-use-standard-version-for-additional-metadata-files-languages-or-version-files
  bumpFiles: [
    {
      filename: 'package.json',
      type: 'json',
    },
    {
      filename: 'src/meta.js',
      updater: '.versionrc.meta-updater.js',
    },
  ],
};
