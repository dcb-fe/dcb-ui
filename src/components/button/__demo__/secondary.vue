<template>
  <d-button secondary @click="handleClick">我是次级按钮</d-button>
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
