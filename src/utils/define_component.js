/**
 * @param {import('vue').ComponentOptions} options 组件选项
 */
export function defineComponent(options) {
  options.computed ??= {};
  options.computed._ = function () {
    return this.$style;
  };
  return options;
}
