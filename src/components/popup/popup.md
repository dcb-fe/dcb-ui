# Popup

::: tip 说明

下述演示为了视觉效果将 `renderInPlace` 属性设为了 `true` 以让弹出层原地渲染，实际使用最好不要添加该属性以让弹出层渲染到 `document.body` 下避免样式污染问题。

:::

## 基础用法

一个简易弹窗。

<demo src="popup/basic" />

## 抽屉

将 `position` 属性设为 `left`、`right`、`top`、`bottom` 可分别从左侧、右侧、顶部、底部弹出内容。

<demo src="popup/drawer" />

## 自定义弹出效果

默认弹出效果是根据 `position` 属性值自动选择的，但你可以通过 `transitionName` 属性自定义弹出效果。

<demo src="popup/custom_transition" />

## 透明遮罩

通过 `maskTransparent` 属性令弹出层的遮罩透明。

<demo src="popup/transparent_mask" />

<api src="popup" />
