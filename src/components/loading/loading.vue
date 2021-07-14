<template>
  <div :class="[_.loading, vertical && _.vertical]">
    <span v-if="type === 'circular'" :class="[_.circular]" :style="iconStyle">
      <svg viewBox="25 25 50 50">
        <circle class="path" cx="50" cy="50" r="20" fill="none"/>
      </svg>
    </span>
    <span :style="iconStyle" :class="[_.spinner]" v-else>
      <i v-for="item in 12" :key="item"></i>
    </span>
    <span v-if="$slots.default" :class=[_.text] :style="textStyle"><slot></slot></span>
  </div>
</template>

<script>
  import { defineComponent } from '@/utils';

  export default defineComponent({
    name: 'Loading',
    props: {
      type: {
        type: String,
        enum: ['circular', 'spinner'],
        default: 'circular',
        desc: '加载的图标类型'
      },
      color: {
        type: String,
        default: '#999999',
        desc: '自定义颜色'
      },
      size: {
        type: String,
        default: '30px',
        desc: '加载图标的大小，单位px'
      },
      vertical: {
        type: Boolean,
        default: false,
        desc: '是否垂直排列图标和文字内容'
      },
      textColor: {
        type: String,
        desc: '文字颜色'
      }
    },
    slots: {
      default: {
        desc: '默认插槽，自定义loading文案',
      },
    },
    computed: {
      iconStyle() {
        const iconSize = this.size;
        return {
          color: this.color,
          width: iconSize,
          height: iconSize
        }
      },
      textStyle () {
        return {
          color: this.textColor || this.color
        }
      }
    }
  });
</script>

<style lang="scss" module>
  .loading {
    display: inline-block;
    &.vertical {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .spinner {
      position: relative;
      display: inline-block;
      width: 30px;
      max-width: 100%;
      height: 30px;
      max-height: 100%;
      vertical-align: middle;

      i {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        &::before {
          display: block;
          width: 2px;
          height: 25%;
          margin: 0 auto;
          background-color: currentColor;
          border-radius: 40%;
          content: ' ';
        }
      }
    }
    .circular {
      display: inline-block;
      width: 100%;
      height: 100%;
      stroke: currentColor;
      stroke-width: 3;
      stroke-linecap: round;
      vertical-align: middle;
    }
    .text {
      padding-left: 10px;
      font-size: 14px;
      font-weight: 400;
    }
  }
</style>
<style lang="scss">
  .d-loading-spinner {
    animation: d-rotate 0.8s linear infinite;
    animation-timing-function: steps(12);
  }
  .d-loading-circular {
    animation: d-circular 1.5s ease-in-out infinite;
  }
  .d-loading-vertical {
    .d-loading-text {
      padding-left: 0;
      padding-top: 6px;
    }
  }
  @keyframes d-rotate {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg)
    }
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg)
    }
  }
  @keyframes d-circular {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40;
    }

    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120;
    }
  }

  @for $i from 1 through  12 {
    .d-loading-spinner i:nth-of-type(#{$i}) {
      transform: rotate($i * 30deg);
      opacity: 1 - (0.75 / 12) * ($i - 1);
    }
  }
</style>
