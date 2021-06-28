<template>
  <d-button @click="handleClick">我是主要按钮</d-button>
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
