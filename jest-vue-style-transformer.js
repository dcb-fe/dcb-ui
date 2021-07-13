const makeSynchronous = require('make-synchronous');

// https://github.com/vuejs/vue-jest/blob/v4.0.1/lib/process-style.js#L83
module.exports = {
  process(content) {
    return content;
  },
  postprocess(content, path, _, { lang, module }) {
    const clsJson = makeSynchronous(async (content, path, lang, module) => {
      const { renderStyle } = require('haoma');
      const { basename, extname } = require('path');
      const { cls } = await renderStyle({
        lang: lang === 'scss' ? 'scss' : lang === 'less' ? 'less' : 'css',
        filePath: path,
        fileContent: content,
        ...(!module
          ? {}
          : {
              cssModules: true,
              cssModulesScopedName: ({ className, filePath }) => {
                const componentName = basename(filePath, extname(filePath));
                const prefix =
                  className === componentName ? '' : `${componentName}-`;
                return `d-${prefix}${className}`;
              },
            }),
      });
      return JSON.stringify(cls);
    })(content, path, lang, module);
    return clsJson;
  },
};
