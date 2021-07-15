<template>
<div class="notice-group">
  <h3>左侧图标</h3>
  <d-notice-bar left-icon="notice" @click="handleClick" text="组件是后台产品重要的交互设计元素，指引用户点击操作的控件。"> </d-notice-bar>
  <d-notice-bar @click="handleClick" text="组件是后台产品重要的交互设计元素，指引用户点击操作的控件。"> </d-notice-bar>
  <h3>右侧图标</h3>
  <d-notice-bar @click="handleClick" text="组件是后台产" mode="closeable"> </d-notice-bar>
  <d-notice-bar @click="handleClick" text="组件是后台产" mode="link"> </d-notice-bar>
  <h3>水平、垂直滚动图标</h3>
  <d-notice-bar :vertical="false" @click="handleClick" text="组件是后台产品重要的交互设计元素，指引用户点击操作的控件。" > </d-notice-bar>
  <d-notice-bar :vertical="true"  @click="handleClick" text="组件是后台产品重要的交互设计元素，指引用户点击操作的控件。" > </d-notice-bar>
</div>
</template>

<script>
  export default {
    methods: {
      handleClick() {
        alert('hello1多彩宝');
      },
    },
  };
</script>
<style lang="scss" scoped>
.notice-group {
    > *:not(:first-child) {
      margin-top: 12px;
    }
  }
</style>
