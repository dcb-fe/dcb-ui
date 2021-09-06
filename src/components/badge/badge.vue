<template>
  <div :class="_.badge">
    <slot />
    <div
      :class="[_.content, dot && _.dot, $slots.default && _.fixed]"
      :style="{ background: color }"
    >
      <slot name="content">{{ content + `${content > max ? '+' : ''}` }}</slot>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from '@/utils';

  export default defineComponent({
    name: 'Badge',
    inheritAttrs: false,

    props: {
      content: {
        type: [String, Number],
        default: '',
        desc: '徽标内容',
      },
      color: {
        type: String,
        default: '#ee0a24',
        desc: '徽标背景颜色',
      },
      dot: {
        type: Boolean,
        default: false,
        desc: '是否展示为小红点',
      },
      max: {
        type: [String, Number],
        default: 99,
        desc: '最大值，超过最大值会显示 {max}+，仅当 content 为数字时有效',
      },
    },

    slots: {
      default: {
        desc: '徽标包裹的子元素',
      },
      content: {
        desc: '自定义徽标内容',
      },
    },
  });
</script>

<style lang="scss" module>
  .badge {
    position: relative;
    display: inline-block;
    .content {
      display: inline-block;
      box-sizing: border-box;
      min-width: 16px;
      padding: 0 3px;
      color: #fff;
      font-weight: 500;
      font-size: 12px;
      font-family: -apple-system-font, Helvetica Neue, Arial, sans-serif;
      line-height: 1.2;
      text-align: center;
      background-color: #ee0a24;
      border: 1px solid #fff;
      border-radius: 999px;
      &.dot {
        width: 8px;
        min-width: 0;
        height: 8px;
        background-color: #ee0a24;
        border-radius: 100%;
      }
      &.fixed {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
        transform-origin: 100%;
      }
    }
  }
</style>
