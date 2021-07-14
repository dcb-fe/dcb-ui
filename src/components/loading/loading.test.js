import Loading from './loading.vue';
import { shallowMount } from '@vue/test-utils';

describe('Loading', () => {
  describe('视图', () => {
    test('自定义颜色时 渲染有颜色', () => {
      const wrapper = shallowMount(Loading, {
        propsData: {
          color: '#FF980E',
        },
      });
      expect(wrapper.html()).toContain('color: rgb(255, 152, 14)');
    });
    test('自定义方向时 渲染有方向类名', () => {
      const wrapper = shallowMount(Loading, {
        propsData: {
          vertical: true,
        },
      });
      expect(wrapper.html()).toContain('d-loading-vertical');
    });
  });
});
