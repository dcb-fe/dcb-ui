<template>
  <div class="flex">
    <d-badge>
      <div class="child" />
      <template #content>
        <d-icon name="select" class="badge-icon" />
      </template>
    </d-badge>
    <d-badge>
      <div class="child" />
      <template #content>
        <d-icon name="add" class="badge-icon" />
      </template>
    </d-badge>
    <d-badge>
      <div class="child" />
      <template #content>
        <d-icon name="close" class="badge-icon" />
      </template>
    </d-badge>
  </div>
</template>
<script>
  import DIcon from '@/components/icon/icon';
  export default {
    components: {
      DIcon,
    },
    methods: {
      handleClick() {
        alert('hello');
      },
    },
  };
</script>
<style lang="scss">
  .flex {
    display: flex;
    & > div {
      margin-right: 20px;
    }
    .child {
      width: 40px;
      height: 40px;
      background: #d0d0d0;
      border-radius: 4px;
    }
    .badge-icon {
      display: block;
      font-size: 10px;
      line-height: 16px;
    }
  }
</style>
