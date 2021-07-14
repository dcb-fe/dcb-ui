<template>
  <div class="demo-spinner">
    <d-loading vertical>加载中...</d-loading>
  </div>
</template>

<script>
  export default {
    methods: {},
  };
</script>
<style lang="scss">
  .demo-spinner {
    display: flex;
    .d-loading {
      margin-left: 10px;
    }
  }
</style>
