<template>
  <div class="demo-spinner">
    <d-loading :style="{ color: '#FF980E' }"></d-loading>
    <d-loading type="spinner" class="custom-loading"></d-loading>
  </div>
</template>

<style lang="scss" scoped>
  .demo-spinner {
    display: flex;

    .custom-loading {
      color: #ff980e;
    }
  }
</style>
