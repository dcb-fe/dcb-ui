<template>
  <d-submit-bar
    price="30.5"
    button-text="提交订单"
    :tip="true"
    @submit="handleClick"
  >
    <div>全选</div>
    <template #tip>
      <div class="tips">你的收货地址不支持同城送，<span>修改地址</span></div>
    </template>
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
    .tips {
      span {
        color: #479dff;
      }
    }
  }
</style>
