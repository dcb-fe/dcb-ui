<template>
  <div class="flex">
    <d-badge :content="20" max="9" />
    <d-badge :content="50" max="20" />
    <d-badge :content="200" max="99" />
  </div>
</template>
<style lang="scss">
  .flex {
    display: flex;
    & > div {
      margin-right: 20px;
    }
  }
</style>
