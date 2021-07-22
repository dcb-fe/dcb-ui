import Stepper from './stepper.vue';
import { shallowMount } from '@vue/test-utils';

export function later(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

describe('Stepper', () => {
  describe('视图', () => {
    test('禁用步进器', () => {
      const wrapper = shallowMount(Stepper, {
        props: {
          disabled: true,
        },
      });
      expect(wrapper.html()).toMatchSnapshot();
    });

    test('禁用输入框', () => {
      const wrapper = shallowMount(Stepper, {
        propsData: {
          disableInput: true,
        },
      });

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('逻辑', () => {
    test('步进器加减操作', () => {
      const wrapper = shallowMount(Stepper, {
        propsData: {
          value: 1,
          max: 2,
        },
      });

      const plus = wrapper.find('.d-stepper-plus');
      const minus = wrapper.find('.d-stepper-minus');

      plus.trigger('click');
      plus.trigger('click');
      minus.trigger('click');
      minus.trigger('click');

      expect(wrapper.emitted('overlimit')).toEqual([['plus'], ['minus']]);
    });

    test('only allow interger', () => {
      const wrapper = shallowMount(Stepper, {
        propsData: {
          integer: true,
        },
      });

      const input = wrapper.find('input');
      input.element.value = '1.2';
      input.trigger('input');
      input.trigger('blur');

      expect(wrapper.emitted('input')).toEqual([[1]]);
    });
  });
});
