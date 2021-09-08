<template>
  <div
    :class="[_.goods_action, safeAreaInsetBottom && _.safe_area_inset_bottom]"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script>
  import { defineComponent } from '@/utils';
  export default defineComponent({
    name: 'GoodsAction',
    props: {
      safeAreaInsetBottom: {
        type: Boolean,
        default: true,
        desc: '是否为 iPhoneX 留出底部安全距离',
      },
    },
  });
</script>

<style lang="scss" module>
  .goods_action {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    box-sizing: content-box;
    height: 54px;
    background-color: #fff;
    &.safeAreaInsetBottom {
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
</style>
