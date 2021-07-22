<template>
  <div>
    <d-stepper v-model="value" step="2"></d-stepper>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value: 1
      }
    }
  };
</script>
