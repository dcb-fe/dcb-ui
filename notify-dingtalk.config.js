const {
  defineConfig,
  getLatestConventionalChangelog,
} = require('notify-dingtalk');
const { dedent } = require('vtils');

module.exports = defineConfig({
  title: '发布公告',
  content: dedent`
    # 发布公告

    ---

    ${getLatestConventionalChangelog()}

    ---

    ### 安装、更新命令

    - npm i @dcbfe/ui
    - yarn add @dcbfe/ui
    - pnpm add @dcbfe/ui

    ---
    [更新日志→](https://dcb-fe.github.io/dcb-ui/v0/changelog.html)
  `,
});
