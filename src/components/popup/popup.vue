<template>
  <Portal selector="d-portal-container" :disabled="renderInPlace">
    <!-- 弹出层 -->
    <div
      :class="[_.popup, _[position], !visible && _.hidden]"
      :style="{ zIndex: zIndex }"
    >
      <!-- 遮罩 -->
      <transition
        appear
        name="d-transition-fade"
        @after-enter="handleTransitionEnterEnd"
        @after-leave="handleTransitionLeaveEnd"
      >
        <div
          v-if="visible"
          :class="[_.mask, maskTransparent && _.transparent]"
          @click="handleMaskClick"
        />
      </transition>

      <!-- 内容 -->
      <transition
        appear
        :name="`d-transition-${_transitionName}`"
        @after-enter="handleTransitionEnterEnd"
        @after-leave="handleTransitionLeaveEnd"
      >
        <slot v-if="visible" />
      </transition>
    </div>
  </Portal>
</template>

<script>
  import { defineComponent } from '@/utils';
  import { Portal } from '@linusborg/vue-simple-portal';

  export default defineComponent({
    name: 'Popup',

    components: {
      Portal,
    },

    props: {
      visible: {
        type: Boolean,
        default: false,
        desc: '是否显示',
      },
      position: {
        type: String,
        enum: ['center', 'top', 'left', 'right', 'bottom'],
        default: 'center',
        desc: '显示位置',
      },
      transitionName: {
        type: String,
        enum: [
          'auto',
          'fade',
          'fade-up',
          'fade-down',
          'fade-left',
          'fade-right',
          'slide-up',
          'slide-down',
          'slide-left',
          'slide-right',
          'zoom',
          'drop',
        ],
        default: 'auto',
        desc: '过渡名称，默认 `auto` 根据显示位置自动选择',
      },
      maskTransparent: {
        type: Boolean,
        default: false,
        desc: '是否使用透明遮罩',
      },
      renderInPlace: {
        type: Boolean,
        default: false,
        desc: '是否原地渲染，默认会将弹出层渲染到 document.body 下以避免样式污染',
      },
    },

    emits: {
      maskClick: {
        desc: '点击遮罩时触发',
        payload: {
          e: {
            type: Object,
            desc: '事件对象',
          },
        },
      },
      open: {
        desc: '弹出层打开时触发（弹出层已打开但打开效果尚未完成）',
      },
      opend: {
        desc: '弹出层打开后触发（弹出层已打开并且打开效果已完成）',
      },
      close: {
        desc: '弹出层关闭时触发（弹出层已关闭但关闭效果尚未完成）',
      },
      closed: {
        desc: '弹出层关闭后触发（弹出层已关闭并且关闭效果已完成）',
      },
    },

    computed: {
      _transitionName() {
        return this.transitionName === 'auto'
          ? {
              center: 'fade',
              top: 'slide-down',
              left: 'slide-left',
              right: 'slide-right',
              bottom: 'slide-up',
            }[this.position]
          : this.transitionName;
      },
    },

    watch: {
      visible: {
        immediate: true,
        handler(visible, prevVisible) {
          // 初始渲染时，仅 visible 为 true 时触发打开事件
          if (prevVisible == null) {
            if (visible) {
              this.$emit('open');
            }
          }
          // 后续渲染时，visible 为 true 触发打开事件，visible 为 false 触发关闭事件
          else {
            this.$emit(visible ? 'open' : 'close');
          }
        },
      },
    },

    methods: {
      // 点击遮罩
      handleMaskClick(e) {
        this.$emit('maskClick', e);
      },

      // 打开过渡效果结束
      handleTransitionEnterEnd() {
        if (this._handleTransitionEnterEndCount == null) {
          this._handleTransitionEnterEndCount = 0;
        }
        this._handleTransitionEnterEndCount++;
        // 由于涉及遮罩过渡、内容过渡，因此需要这二者都过渡结束才可触发
        if (this._handleTransitionEnterEndCount === 2) {
          this.$emit('opend');
          this._handleTransitionEnterEndCount = 0;
        }
      },

      // 关闭过渡效果结束
      handleTransitionLeaveEnd() {
        if (this._handleTransitionLeaveEndCount == null) {
          this._handleTransitionLeaveEndCount = 0;
        }
        this._handleTransitionLeaveEndCount++;
        // 由于涉及遮罩过渡、内容过渡，因此需要这二者都过渡结束才可触发
        if (this._handleTransitionLeaveEndCount === 2) {
          this.$emit('closed');
          this._handleTransitionLeaveEndCount = 0;
        }
      },
    },
  });
