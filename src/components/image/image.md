# Image

::: tip 图片懒加载

设置 `lazy`属性来开启图片懒加载，需要搭配 `vue-lazyload` 组件使用。

:::

## 基础渲染

基础用法与原生 `img` 标签一致，可以设置 `src`、`width`、`height`、`alt` 等原生属性。

<demo src="image/basic" />

## 填充模式

通过 `fit` 属性可以设置图片填充模式，等同于原生的 `object-fit` 属性，可选值见下方表格。

<demo src="image/fit" />

## 图片位置

通过 `position` 属性可以设置图片位置，结合 fit 属性使用，等同于原生的 `object-position` 属性。

<demo src="image/position" />

## 圆形图片

通过 `round` 属性可以设置图片变圆，注意当图片宽高不相等且 `fit` 为 `contain` 或 `scale-down` 时，将无法填充一个完整的圆形。

<demo src="image/round" />

## 加载中提示

提供了默认的加载中提示，支持通过 `loading` 插槽自定义内容。

<demo src="image/loading" />

## 加载失败提示

提供了默认的加载失败提示，支持通过 `error` 插槽自定义内容。

<demo src="image/error" />

<api src="image" />
