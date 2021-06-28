<template>
  <d-form @click="handleClick"> ... </d-form>
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
