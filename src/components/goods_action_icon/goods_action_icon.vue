<template>
  <div :class="_.goods_action_icon" @click="$emit('click')">
    <div :class="_.content">
      <d-badge :content="badge" :dot="dot">
        <d-icon :name="icon" :class="_.icon" :style="{ color: color }" />
      </d-badge>
    </div>

    {{ text }}
  </div>
</template>

<script>
  import DIcon from '@/components/icon/icon';
  import Badge from '@/components/badge/badge';
  import { defineComponent } from '@/utils';

  export default defineComponent({
    name: 'GoodsActionIcon',
    components: {
      DIcon,
      Badge,
    },
    props: {
      icon: {
        type: String,
        default: '-',
        desc: '图标',
      },
      text: {
        type: String,
        default: '-',
        desc: '按钮文字',
      },
      color: {
        type: String,
        default: '#323233',
        desc: '图标颜色',
      },
      dot: {
        type: Boolean,
        default: false,
        desc: '是否显示图标右上角小红点',
      },
      badge: {
        type: [Number, String],
        default: '',
        desc: '图标右上角徽标的内容',
      },
    },
  });
</script>

<style lang="scss" module>
  .goods_action_icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    min-width: 48px;
    color: #646566;
    font-size: 10px;
    line-height: 1;
    text-align: center;
    background-color: #fff;
    cursor: pointer;
    .content {
      position: relative;
      .icon {
        position: relative;
        width: 18px;
        margin: 0 auto 5px;
        color: #323233;
        font-size: 18px;
        & + div {
          right: -5px;
        }
      }
    }
  }
</style>
