<template>
  <d-button block @click="handleClick">我是块级按钮</d-button>
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
