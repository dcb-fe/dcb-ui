<template>
  <div class="button-group">
    <d-button disabled @click="handleClick">我是被禁用的主要按钮</d-button>
    <d-button secondary disabled @click="handleClick">
      我是被禁用的次要按钮
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
