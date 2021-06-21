const { basename, extname } = require('path');

module.exports = require('haoma').getCompileConfig([
  {
    name: 'esm',
    inputFiles: ['./src/**/*.{js,vue}', '!**/__*/**', '!**/*.test.*'],
    outDir: 'lib',
    module: 'esm',
    target: 'browser',
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
    getCssModulesScopedName: ({ className, fileName }) => {
      const componentName = basename(fileName, extname(fileName));
      const prefix = className === componentName ? '' : `${componentName}-`;
      return `d-${prefix}${className}`;
    },
  },
]);
