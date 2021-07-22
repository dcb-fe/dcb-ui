export const meta = {
  /**
   * 版本号。
   */
  version: '0.0.6-beta.12',

  /**
   * 组件分组。
   */
  componentGroups:
    // 分组开始
    [
      {
        title: '基础',
        list: [
          { name: 'Button', cname: '按钮' },
          { name: 'Popup', cname: '弹出层' },
          { name: 'Icon', cname: '图标' },
        ],
      },
      {
        title: '表单',
        list: [
          { name: 'NumberKeyboard', cname: '数字键盘' },
          { name: 'Search', cname: '搜索' },
          { name: 'Stepper', cname: '步进器' },
          { name: 'Switch', cname: '开关' },
        ],
      },
      {
        title: '反馈',
        list: [
          { name: 'Notify', cname: '通知' },
          { name: 'Loading', cname: '加载' },
        ],
      },
    ],
  // 分组结束
};
