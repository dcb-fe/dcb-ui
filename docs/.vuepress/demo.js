// @index(['../../src/**/__demo__/*.vue'], (f, _) => `export { default as ${_.pascalCase('demo_'+f.path.replace(/(^.+?\/components\/|__demo__)/g, ''))} } from '${f.path}';`)
export { default as DemoButtonBasic } from '../../src/components/button/__demo__/basic';
export { default as DemoButtonBlock } from '../../src/components/button/__demo__/block';
export { default as DemoButtonDisabled } from '../../src/components/button/__demo__/disabled';
// @endindex
