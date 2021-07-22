import Switch from './switch.vue';
import { shallowMount } from '@vue/test-utils';

describe('Switch', () => {
  describe('视图', () => {
    test('禁用状态', () => {
      const wrapper = shallowMount(Switch, {
        propsData: {
          disabled: true,
        },
      });

      expect(wrapper).toMatchSnapshot();
    });

    test('自定义颜色', () => {
      const wrapper = shallowMount(Switch, {
        propsData: {
          activeBgColor: '#9ABB82',
          inActiveBgColor: '#EAE7E2',
          btnColor: '#CBDDDD',
        },
      });

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('逻辑', () => {
    test('开关打开时触发', () => {
      const wrapper = shallowMount(Switch, {
        propsData: {
          active: false,
        },
      });

      wrapper.trigger('click');
    });

    test('开关关闭时触发', () => {
      const wrapper = shallowMount(Switch, {
        propsData: {
          active: false,
        },
      });

      wrapper.trigger('click');
    });
  });
});
