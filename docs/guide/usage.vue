<template>
  <d-button @click="handleClick">确定</d-button>
  
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
