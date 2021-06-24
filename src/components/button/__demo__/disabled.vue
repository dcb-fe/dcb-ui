<template>
  <div class="button-group">
    <d-button disabled @click="handleClick">我是被禁用的普通按钮</d-button>
    <d-button block disabled @click="handleClick">
      我是被禁用的块级按钮
    </d-button>
  </div>
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

<style lang="scss" scoped>
  .button-group {
    > *:not(:first-child) {
      margin-top: 12px;
    }
  }
</style>
