<template>
  <div :class="_.button">
    <slot />
  </div>
</template>

<script>
  import { defineComponent } from '@/utils';

  export default defineComponent({
    name: 'Button',

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
      async handleClick() {
        console.log(1);
      },
    },
  });
</script>

<style lang="scss" module>
  .button {
    border: 1px solid red;
    color: red;
  }
</style>
