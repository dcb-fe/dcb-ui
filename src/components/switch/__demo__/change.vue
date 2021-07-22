<template>
  <d-switch :active="false" @switch-on="switchOn" @switch-off="switchOff"/>
</template>

<script>
  export default {
    methods: {
      switchOn(value) {
        console.log('on', value);
      },

      switchOff(value) {
        console.log('off', value);
      },
    },
  };
</script>
