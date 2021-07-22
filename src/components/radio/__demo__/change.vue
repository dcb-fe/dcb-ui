<template>
  <div>
    <d-radio v-model="radioVal1" :label="1" @click="handleClick">备选项1</d-radio>
    <d-radio v-model="radioVal1" :label="2" @click="handleClick">备选项2</d-radio>
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
      handleClick(value) {
        alert(value);
      },
    },
  };
</script>
