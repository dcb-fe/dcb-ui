module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['**/*.test.js'],
  globals: {
    'vue-jest': {
      // 不编译样式
      // https://github.com/vuejs/vue-jest#css-options
      experimentalCSSCompile: false,
    },
  },
};
