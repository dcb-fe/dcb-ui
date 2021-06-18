import Button from './button.vue';
import { shallowMount } from '@vue/test-utils';

describe('Button', () => {
  test('渲染正常', () => {
    const wrapper = shallowMount(Button);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
