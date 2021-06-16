import { shallowMount } from '@vue/test-utils';
import Button from './button.vue';

describe('Button', () => {
  test('渲染正常', () => {
    const wrapper = shallowMount(Button);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
