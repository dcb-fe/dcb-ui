<template>
  <div
    :class="[_.button, disabled && _.disabled]"
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
    border: 1px solid red;
    color: red;
    user-select: none;

    &.disabled {
      pointer-events: none;
    }
  }
</style>
