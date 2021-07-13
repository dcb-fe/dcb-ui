let zIndex = 5000;

/**
 * 定义组件。
 *
 * @param {import('vue').ComponentOptions} options 组件选项
 */
export function defineComponent(options) {
  // 为组件名称加上 D 前缀
  if (options.name) {
    options.name = `D${options.name}`;
  }

  options.computed ??= {};

  // 定义 _ 作为 $style 的别名，方便使用
  options.computed._ = function () {
    return this.$style;
  };

  // 递增 zIndex
  options.computed.zIndex = function () {
    return zIndex++;
  };

  // 安装方法
  options.install = Vue => {
    Vue.component(options.name, options);
  };

  return options;
}
