---
sidebar: auto
---

# 使用指南

## 安装

使用包管理器安装：

```bash
# 使用 yarn
yarn add @dcbfe/ui

# 或者，使用 npm
npm i @dcbfe/ui

# 或者，使用 pnpm
pnpm add @dcbfe/ui
```

若在国内，可使用 [tbify](https://github.com/fjc0k/tbify) 加速。

## 使用

在项目入口页（一般是 `src/main.js`）按需引入项目中要使用到的所有组件并注册即可。

由于 `@dcbfe/ui` 本身支持摇树优化，因此用这种方式只会引入你指定的组件，不会引入其他组件增加构建产物大小。

```javascript
import Vue from 'vue';

import { Button, Icon } from '@dcbfe/ui';
Vue.use(Button);
Vue.use(Icon);
```

你可使用下面的工具选择项目中要用到的组件生成代码：

<embed src="docs/guide/tool" />

引入组件后在项目中即可使用：

<demo src="docs/guide/usage" />

## 参与贡献

### 1、Fork 仓库

打开 [dcb-fe/dcb-ui](https://github.com/dcb-fe/dcb-ui)，点击右上角 Fork 按钮：

<img class="x-paste-image" src="./images/fork.png" width="800" />

### 2、克隆仓库

> 若你是首次克隆来自 GitHub 的仓库，你需要[在 GitHub 添加你的 SSH 密钥](https://docs.github.com/cn/github/authenticating-to-github/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)。

去到你 Fork 后的仓库，复制仓库的 SSH 地址：

<img class="x-paste-image" src="./images/ssh.png" width="800" />

将仓库克隆到你的电脑上：

<img class="x-paste-image" src="./images/clone.png" width="800" />
