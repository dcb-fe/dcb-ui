<template>
  <div>
    <d-stepper v-model="value" disabled></d-stepper>
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
