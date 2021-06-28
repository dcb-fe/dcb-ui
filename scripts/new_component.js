import exec from 'execa';
import fs from 'fs-extra';
import path from 'path';
import qa from 'prompts';
import { dedent, kebabCase, noop, pascalCase, snakeCase } from 'vtils';
import { meta } from '../src/meta';

async function main() {
  const rootDir = path.join(__dirname, '..');
  const srcDir = path.join(rootDir, 'src');
  const componentsDir = path.join(srcDir, 'components');
  let { componentGroup } = await qa([
    {
      name: 'componentGroup',
      type: 'select',
      message: '请选择组件分类',
      choices: [
        ...meta.componentGroups.map(item => item.title),
        '没有合适的，我要新增组件分类',
      ].map(item => ({
        title: item,
        value: item,
      })),
    },
  ]);
  if (componentGroup === '没有合适的，我要新增组件分类') {
    const { newComponentGroup } = await qa([
      {
        name: 'newComponentGroup',
        type: 'text',
        message: '请输入组件分类名称（如：基础、表单、业务等）',
      },
    ]);
    componentGroup = newComponentGroup;
  }
  if (!componentGroup) return;
  // eslint-disable-next-line prefer-const
  let { componentName, componentCName } = await qa([
    {
      name: 'componentName',
      type: 'text',
      message: '请输入组件名称（如：button、list_item）',
    },
    {
      name: 'componentCName',
      type: 'text',
      message: '请输入组件中文名称（如：按钮、列表项）',
    },
  ]);
  if (!componentName || !componentCName) return;
  componentName = snakeCase(componentName);
  const ComponentName = pascalCase(componentName);
  const componentTagName = kebabCase(componentName);
  const componentDir = path.join(componentsDir, componentName);
  const componentDemoDir = path.join(componentDir, './__demo__');
  const componentEntryFile = path.join(componentDir, `${componentName}.vue`);
  const componentTestFile = path.join(componentDir, `${componentName}.test.js`);
  const componentDocFile = path.join(componentDir, `${componentName}.md`);
  const componentDemoBasicFile = path.join(componentDemoDir, `basic.vue`);
  const metaFile = path.join(srcDir, `meta.js`);
  await Promise.all([
    fs.outputFile(
      componentEntryFile,
      dedent`
          <template>
            <div :class="_.${componentName}">
              ...
            </div>
          </template>

          <script>
            import { defineComponent } from '@/utils'

            export default defineComponent({
              name: '${ComponentName}'
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
            describe('视图', () => {
              // ...
            });
  
            describe('逻辑', () => {
              // ...
            });
          });
        `,
    ),
    fs.outputFile(
      componentDocFile,
      dedent`
          # ${ComponentName}

          ## 基础渲染

          <demo src="${componentName}/basic" />

          <api src="${componentName}" />
        `,
    ),
    fs.outputFile(
      componentDemoBasicFile,
      dedent`
          <template>
            <d-${componentTagName} @click="handleClick">
              ...
            </d-${componentTagName}>
          </template>
          
          <script>
            export default {
              methods: {
                handleClick() {
                  alert('hello');
                },
              },
            };
          </script>
        `,
    ),
  ]);

  const metaFileContent = await fs.readFile(metaFile, 'utf-8');
  const componentGroupsStr = metaFileContent
    .match(/\/\/ 分组开始(.+?)\/\/ 分组结束/s)[1]
    .trim()
    .replace(/,$/, '');
  const componentGroups = eval(`var __xxx = ${componentGroupsStr};__xxx`);
  let foundComponentGroup = componentGroups.find(
    item => item.title === componentGroup,
  );
  if (!foundComponentGroup) {
    componentGroups.push({
      title: componentGroup,
      list: [],
    });
    foundComponentGroup = componentGroups[componentGroups.length - 1];
  }
  let foundComponent = foundComponentGroup.list.find(
    item => item.name === ComponentName,
  );
  if (!foundComponent) {
    foundComponentGroup.list.push({
      name: ComponentName,
      cname: componentCName,
    });
    foundComponent =
      foundComponentGroup.list[foundComponentGroup.list.length - 1];
  }
  foundComponent.name = ComponentName;
  foundComponent.cname = componentCName;
  const nextMetaFileContent = metaFileContent.replace(
    /(?<=\/\/ 分组开始)(.+?)(?=\/\/ 分组结束)/s,
    `\n${JSON.stringify(componentGroups)}\n`,
  );
  await fs.writeFile(metaFile, nextMetaFileContent);

  try {
    await exec(
      'eslint',
      [
        '--fix',
        componentEntryFile,
        componentTestFile,
        componentDemoBasicFile,
        metaFile,
      ],
      {
        stdio: 'inherit',
      },
    ).catch(noop);
    await exec(
      'prettier',
      [
        '--write',
        componentEntryFile,
        componentTestFile,
        componentDocFile,
        componentDemoBasicFile,
        metaFile,
      ],
      {
        stdio: 'inherit',
      },
    ).catch(noop);
    await exec('npm', ['run', 'gen-index'], {
      stdio: 'inherit',
    }).catch(noop);
  } catch {}
}

main();
