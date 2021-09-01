<template>
  <d-submit-bar price="30.5" button-text="提交订单" @submit="handleClick">
  </d-submit-bar>
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

<style lang="scss">
  .d-submit_bar {
    position: relative;
    padding-bottom: 0;
  }
</style>
