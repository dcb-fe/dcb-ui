const { basename, extname } = require('path');
const { defineBabelPlugin, getCompileConfig } = require('haoma');

const removeVueDocHelpersPlugin = defineBabelPlugin(t => ({
  visitor: {
    CallExpression: {
      exit(path) {
        if (
          t.isIdentifier(path.node.callee) &&
          path.node.callee.name === 'defineComponent' &&
          path.node.arguments.length &&
          t.isObjectExpression(path.node.arguments[0])
        ) {
          const postRuns = [];
          path.node.arguments[0].properties.forEach((prop, index) => {
            if (t.isObjectProperty(prop) && t.isIdentifier(prop.key)) {
              // 移除 slots, emits
              if (['slots', 'emits'].includes(prop.key.name)) {
                postRuns.unshift(() => {
                  path.node.arguments[0].properties.splice(index, 1);
                });
              }
              // 移除 props 下的 enum, desc
              else if (
                prop.key.name === 'props' &&
                t.isObjectExpression(prop.value)
              ) {
                prop.value.properties.forEach(p => {
                  if (t.isObjectProperty(p) && t.isObjectExpression(p.value)) {
                    p.value.properties.forEach((col, colIndex) => {
                      if (
                        t.isObjectProperty(col) &&
                        t.isIdentifier(col.key) &&
                        ['enum', 'desc'].includes(col.key.name)
                      ) {
                        postRuns.unshift(() => {
                          p.value.properties.splice(colIndex, 1);
                        });
                      }
                    });
                  }
                });
              }
            }
          });
          postRuns.forEach(run => run());
        }
      },
    },
  },
}));

module.exports = getCompileConfig([
  {
    name: 'esm',
    inputFiles: ['./src/**/*.{js,vue}', '!**/__*/**', '!**/*.test.*'],
    outDir: 'lib',
    module: 'esm',
    target: 'browser',
    plugins: [removeVueDocHelpersPlugin],
    getCssModulesScopedName: ({ className, fileName }) => {
      const componentName = basename(fileName, extname(fileName));
      const prefix = className === componentName ? '' : `${componentName}-`;
      return `d-${prefix}${className}`;
    },
  },
  {
    name: 'cjs',
    inputFiles: ['./src/**/*.{js,vue}', '!**/__*/**', '!**/*.test.*'],
    outDir: 'lib/_cjs',
    module: 'cjs',
    target: 'browser',
    plugins: [removeVueDocHelpersPlugin],
    getCssModulesScopedName: ({ className, fileName }) => {
      const componentName = basename(fileName, extname(fileName));
      const prefix = className === componentName ? '' : `${componentName}-`;
      return `d-${prefix}${className}`;
    },
  },
]);
