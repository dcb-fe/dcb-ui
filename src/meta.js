export const meta = {
  /**
   * 版本号。
   */
  version: '0.0.6-beta.21',

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
          { name: 'Cell', cname: '单元格' },
        ],
      },
      {
        title: '表单',
        list: [
          { name: 'NumberKeyboard', cname: '数字键盘' },
          { name: 'Search', cname: '搜索' },
          { name: 'Stepper', cname: '步进器' },
          { name: 'Switch', cname: '开关' },
          { name: 'Radio', cname: '单选框' },
        ],
      },
      {
        title: '反馈',
        list: [
          { name: 'Notify', cname: '通知' },
          { name: 'Loading', cname: '加载' },
        ],
      },
      {
        title: '业务组件',
        list: [
          { name: 'AddressList', cname: '地址列表' },
          { name: 'Area', cname: '省市区选择' },
          { name: 'AddressEdit', cname: '地址编辑' },
        ],
      },
    ],
  // 分组结束
};
