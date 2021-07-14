<template>
  <div class="demo-spinner">
    <d-loading :style="{ color: '#FF980E' }"></d-loading>
    <d-loading type="spinner" class="custom"></d-loading>
  </div>
</template>

<style lang="scss" scoped>
  .demo-spinner {
    display: flex;

    .custom {
      color: #ff980e;
    }
  }
</style>
