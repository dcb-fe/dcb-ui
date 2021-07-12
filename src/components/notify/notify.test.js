import Notify from './notify.vue';
import Popup from '../popup/popup';
import { createLocalVue } from '@vue/test-utils';
import { shallowMount } from '@vue/test-utils';
const localVue = createLocalVue();

localVue.use(Popup);

describe('Notify', () => {
  describe('视图', () => {
    test('不传内容时渲染为空标签', () => {
      const wrapper = shallowMount(Notify, {
        localVue,
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
    test('传递type为主要通知', () => {
      const wrapper = shallowMount(Notify, {
        stubs: ['d-popup', 'any-other-child'],
        propsData: {
          type: 'primary',
          message: '通知内容',
          notifyVisible: true,
        },
        slots: {
          default: '<span />',
        },
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
    test('传递message时正常渲染', () => {
      const wrapper = shallowMount(Notify, {
        stubs: ['d-popup', 'any-other-child'],
        propsData: {
          type: 'primary',
          message: '已经正常渲染',
          notifyVisible: true,
        },
        slots: {
          default: '<span />',
        },
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('逻辑', () => {
    // ...
  });
});
