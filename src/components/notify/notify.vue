<template>
  <Popup
    position="top"
    :visible="visible"
    :no-mask="true"
    :mask-transparent="true"
    :render-in-place="renderInPlace"
  >
    <div :class="[_.notify, _[type]]">
      <slot>
        {{ message }}
      </slot>
    </div>
  </Popup>
</template>

<script>
  import Popup from '@/components/popup/popup';
  import { defineComponent } from '@/utils';

  export default defineComponent({
    name: 'Notify',

    components: { Popup },

    model: {
      prop: 'visible',
      event: 'visibleChange',
    },

    props: {
      visible: {
        type: Boolean,
        required: true,
        desc: '通知是否显示',
      },
      type: {
        type: String,
        enum: ['primary', 'success', 'warning', 'danger'],
        default: 'danger',
        desc: '通知类型',
      },
      message: {
        type: String,
        required: true,
        desc: '展示文案',
      },
      duration: {
        type: Number,
        default: 1500,
        desc: '展示时长，单位：ms，设为 0 一直展示',
      },
      renderInPlace: {
        type: Boolean,
        default: false,
        desc: '是否原地渲染，默认会将弹出层渲染到 document.body 下以避免样式污染',
      },
    },

    slots: {
      default: {
        desc: '展示文案，如果和属性 message 同时出现，此项优先级更高',
      },
    },

    emits: {
      visibleChange: {
        desc: '通知显示状态变化时触发',
        payload: {
          visible: {
            type: Boolean,
            desc: '当前是否显示',
          },
        },
      },
    },

    watch: {
      visible: {
        immediate: true,
        handler(visible) {
          this.dispose();
          if (visible && this.duration !== 0) {
            this._timer = setTimeout(() => {
              this.$emit('visibleChange', false);
            }, this.duration);
          }
        },
      },
    },

    beforeDestroy() {
      this.dispose();
    },

    methods: {
      dispose() {
        if (this._timer) {
          clearTimeout(this._timer);
          this._timer = null;
        }
      },
    },
  });
</script>

<style lang="scss" module>
  .notify {
    margin-top: 12px;
    width: 200px;
    height: 44px;
    border-radius: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #ffffff;

    &.danger {
      background: #ee0d24;
      box-shadow: 0px 4px 14px 0px rgba(238, 13, 36, 0.24);
    }

    &.primary {
      background: #ff960a;
      box-shadow: 0px 4px 14px 0px rgba(255, 150, 10, 0.24);
    }

    &.success {
      background: #10c15f;
      box-shadow: 0px 4px 14px 0px rgba(16, 193, 95, 0.24);
    }

    &.warning {
      background: #ff976a;
      box-shadow: 0px 4px 14px 0px rgba(255, 151, 106, 0.24);
    }
  }
</style>
