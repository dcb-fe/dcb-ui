<template>
  <div :class="_.image">...</div>
</template>

<script>
  import { defineComponent } from '@/utils';
  export default defineComponent({
    name: 'Image',
    props: {
      src: {
        type: String,
        default: '',
        desc: '图片链接',
      },
      fit: {
        type: String,
        default: 'fill',
        desc: '图片填充模式',
      },
      alt: {
        type: String,
        default: '',
        desc: '替代文本',
      },
      width: {
        type: String,
        enum: ['number', 'string'],
        default: '',
        desc: '宽度，默认单位为px',
      },
      height: {
        type: String,
        enum: ['number', 'string'],
        default: '',
        desc: '高度，默认单位为px',
      },
      radius: {
        type: String,
        enum: ['number', 'string'],
        default: '',
        desc: '圆角大小，默认单位为px',
      },
      round: {
        type: Boolean,
        default: true,
        desc: '是否显示指示器',
      },
      vertical: {
        type: Boolean,
        default: false,
        desc: '是否为纵向滚动',
      },
      indicatorPosition: {
        type: String,
        enum: ['left', 'right', 'top', 'bottom'],
        default: 'bottom',
        desc: '指示器位置',
      }
    },
  });
</script>

<style lang="scss" module>
  .image {
  }
</style>
