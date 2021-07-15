import NoticeBar from './notice_bar.vue';
import { shallowMount } from '@vue/test-utils';

describe('NoticeBar', () => {
  describe('视图', () => {
    test('滚动内容', () => {
      const wrapper = shallowMount(NoticeBar, {
        propsData: {
          text: '你好多彩宝',
          leftIcon: 'notice',
          mode: 'link',
          wrapable: false,
        },
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('逻辑', () => {
    // ...
  });
});
