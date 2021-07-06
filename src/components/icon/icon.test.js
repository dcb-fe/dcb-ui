import Icon from './icon.vue';
import { shallowMount } from '@vue/test-utils';

describe('Icon', () => {
  describe('视图', () => {
    test('不传内容时渲染为空标签', () => {
      const wrapper = shallowMount(Icon);
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('逻辑', () => {
    test('每点击 1 次组件会触发 1 次 click 事件', async () => {
      const handleClick = jest.fn();
      const wrapper = shallowMount(Icon, {
        listeners: {
          click: handleClick,
        },
      });
      await wrapper.trigger('click');
      expect(handleClick).toBeCalled().toBeCalledTimes(1);
      await wrapper.trigger('click');
      expect(handleClick).toBeCalled().toBeCalledTimes(2);
    });

    test('disabled 为 true 时点击组件不会触发 click 事件', async () => {
      const handleClick = jest.fn();
      const wrapper = shallowMount(Icon, {
        propsData: {
          disabled: true,
        },
        listeners: {
          click: handleClick,
        },
      });
      await wrapper.trigger('click');
      expect(handleClick).not.toBeCalled();
      await wrapper.trigger('click');
      expect(handleClick).not.toBeCalled();
    });
  });
});
