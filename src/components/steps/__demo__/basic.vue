<template>
  <div>
    <d-steps :active=active>
      <d-step>买家下单</d-step>
      <d-step>商家接单</d-step>
      <d-step>买家提货</d-step>
      <d-step>交易完成</d-step>
    </d-steps>
    <d-button style="margin-top: 20px" @click="handleClick">下一步</d-button>
    <d-button style="margin-top: 20px" @click="handleClick2">上一步</d-button>
  </div>

</template>

<script>
  export default {
    data(){
      return{
        active:0,
      }
    },
    methods: {
      handleClick() {
        this.active += 1
      },
      handleClick2() {
        this.active -= 1
      },
    }
  };
</script>
