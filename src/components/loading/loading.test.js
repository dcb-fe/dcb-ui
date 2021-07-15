import Loading from './loading.vue';
import { shallowMount } from '@vue/test-utils';

describe('Loading', () => {
  describe('视图', () => {
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
