<template>
  <div :class="[_.loading, vertical && _.vertical]">
    <div v-if="type === 'circular'" :class="_.circular">
      <svg viewBox="25 25 50 50">
        <circle class="path" cx="50" cy="50" r="20" fill="none" />
      </svg>
    </div>
    <div v-else :class="_.spinner">
      <i v-for="item in 12" :key="item" :class="_.leaf" />
    </div>
    <div v-if="$slots.default" :class="_.text">
      <slot />
    </div>
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
        desc: '加载的图标类型',
      },
      vertical: {
        type: Boolean,
        default: false,
        desc: '是否垂直排列图标和文字内容',
      },
    },

    slots: {
      default: {
        desc: '默认插槽，自定义文案',
      },
    },
  });
</script>

<style lang="scss" module>
  .loading {
    display: flex;
    align-items: center;
    font-size: 30px;
    color: #999999;

    .spinner {
      position: relative;
      display: inline-block;
      width: 1em;
      height: 1em;
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
      animation: rotate 0.8s linear infinite;
      animation-timing-function: steps(12);

      @keyframes rotate {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        to {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }

      .leaf {
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

        @for $i from 1 through 12 {
          &:nth-of-type(#{$i}) {
            transform: rotate($i * 30deg);
            opacity: 1 - (0.75 / 12) * ($i - 1);
          }
        }
      }
    }

    .circular {
      display: inline-block;
      width: 1em;
      height: 1em;
      stroke: currentColor;
      stroke-width: 3;
      stroke-linecap: round;
      vertical-align: middle;
      animation: circular 1.5s ease-in-out infinite;

      @keyframes circular {
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
    }

    .text {
      padding-left: 10px;
      font-size: 14px;
    }

    &.vertical {
      flex-direction: column;

      .text {
        padding-left: 0;
        padding-top: 6px;
      }
    }
  }
</style>
