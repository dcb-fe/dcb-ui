// @index(['./**/*.vue', '!**/__*/**'], (f, _) => `export { default as ${_.pascalCase(f.name)} } from '${f.path}';`)
export { default as Button } from './button/button';
export { default as Notify } from './notify/notify';
export { default as Popup } from './popup/popup';
// @endindex
