<template>
  <d-goods-action-icon icon="location" text="位置" @click="handleClick" />
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
