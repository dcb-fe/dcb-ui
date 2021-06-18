const { defineConfig } = require('notify-dingtalk');

module.exports = defineConfig({
  accessToken:
    'a9303b222fa1be77e06b1023449773e970911e4c30890a750225e0408adef61a',
  secret: 'SEC9ddb2b08ce79b6c2429532e477aa82e5b0cc0a8baf7ae9da8f93385b52e551b0',
  title: '发布通知',
  content: '测试',
});
