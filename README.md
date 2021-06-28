# 多彩宝移动端组件库技术选型1

## 依赖管理

采用 [Yarn](https://classic.yarnpkg.com/lang/en/)。

如何安装：

```bash
npm i yarn -g --registry https://r.npm.taobao.org/
```

## 组件

总体基于 [Vue 2](https://cn.vuejs.org/v2/guide/)。

- **逻辑**：采用 JavaScript。
- **视图**：采用模板，特别复杂的组件可尝试 [渲染函数或 JSX](https://cn.vuejs.org/v2/guide/render-function.html)。
- **样式**：采用 [Scss](https://sass-lang.com/documentation)。

## 组件测试

测试的目的就是让开发者敢加新功能（既有测试可告诉你这个新功能会不会产生 bug），让使用者敢采用（完善的测试说明这个东西基本没有什么大 bug）。

总体基于 [Jest](https://jestjs.io/zh-Hans/)、[Vue Test Utils](https://vue-test-utils.vuejs.org/zh/installation/testing-single-file-components-with-jest.html)。

- **逻辑**：采用单元测试。
- **视图**：采用快照测试。
- **样式**：不测试，由 UI 进行验收。

## 代码检查

采用 [ESLint](https://cn.eslint.org/) 加 [Prettier](https://prettier.io/docs/en/index.html) 的组合，ESLint 负责代码质量，Prettier 负责代码风格。举例：

- **代码质量**: 不应该出现未被使用到的变量；不应该污染全局对象
- **代码风格**: 每行代码后面都应该加上分号；每行代码应保持 2 个空格的缩进

## 文档

采用 [VuePress](https://vuepress.vuejs.org/zh/)。

## 发布

git 提交信息遵循 [约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0/) 规范，并据之生成更新日志。

版本管理遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范，具体版本号根据约定式提交信息自动生成。

## 持续集成

持续集成的目的就是通过自动化的构建，从而尽早地发现错误，同时把人力从重复的工作中解脱出来。

采用 [GitHub Action](https://docs.github.com/cn/actions)。

范围包括：代码检查、测试运行、包发布、文档部署、发布通知。
