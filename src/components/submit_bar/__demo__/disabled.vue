<template>
  <d-submit-bar
    price="30.5"
    button-text="提交订单"
    tip="你的收货地址不支持同城送，我们已为你推荐快递"
    tip-icon="fire_fill"
    disabled
  >
  </d-submit-bar>
</template>

<script>
  export default {
    methods: {},
  };
</script>

<style lang="scss">
  .d-submit_bar {
    position: relative;
    padding-bottom: 0;
  }
</style>
