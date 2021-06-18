// @index(['./**/*.vue', '!**/__*'], (f, _) => `export { default as ${_.pascalCase(f.name)} } from '${f.path}';`)
export { default as Button } from './components/button/button';
// @endindex
