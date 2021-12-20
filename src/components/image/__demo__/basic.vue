<template>
  <d-image @click="handleClick"> ... </d-image>
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
