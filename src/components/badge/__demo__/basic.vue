<template>
  <div class="flex">
    <d-badge :content="5">
      <div class="child" />
    </d-badge>
    <d-badge :content="10">
      <div class="child" />
    </d-badge>
    <d-badge content="Hot">
      <div class="child" />
    </d-badge>
    <d-badge dot>
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
