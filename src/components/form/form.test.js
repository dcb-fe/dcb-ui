import Form from './form.vue';
import { shallowMount } from '@vue/test-utils';

console.log(Form, shallowMount);

describe('Form', () => {
  describe('视图', () => {
    test('xx', () => {
      expect(1 + 1).toBe(2);
    });
  });

  describe('逻辑', () => {
    // ...
    test('xx', () => {
      expect(1 + 1).toBe(2);
    });
  });
});
