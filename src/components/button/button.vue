<template>
  <div :class="_.button">
    <slot />
  </div>
</template>

<script>
  import { defineComponent } from '@/utils';

  export default defineComponent({
    name: 'Button',

    methods: {
      async handleClick() {
        console.log(1);
      },
    },
  });
</script>

<style lang="scss" module>
  .button {
    border: 1px solid red;
    color: red;
  }
</style>
