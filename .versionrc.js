module.exports = {
  header: '# 更新日志\n\n',
  types: [
    { type: 'feat', section: '特性' },
    { type: 'fix', section: '修复' },
    { type: 'docs', section: '文档' },
    { type: 'chore', hidden: true },
  ],
  // ref: https://github.com/conventional-changelog/standard-version#can-i-use-standard-version-for-additional-metadata-files-languages-or-version-files
  bumpFiles: [
    {
      filename: 'package.json',
      type: 'json',
    },
    {
      filename: 'src/meta.js',
      updater: {
        readVersion: content => {
          return content.match(/version:\s*'(.+?)',/)[1];
        },
        writeVersion: (content, version) => {
          return content.replace(
            new RegExp(/(?<=version:\s*').+?(?=',)/),
            version,
          );
        },
      },
    },
  ],
};
