<template>
  <div class="demo-spinner">
    <d-loading vertical class="custom-loading">加载中...</d-loading>
    <d-loading type="spinner" vertical class="custom-loading">加载中...</d-loading>
  </div>
</template>

<style lang="scss" scoped>
  .demo-spinner {
    display: flex;

    .custom-loading {
      ::v-deep {
        .d-loading-text {
          color: #ff980e;
        }
      }
    }
  }
</style>