</script>

<style lang="scss" module>
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;

    &.hidden {
      pointer-events: none;
    }

    &.center {
      justify-content: center;
      align-items: center;
    }

    &.top {
      justify-content: center;
      align-items: flex-start;
    }

    &.bottom {
      justify-content: center;
      align-items: flex-end;
    }

    &.left {
      justify-content: flex-start;
      align-items: center;
    }

    &.right {
      justify-content: flex-end;
      align-items: center;
    }

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: -1;

      &.transparent {
        background: transparent;
      }
    }
  }
</style>

<style lang="scss">
  .d-transition {
    $kinds: (
      'fade',
      'fade-up',
      'fade-down',
      'fade-left',
      'fade-right',
      'slide-up',
      'slide-down',
      'slide-left',
      'slide-right',
      'zoom',
      'drop'
    );
    $whens: ('enter', 'leave');
    @each $kind in $kinds {
      &-#{$kind} {
        @each $when in $whens {
          &-#{$when}-active {
            animation: 
                // animation-duration
              300ms
              // animation-timing-function
              ease
              // animation-fill-mode
              both
              // animation-name
              d-transition-#{$kind}-#{$when};

            @if $kind == 'drop' {
              transform-origin: top center;
              animation-timing-function: cubic-bezier(0.34, 1.61, 0.7, 1);
            }
          }
        }
      }
    }
  }

  @keyframes d-transition-fade-enter {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes d-transition-fade-leave {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  @keyframes d-transition-fade-up-enter {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes d-transition-fade-up-leave {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
  }

  @keyframes d-transition-slide-up-enter {
    from {
      transform: translate3d(0, 100%, 0);
      visibility: visible;
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes d-transition-slide-up-leave {
    from {
      transform: translate3d(0, 0, 0);
    }

    to {
      visibility: hidden;
      transform: translate3d(0, 100%, 0);
    }
  }

  @keyframes d-transition-fade-down-enter {
    from {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes d-transition-fade-down-leave {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
  }

  @keyframes d-transition-slide-down-enter {
    from {
      transform: translate3d(0, -100%, 0);
      visibility: visible;
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes d-transition-slide-down-leave {
    from {
      transform: translate3d(0, 0, 0);
    }

    to {
      visibility: hidden;
      transform: translate3d(0, -100%, 0);
    }
  }

  @keyframes d-transition-fade-left-enter {
    from {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes d-transition-fade-left-leave {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }
  }

  @keyframes d-transition-slide-left-enter {
    from {
      transform: translate3d(-100%, 0, 0);
      visibility: visible;
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes d-transition-slide-left-leave {
    from {
      transform: translate3d(0, 0, 0);
    }

    to {
      visibility: hidden;
      transform: translate3d(-100%, 0, 0);
    }
  }

  @keyframes d-transition-fade-right-enter {
    from {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes d-transition-fade-right-leave {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
  }

  @keyframes d-transition-slide-right-enter {
    from {
      transform: translate3d(100%, 0, 0);
      visibility: visible;
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes d-transition-slide-right-leave {
    from {
      transform: translate3d(0, 0, 0);
    }

    to {
      visibility: hidden;
      transform: translate3d(100%, 0, 0);
    }
  }

  @keyframes d-transition-zoom-enter {
    from {
      transform: scale(0) translateZ(0);
    }

    to {
      transform: scale(1) translateZ(0);
    }
  }

  @keyframes d-transition-zoom-leave {
    from {
      transform: scale(1) translateZ(0);
    }

    to {
      transform: scale(0) translateZ(0);
    }
  }

  @keyframes d-transition-drop-enter {
    from {
      opacity: 0;
      transform: scale(0) translateZ(0);
    }

    to {
      opacity: 1;
      transform: scale(1) translateZ(0);
    }
  }

  @keyframes d-transition-drop-leave {
    from {
      opacity: 1;
      transform: scale(1) translateZ(0);
    }

    to {
      opacity: 0;
      transform: scale(0) translateZ(0);
    }
  }
</style>
