<template>
  <div :class="_.search">123</div>
</template>

<script>
  import { defineComponent } from '@/utils';

  export default defineComponent({
    name: 'Search'
  });
</script>

<style lang="scss" module>
  .search {
    padding: 16px;
  }
</style>
