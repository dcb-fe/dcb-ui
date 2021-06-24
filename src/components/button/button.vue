<template>
  <div
    :class="[
      _.button,
      block && _.block,
      plain && _.plain,
      square && _.square,
      round && _.round,
      disabled && _.disabled,
    ]"
    v-bind="$attrs"
    v-on="{
      ...$listeners,
      click: handleClick,
    }"
  >
    <slot />
  </div>
</template>

<script>
  import { defineComponent } from '@/utils';

  export default defineComponent({
    name: 'Button',

    inheritAttrs: false,

    props: {
      type: {
        type: String,
        enum: ['default', 'primary', 'info', 'warning', 'danger'],
        default: 'default',
        desc: '描述',
      },
      size: {
        type: String,
        enum: ['normal', 'large', 'small', 'mini'],
        default: 'normal',
        desc: '尺寸',
      },
      block: {
        type: Boolean,
        default: false,
        desc: '是否为块级元素',
      },
      plain: {
        type: Boolean,
        default: false,
        desc: '是否为朴素按钮',
      },
      square: {
        type: Boolean,
        default: false,
        desc: '是否为方形按钮',
      },
      round: {
        type: Boolean,
        default: false,
        desc: '是否为圆形按钮',
      },
      disabled: {
        type: Boolean,
        default: false,
        desc: '是否禁用按钮',
      },
    },

    slots: {
      default: {
        desc: '按钮内容',
      },
    },

    emits: {
      click: {
        desc: '点击时触发',
        payload: {
          e: {
            type: Object,
            desc: '事件对象',
          },
        },
      },
    },

    methods: {
      handleClick(e) {
        if (!this.disabled) {
          this.$emit('click', e);
        }
      },
    },
  });
</script>

<style lang="scss" module>
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-size: 16px;
    height: 44px;
    padding: 0 15px;
    box-sizing: border-box;
    border-radius: 2px;
    border: 1px solid #ebedf0;
    background-color: white;
    color: black;
    cursor: pointer;
    user-select: none;

    &.block {
      display: flex;
    }

    &.disabled {
      cursor: not-allowed;
    }

    &:not(.disabled) {
      &:active {
        &::before {
          content: ' ';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background-color: #000;
          border: inherit;
          border-color: #000;
          border-radius: inherit;
          transform: translate(-50%, -50%);
          opacity: 0.1;
        }
      }
    }
  }
</style>
