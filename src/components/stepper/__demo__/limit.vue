<template>
  <div>
    <d-stepper v-model="value" min="5" max="8"></d-stepper>
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
