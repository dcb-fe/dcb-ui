<template>
  <div :class="[_.stepper, theme === 'round' && _.round]">
    <button
      :class="[_.minus, minusDisabled && _.disabled]"
      @click="handleClick('minus')"
      @touchstart="handleTouchstart('minus')"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    />
    <input
      type="number"
      :value="currentValue"
      role="spinbutton"
      :class="_.input"
      :aria-valuemax="max"
      :aria-valuemin="min"
      :aria-valuenow="currentValue"
      :disabled="disabled || disableInput"
      :style="inputStyle"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <button
      :class="[_.plus, plusDisabled && _.disabled]"
      @click="handleClick('plus')"
      @touchstart="handleTouchstart('plus')"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    />
  </div>
</template>

<script>
  import { addUnit, getRootScrollTop, isDef, isIOS } from './utils';
  import { defineComponent } from '@/utils';

  const LONG_PRESS_START_TIME = 600;
  const LONG_PRESS_INTERVAL = 200;

  export default defineComponent({
    name: 'Stepper',

    props: {
      value: {
        type: [Number, String],
        default: null,
        desc: '当前输入默认值',
      },

      integer: {
        type: Boolean,
        desc: '是否只允许输入整数',
      },

      disabled: {
        type: Boolean,
        desc: '是否禁用步进器',
      },

      inputWidth: {
        type: [Number, String],
        default: '',
        desc: '输入框宽度，默认单位为px',
      },

      buttonSize: {
        type: [Number, String],
        default: '',
        desc: '按钮大小以及输入框高度，默认单位为px',
      },

      asyncChange: {
        type: Boolean,
        desc: '是否开启异步变更，开启后需要手动控制输入值',
      },

      disableInput: {
        type: Boolean,
        desc: '是否禁用输入框',
      },

      min: {
        type: [Number, String],
        default: 1,
        desc: '最小值',
      },

      max: {
        type: [Number, String],
        default: Infinity,
        desc: '最大值',
      },

      step: {
        type: [Number, String],
        default: 1,
        desc: '步长，每次点击时改变的值',
      },

      defaultValue: {
        type: [Number, String],
        default: 1,
        desc: '初始值，当 v-model 为空时生效',
      },

      theme: {
        type: String,
        default: '',
        desc: '样式风格，可选值为 round',
      },
    },

    emits: {
      change: {
        desc: '当绑定值变化时触发的事件',
        payload: {
          e: {
            type: String,
            desc: '回调参数',
          },
        },
      },

      overlimit: {
        desc: '点击不可用的按钮时触发',
      },

      plus: {
        desc: '点击增加按钮时触发',
      },

      minus: {
        desc: '点击减少按钮时触发',
      },

      focus: {
        desc: '输入框聚焦时触发',
        payload: {
          e: {
            type: Object,
            desc: '回调参数',
          },
        },
      },

      blur: {
        desc: '输入框失焦时触发',
        payload: {
          e: {
            type: Object,
            desc: '回调参数',
          },
        },
      },
    },

    data() {
      const value = this.range(
        isDef(this.value) ? this.value : this.defaultValue,
      );

      if (value !== +this.value) {
        this.$emit('input', value);
      }

      return {
        currentValue: value,
      };
    },

    computed: {
      minusDisabled() {
        return this.disabled || this.currentValue <= this.min;
      },

      plusDisabled() {
        return this.disabled || this.currentValue >= this.max;
      },

      inputStyle() {
        const style = {};

        if (this.inputWidth) {
          style.width = addUnit(this.inputWidth);
        }

        if (this.buttonSize) {
          style.height = addUnit(this.buttonSize);
        }

        return style;
      },

      buttonStyle() {
        const style = {};

        if (this.buttonSize) {
          const size = addUnit(this.buttonSize);
          style.width = size;
          style.height = size;
        }

        return style;
      },
    },

    watch: {
      value(val) {
        if (val !== this.currentValue) {
          this.currentValue = this.format(val);
        }
      },

      currentValue(val) {
        this.$emit('input', val);
        this.$emit('change', val);
      },
    },

    methods: {
      format(value) {
        value = String(value).replace(/[^0-9.-]/g, '');
        return value === '' ? 0 : this.integer ? Math.floor(value) : +value;
      },

      range(value) {
        return Math.max(Math.min(this.max, this.format(value)), this.min);
      },

      onInput(event) {
        const { value } = event.target;
        const formatted = this.format(value);

        if (this.asyncChange) {
          event.target.value = this.currentValue;
          this.$emit('input', formatted);
          this.$emit('change', formatted);
        } else {
          if (+value !== formatted) {
            event.target.value = formatted;
          }

          this.currentValue = formatted;
        }
      },

      onChange() {
        const { type } = this;

        if (this[`${type}Disabled`]) {
          this.$emit('overlimit', type);
          return;
        }

        const diff = type === 'minus' ? -this.step : +this.step;
        const value = Math.round((this.currentValue + diff) * 100) / 100;

        if (this.asyncChange) {
          this.$emit('input', value);
          this.$emit('change', value);
        } else {
          this.currentValue = this.range(value);
        }

        this.$emit(type);
      },

      onFocus(event) {
        this.$emit('focus', event);
      },

      onBlur(event) {
        this.currentValue = this.range(this.currentValue);
        this.$emit('blur', event);

        if (this.currentValue === 0) {
          event.target.value = this.currentValue;
        }

        if (isIOS()) {
          window.scrollTo(0, getRootScrollTop());
        }
      },

      longPressStep() {
        this.longPressTimer = setTimeout(() => {
          this.onChange();
          this.longPressStep();
        }, LONG_PRESS_INTERVAL);
      },

      onTouchStart() {
        clearTimeout(this.longPressTimer);
        this.isLongPress = false;

        this.longPressTimer = setTimeout(() => {
          this.isLongPress = true;
          this.onChange();
          this.longPressStep();
        }, LONG_PRESS_START_TIME);
      },

      onTouchEnd(event) {
        clearTimeout(this.longPressTimer);

        if (this.isLongPress) {
          event.preventDefault();
        }
      },

      handleClick(type) {
        this.type = type;
        this.onChange();
      },

      handleTouchstart(type) {
        this.type = type;
        this.onTouchStart();
      },
    },
  });
