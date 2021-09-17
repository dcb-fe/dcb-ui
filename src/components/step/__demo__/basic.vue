<template>
  <d-step @click="handleClick"> ... </d-step>
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
