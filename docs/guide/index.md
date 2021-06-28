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

<inline src="docs/guide/tool" />
