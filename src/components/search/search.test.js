import Search from './search.vue';
import { shallowMount } from '@vue/test-utils';

describe('Search', () => {
  describe('视图', () => {
    test('普通展示', () => {
      const search = shallowMount(Search);
      expect(search.html()).toMatchSnapshot();
    });

    test('自定义右侧内容', () => {
      const search = shallowMount(Search, {
        slots: {
          right: '<span class="btn">搜索</span>',
        },
      });
      expect(search.find('.btn').exists()).toBe(true);
      expect(search.html()).toMatchSnapshot();
    });

    test('圆形搜索框', () => {
      const search = shallowMount(Search, {
        props: {
          shape: 'round',
        },
      });
      expect(search.html()).toMatchSnapshot();
    });

    test('搜索框内容对齐', () => {
      const search = shallowMount(Search, {
        props: {
          inputAlign: 'center',
        },
      });
      expect(search.html()).toMatchSnapshot();
    });

    test('自定义背景色', () => {
      const search = shallowMount(Search, {
        props: {
          background: 'green',
        },
      });
      expect(search.html()).toMatchSnapshot();
    });
  });

  describe('事件', () => {
    test('确定搜索触发', () => {
      const handerSearch = jest.fn();
      const search = shallowMount(Search, {
        listeners: {
          search: handerSearch,
        },
      });
      search.vm.$emit('search');
      search.find('input').trigger('keyup', { keyCode: 13 });
      expect(handerSearch).toBeCalled().toBeCalledTimes(2);
    });

    test('输入框输入时触发', () => {
      const handerInput = jest.fn();
      const search = shallowMount(Search, {
        listeners: {
          input: handerInput,
        },
      });
      search.find('input').trigger('input');
      expect(handerInput).toBeCalled().toBeCalledTimes(1);
    });

    test('输入框聚焦时触发', () => {
      const handerFocus = jest.fn();
      const search = shallowMount(Search, {
        attachTo: 'body', // 测试focus必须有attachTo属性，详情请查看官网
        listeners: {
          focus: handerFocus,
        },
      });
      search.find('input').trigger('focus', {});
      expect(handerFocus).toBeCalled().toBeCalledTimes(1);
    });

    test('输入框失焦时触发', () => {
      const handerBlur = jest.fn();
      const search = shallowMount(Search, {
        listeners: {
          blur: handerBlur,
        },
      });
      search.find('input').trigger('blur');
      expect(handerBlur).toBeCalled().toBeCalledTimes(1);
    });
  });
});
