// @index(['../../src/**/__demo__/*.vue'], (f, _) => `export { default as ${_.pascalCase('demo_'+f.path.replace(/(^.+?\/components\/|__demo__)/g, ''))} } from '${f.path}';`)
export { default as DemoButtonColor } from '../../src/components/button/__demo__/color';
export { default as DemoButtonDisabled } from '../../src/components/button/__demo__/disabled';
export { default as DemoButtonPrimary } from '../../src/components/button/__demo__/primary';
export { default as DemoButtonSecondary } from '../../src/components/button/__demo__/secondary';
export { default as DemoButtonSize } from '../../src/components/button/__demo__/size';
export { default as DemoSearchBasic } from '../../src/components/search/__demo__/basic';
// @endindex

// @index(['../**/*.vue', '!**/.*/**'], (f, _) => `export { default as ${_.pascalCase('demo_docs_'+f.path)} } from '${f.path}';`)
export { default as DemoDocsGuideTool } from '../guide/tool';
export { default as DemoDocsGuideUsage } from '../guide/usage';
// @endindex
