/** @type import('haoma').JestConfig */
module.exports = require('haoma').getJestConfig({
  testEnvironment: 'jsdom',
  globals: {
    'vue-jest': {
      transform: {
        '^(scss|less|css)$': require.resolve('./jest-vue-style-transformer'),
      },
    },
  },
});
