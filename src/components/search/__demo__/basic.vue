<template>
  <d-search v-model="keyword" @click="handleClick"> ... </d-search>
</template>

<script>
  export default {
    data() {
      return {
        keyword: ''
      }
    },
    methods: {
      handleClick() {
        alert('hello');
      }
    },
  };
</script>
