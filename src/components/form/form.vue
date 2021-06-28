<template>
  <div :class="_.form">
    <slot />

    <slot name="tips" />
  </div>
</template>

<script>
  import { defineComponent } from '@/utils';

  export default defineComponent({
    name: 'Form',

    props: {
      size: {
        type: String,
        default: 'normal',
        enum: ['normal', 'large', 'mini'],
        desc: '表单大小',
      },
    },

    slots: {
      default: {
        desc: '表单内容',
      },
      tips: {
        desc: '表单提示',
        payload: {
          x: {
            type: String,
            desc: 'xxxx',
          },
          y: {
            type: Number,
            desc: 'yyyy',
          },
        },
      },
    },

    emits: {
      submit: {
        desc: '表单提交时触发',
        payload: {
          x: {
            type: String,
            desc: 'xxxx',
          },
          y: {
            type: Number,
            desc: 'yyyy',
          },
        },
      },
    },
  });
</script>

<style lang="scss" module>
  .form {
    color: white;
  }
</style>
