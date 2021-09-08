<template>
  <d-goods-action-button text="加入购物车" @click="handleClick" />
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
