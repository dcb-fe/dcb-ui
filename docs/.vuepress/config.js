const path = require('path');

module.exports = {
  title: '多彩宝移动端 UI 组件库',
  description: '多彩宝移动端 UI 组件库',
  port: 9988,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.join(__dirname, '../../src'))
      .set('@dcbfe/ui', path.join(__dirname, '../../src'));
  },
  markdown: {
    extendMarkdown: md => {
      md.use(require('./demoMarkdownPlugin'));
    },
  },
  themeConfig: {
    nav: [
      { text: '使用指南', link: '/guide.html' },
      { text: '组件', link: '/components/' },
      { text: '更新日志', link: '/changelog.html' },
    ],
    sidebar: {
      '/components/': [
        {
          title: '基础',
          collapsable: false,
          children: [
            {
              title: 'Button 按钮',
              path: '/components/button.html',
              sidebarDepth: 0,
            },
          ],
        },
      ],
    },
    lastUpdated: '上次更新时间',
  },
};