</script>

<style lang="scss" module>
  .stepper {
    font-size: 0;

    .minus,
    .plus {
      position: relative;
      box-sizing: border-box;
      width: 33px;
      height: 30px;
      margin: 0;
      padding: 5px;
      color: #333333;
      vertical-align: middle;
      background-color: #f2f3f5;
      border: 1px solid #dcdcdc;

      &::before {
        width: 10px;
        height: 2px;
      }

      &::after {
        width: 2px;
        height: 10px;
      }

      &::before,
      &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        background-color: currentColor;
        content: '';
      }

      &:active {
        background-color: #e6e6e6;
      }

      &.disabled {
        color: #c8c9cc;
        background-color: #f7f8fa;

        &:active {
          background-color: #f7f8fa;
        }
      }
    }

    .minus {
      border-radius: 50px 0 0 50px;

      &::after {
        display: none;
      }
    }

    .plus {
      border-radius: 0 50px 50px 0;
    }

    .input {
      box-sizing: border-box;
      width: 38px;
      height: 30px;
      padding: 0;
      color: #323233;
      font-size: 15px;
      font-weight: 600;
      text-align: center;
      vertical-align: middle;
      background-color: #f2f3f5;
      border-top: 1px solid #dcdcdc;
      border-bottom: 1px solid #dcdcdc;
      border-width: 1px 0;
      border-radius: 0;
      -webkit-appearance: none;
      outline: none;

      &[disabled] {
        color: #c8c9cc;
        background-color: #f2f3f5;
      }
    }

    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
      margin: 0;
      -webkit-appearance: none;
    }

    &.round {
      .input {
        background-color: transparent;
        border: none;
        color: #333;
      }

      .plus,
      .minus {
        width: 24px;
        height: 24px;
        border-radius: 100%;

        &:active {
          opacity: #ff960a;
        }

        &__disabled {
          &,
          &:active {
            opacity: 0.3;
          }
        }
      }

      .plus {
        color: #fff;
        background-color: #ff960a;
      }

      .minus {
        color: #ff960a;
        background-color: #fff;
        border: 1px solid #ff960a;
      }
    }
  }
</style>
