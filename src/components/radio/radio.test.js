import Radio from './radio.vue';
import { shallowMount } from '@vue/test-utils';

describe('Radio', () => {
  describe('视图', () => {
    test('禁用状态', () => {
      const wrapper = shallowMount(Radio, {
        propsData: {
          disabled: true,
        },
      });

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('逻辑', () => {
    // ...
  });
});
