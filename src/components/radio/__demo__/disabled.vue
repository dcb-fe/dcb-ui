<template>
  <div>
    <d-radio v-model="radioVal1" disabled :label="1">备选项1</d-radio>
    <d-radio v-model="radioVal1" disabled :label="2">备选项2</d-radio>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radioVal1: 1
      }
    },

    methods: {
      handleClick() {
        alert('hello');
      },
    },
  };
</script>
