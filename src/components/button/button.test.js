import Button from './button.vue';
import { shallowMount } from '@vue/test-utils';

describe('Button', () => {
  describe('视图', () => {
    test('不传内容时渲染为空标签', () => {
      const wrapper = shallowMount(Button);
      expect(wrapper.html()).toMatchSnapshot();
    });

    test('传入内容时渲染其为子元素', () => {
      const wrapper = shallowMount(Button, {
        slots: {
          default: '确定',
        },
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('逻辑', () => {
    test('每点击 1 次组件会触发 1 次 click 事件', async () => {
      const handleClick = jest.fn();
      const wrapper = shallowMount(Button, {
        listeners: {
          click: handleClick,
        },
      });
      await wrapper.trigger('click');
      expect(handleClick).toBeCalled().toBeCalledTimes(1);
      await wrapper.trigger('click');
      expect(handleClick).toBeCalled().toBeCalledTimes(2);
    });
  });
});
