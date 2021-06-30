import Popup from './popup.vue';
import { shallowMount } from '@vue/test-utils';

describe('Popup', () => {
  describe('视图', () => {
    test('visible 为 false 时不渲染遮罩和内容', () => {
      const wrapper = shallowMount(Popup, {
        slots: {
          default: '内容',
        },
      });
      expect(wrapper.html()).toMatchSnapshot();
    });

    test('visible 为 true 时渲染遮罩和内容', () => {
      const wrapper = shallowMount(Popup, {
        propsData: {
          visible: true,
        },
        slots: {
          default: '内容',
        },
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('逻辑', () => {
    test('初始 visible 为 false 时不触发 close 事件', () => {
      const handleClose = jest.fn();
      shallowMount(Popup, {
        slots: {
          default: '内容',
        },
        listeners: {
          close: handleClose,
        },
      });
      expect(handleClose).not.toBeCalled();
    });

    test('初始 visible 为 true 时触发 open 事件', () => {
      const handleOpen = jest.fn();
      shallowMount(Popup, {
        propsData: {
          visible: true,
        },
        slots: {
          default: '内容',
        },
        listeners: {
          open: handleOpen,
        },
      });
      expect(handleOpen).toBeCalled().toBeCalledTimes(1);
    });
  });
});
