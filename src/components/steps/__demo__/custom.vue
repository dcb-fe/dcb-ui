<template>
  <d-steps
    @click="handleClick"
    :activeIcon="'arrow_right'"
    :activeColor = "'#FF960A'"
    :inActiveIcon="'arrow_right'"
  >
    <d-step>买家下单</d-step>
    <d-step>商家接单</d-step>
    <d-step>买家提货</d-step>
    <d-step>交易完成</d-step>
    <d-step>用户评价</d-step>
  </d-steps>
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
