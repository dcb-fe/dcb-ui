<template>
  <d-swipe-item @click="handleClick"> ... </d-swipe-item>
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
