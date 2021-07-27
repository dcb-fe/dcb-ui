<template>
  <div 
  :class="[_.switch, isActive && _.switch_active]"  
  :style="switchStyle"
  @click="toggle"
  >
    <div 
    :class="_.switch_btn" 
    :style="buttonStyle"
    >
    </div>
  </div>
</template>

<script>
  import { defineComponent } from '@/utils';

  export default defineComponent({
    name: 'Switch',

    props: {
      active: {
        type: Boolean,
        default: false,
        desc: '开关状态'
      },

      disabled: {
        type: Boolean,
        default: false,
        desc: '禁用状态'
      },

      height: {
        type: [String, Number],
        default: 24,
        desc: '组件高度，单位px'
      },

      width: {
        type: [String, Number],
        default: 46,
        desc: '组件宽度，单位px'
      },

      activeBgColor: {
        type: String,
        default: "#18B2B9",
        desc: '打开状态背景颜色'
      },

      inActiveBgColor: {
        type: String,
        default: "#CCCCCC",
        desc: '关闭状态背景颜色'
      },

      btnColor: {
        type: String,
        default: "#FFFFFF",
        desc: '滑动圆按钮颜色'
      }
    },

    emits: {
      'switch-on': {
        desc: '开关打开时触发',
        payload: {
          e: {
            type: Boolean,
            desc: '回调参数',
          },
        },
      },

      'switch-off': {
        desc: '开关关闭时触发',
        payload: {
          e: {
            type: Boolean,
            desc: '回调参数',
          },
        },
      },
    },

    data() {
      return {
        isActive: false
      };
    },

    computed: {
      switchStyle() {
        const style = {};

        style.background = this.isActive ? this.activeBgColor : this.inActiveBgColor;
        style.borderColor = this.isActive ? this.activeBgColor : this.inActiveBgColor;

        return style;
      },

      buttonStyle() {
        const style = {};

        style.background = this.btnColor;

        return style;
      }
    },

    watch: {
      active(newVal) {
        this.isActive = newVal;
      }
    },

    created() {
      this.isActive = this.active;
    },

    methods: {
      toggle() {
        if (this.disabled) return;

        const status = this.isActive;
        this.isActive = !status;
        setTimeout(() => {
          this.$emit(status ? "switch-on" : "switch-off", this.isActive);
          this.$emit('update:active', !status);
        }, 300);
      }
    }
  });
</script>

<style lang="scss" module>
  .switch {
    position: relative;
    display: inline-block;
    background: #fdfdfd;
    border-radius: 1000px;
    border: 2px solid rgba(204, 204, 204, 1);
    transition: all 0.1s;
    width: 46px;
    height: 24px;

    &_btn {
      position: absolute;
      left: 0;
      background: #fff;
      border-radius: 50%;
      box-sizing: border-box;
      box-shadow: -1px 1px 1px #999;
      border: 1px solid rgba(50, 50, 50, 0.1);
      transition: all 0.3s;
      width: 24px;
      height: 24px;
    }

    &_active {
      background: #18B2B9;
      transition: all 0.2s ease 0.2s;

      .switch_btn {
        left: 22px;
        transition: all 0.3s ease 0.05s;
      }
    }
  }
</style>
