<template>
  <div class="flex">
    <d-badge :content="20" max="9">
      <div class="child" />
    </d-badge>
    <d-badge :content="50" max="20">
      <div class="child" />
    </d-badge>
    <d-badge :content="200" max="99">
      <div class="child" />
    </d-badge>
  </div>
</template>
<style lang="scss">
  .flex {
    display: flex;
    & > div {
      margin-right: 20px;
    }
    .child {
      width: 40px;
      height: 40px;
      background: #d0d0d0;
      border-radius: 4px;
    }
  }
</style>
