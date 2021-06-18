import compiler from 'vue-template-compiler';
import fs from 'fs-extra';
import path from 'path';
import babel from '@babel/core';

async function main() {
  const rootDir = path.join(__dirname, '..');
  const srcDir = path.join(rootDir, 'src');
  const libDir = path.join(rootDir, 'lib');
  const componentsDir = path.join(srcDir, 'components');
  const componentFile = path.join(componentsDir, 'button/button.vue');
  const componentDistJsFile = componentFile
    .replace(srcDir, libDir)
    .replace(/\.vue$/, '.js');
  const componentDistCssFile = componentFile
    .replace(srcDir, libDir)
    .replace(/\.vue$/, '.css');
  const sfc = compiler.parseComponent(await fs.readFile(componentFile, 'utf8'));
  const templateContent = sfc.template.content;
  const scriptContent = sfc.script.content;
  const styleContent = sfc.styles.map((style) => style.content).join('\n');
  const renderFn = compiler.compile(templateContent);
  const script = await babel.transformAsync(scriptContent, {
    configFile: false,
    babelrc: false,
    filename: componentFile,
    presets: [
      [
        '@vue/cli-plugin-babel/preset',
        {
          modules: 'commonjs',
          loose: true,
        },
      ],
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: [rootDir],
          alias: {
            '@': './src',
          },
        },
      ],
    ],
  });
  await Promise.all([
    fs.outputFile(componentDistJsFile, script.code),
    fs.outputFile(componentDistCssFile, styleContent),
  ]);
  console.log(sfc, renderFn, script.code);
}

main();
