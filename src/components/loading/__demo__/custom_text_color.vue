<template>
  <div class="demo-spinner">
    <d-loading vertical class="custom">加载中...</d-loading>
    <d-loading type="spinner" vertical class="custom">加载中...</d-loading>
  </div>
</template>

<style lang="scss" scoped>
  .demo-spinner {
    display: flex;

    .custom {
      ::v-deep {
        .d-loading-text {
          color: #ff980e;
        }
      }
    }
  }
</style>
