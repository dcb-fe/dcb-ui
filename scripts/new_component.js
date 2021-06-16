import fs from 'fs-extra';
import exec from 'execa';
import qa from 'prompts';
import path from 'path';
import { snakeCase, pascalCase, dedent } from 'vtils';

async function main() {
  const rootDir = path.join(__dirname, '..');
  const srcDir = path.join(rootDir, 'src');
  const componentsDir = path.join(srcDir, 'components');
  let { componentName } = await qa({
    name: 'componentName',
    type: 'text',
    message: '请输入组件名称（如：button、list_item）',
  });
  if (componentName) {
    componentName = snakeCase(componentName);
    const ComponentName = pascalCase(componentName);
    const componentDir = path.join(componentsDir, componentName);
    const componentEntryFile = path.join(componentDir, `${componentName}.vue`);
    const componentTestFile = path.join(
      componentDir,
      `${componentName}.test.js`,
    );
    const componentDocFile = path.join(componentDir, `${componentName}.md`);
    await Promise.all([
      fs.outputFile(
        componentEntryFile,
        dedent`
          <template>
            <div :class="_.${componentName}">

            </div>
          </template>

          <script>
            import { defineComponent } from '@/utils'

            export default defineComponent({

            })
          </script>

          <style lang="scss" module>
            .${componentName} {

            }
          </style>
        `,
      ),
      fs.outputFile(
        componentTestFile,
        dedent`
          import { shallowMount } from '@vue/test-utils';
          import ${ComponentName} from './${componentName}.vue';

          describe('${ComponentName}', () => {
            test('渲染正常', () => {
              const wrapper = shallowMount(${ComponentName});
              expect(wrapper.html()).toMatchSnapshot();
            });
          });
        `,
      ),
      fs.outputFile(
        componentDocFile,
        dedent`
          # ${ComponentName}
        `,
      ),
    ]);
    try {
      await exec('eslint', ['--fix', componentEntryFile, componentTestFile], {
        stdio: 'inherit',
      });
      await exec(
        'prettier',
        ['--write', componentEntryFile, componentTestFile, componentDocFile],
        {
          stdio: 'inherit',
        },
      );
    } catch {}
  }
}

main();
