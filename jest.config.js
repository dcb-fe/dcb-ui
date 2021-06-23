const makeSynchronous = require('make-synchronous');

/** @type import('haoma').JestConfig */
module.exports = require('haoma').getJestConfig({
  testEnvironment: 'jsdom',
  globals: {
    'vue-jest': {
      transform: {
        // https://github.com/vuejs/vue-jest/blob/v4.0.1/lib/process-style.js#L83
        '^scss$': {
          process(content) {
            return content;
          },
          postprocess(content, path) {
            const clsJson = makeSynchronous(async (content, path) => {
              const { renderStyle } = require('haoma');
              const { basename, extname } = require('path');
              const { cls } = await renderStyle({
                lang: 'scss',
                filePath: path,
                fileContent: content,
                cssModules: true,
                cssModulesScopedName: ({ className, filePath }) => {
                  const componentName = basename(filePath, extname(filePath));
                  const prefix =
                    className === componentName ? '' : `${componentName}-`;
                  return `d-${prefix}${className}`;
                },
              });
              return JSON.stringify(cls);
            })(content, path);
            return clsJson;
          },
        },
      },
    },
  },
});
