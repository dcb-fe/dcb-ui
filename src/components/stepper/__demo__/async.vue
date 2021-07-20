<template>
  <div>
    <d-stepper v-model="value" async-change @change="onChange"></d-stepper>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value: 1
      }
    },

    methods: {
      onChange(value) {
        console.log(value);
      },
    },
  };
</script>
