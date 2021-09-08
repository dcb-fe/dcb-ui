<template>
  <d-button
    :class="_.goods_action_button"
    :style="{ background: color }"
    @click="$emit('click')"
    >{{ text }}</d-button
  >
</template>

<script>
  import DButton from '@/components/button/button';
  import { defineComponent } from '@/utils';

  export default defineComponent({
    name: 'GoodsActionButton',
    components: {
      DButton,
    },
    props: {
      text: {
        type: String,
        default: '-',
        desc: '按钮文字',
      },
      color: {
        type: String,
        default: 'linear-gradient(90deg, #FECE20 0%, #FF8A17 100%)',
        desc: '按钮背景颜色',
      },
    },
  });
</script>

<style lang="scss" module>
  .goods_action_button {
    flex: 1;
    height: 38px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 20px;
    margin-right: 5px;
  }
</style>
