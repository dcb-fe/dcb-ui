<template>
  <d-search @click="handleClick"> ... </d-search>
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
