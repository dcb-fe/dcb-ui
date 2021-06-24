import fs from 'fs-extra'
import exec from 'execa'
import qa from 'prompts'
import path from 'path'
import { snakeCase } from 'vtils'

async function main() {
  const rootDir = path.join(__dirname, '..')
  const srcDir = path.join(rootDir, 'src')
  const componentsDir = path.join(srcDir, 'components')
  let {componentName} = await qa({
    name: 'componentName',
    type:'text',
    message: '请输入组件名称（如：button、list_item）',
  })
  if (componentName) {
    componentName = snakeCase(componentName)
    const componentDir = path.join(componentsDir, componentName)
    const componentEntryFile = path.join(componentDir, `${componentName}.vue`)
    const componentStyleFile = path.join(componentDir, `${componentName}.scss`)
    const componentTestFile = path.join(componentDir, `${componentName}.test.js`)
    const componentDocFile = path.join(componentDir, `${componentName}.md`)
    await Promise.all([
      fs.outputFile(componentEntryFile, `
        <template>
          <div :class="">

          </div>
        </template>
      `)
    ])
  }
}

main()