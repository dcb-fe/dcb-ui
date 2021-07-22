<template>
  <d-switch :active="false" disabled @switch-on="switchOn" @switch-off="switchOff"/>
</template>

<script>
  export default {
    methods: {
      switchOn() {
        alert('hello');
      },

      switchOff() {
        alert('hello');
      },
    },
  };
</script>
