<template>
  <div
    :class="[
      _.button,
      secondary && _.secondary,
      _[size],
      disabled && _.disabled,
    ]"
    v-bind="$attrs"
    v-on="{
      ...$listeners,
      click: handleClick,
    }"
  >
    <div :class="_.container">
      <slot />
    </div>
  </div>
</template>

<script>
  import { defineComponent } from '@/utils';

  export default defineComponent({
    name: 'Button',

    inheritAttrs: false,

    props: {
      secondary: {
        type: Boolean,
        default: false,
        desc: '是否为次级按钮',
      },
      size: {
        type: String,
        enum: ['normal', 'large', 'small'],
        default: 'normal',
        desc: '按钮尺寸',
      },
      disabled: {
        type: Boolean,
        default: false,
        desc: '是否为禁用状态',
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
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    box-sizing: border-box;
    background: #ff960a;
    border: 1px solid transparent;
    border-radius: 100px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    user-select: none;

    &.disabled {
      background: #e9e9e9 !important;
      border-color: #e9e9e9;
      color: white;
      cursor: not-allowed;
    }

    &:not(.disabled):active {
      &::before {
        content: ' ';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        border-radius: inherit;
        background: rgba(black, 0.118);
      }
    }

    &.secondary {
      background: white;
      border-color: #e9e9e9;
      color: #333333;

      &.disabled {
        background: white !important;
        color: #d0d0d0;
      }

      &:not(.disabled):active {
        &::before {
          content: none;
        }

        background: #e9e9e9;
        border-color: #e9e9e9;
      }
    }

    &.large {
      height: 50px;
    }

    &.small {
      height: 38px;
    }

    .container {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      border-radius: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
