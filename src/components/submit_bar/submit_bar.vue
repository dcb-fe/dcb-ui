<template>
  <div
    :class="[_.submit_bar, safeAreaInsetBottom && _.safe_area_inset_bottom]"
    v-bind="$attrs"
  >
    <div v-if="tip && tip !== '-'" :class="_.tip">
      <template v-if="tip === true">
        <slot name="tip"></slot>
      </template>
      <template v-else>
        <d-icon
          v-if="tipIcon && tipIcon !== '-'"
          :name="tipIcon"
          :class="_.icon"
        />
        <span>{{ tip }}</span>
      </template>
    </div>
    <div :class="_.bar">
      <slot />
      <div :class="_.text">
        <span :class="_.label">{{ label }}</span>
        <span>
          {{ currency }}
          <span :class="_.price">{{ Math.floor(price) }}</span>
          {{ floatPrice }}
          {{ suffixLabel | capitial }}
        </span>
      </div>

      <d-button :class="_.button" :disabled="disabled" @click="handleClick">{{
        buttonText
      }}</d-button>
    </div>
  </div>
</template>

<script>
  import DButton from '@/components/button/button';
  import DIcon from '@/components/icon/icon';

  import { defineComponent } from '@/utils';

  export default defineComponent({
    name: 'SubmitBar',

    components: { DButton, DIcon },

    filters: {
      capitial(val) {
        return val === '-' ? '' : val;
      },
    },
    inheritAttrs: false,

    props: {
      price: {
        type: String,
        default: '-',
        desc: '价格（单位元）',
      },
      label: {
        type: String,
        default: '合计：',
        desc: '价格文案',
      },
      suffixLabel: {
        type: String,
        default: '-',
        desc: '价格右侧文案',
      },
      buttonText: {
        type: String,
        default: '提交订单',
        desc: '按钮文字',
      },
      tip: {
        type: [String, Boolean],
        enum: ['string', 'boolean'],
        default: '-',
        desc: '提示文案',
      },
      tipIcon: {
        type: String,
        default: '-',
        desc: '图标名称，可选值见 Icon 组件',
      },
      disabled: {
        type: Boolean,
        default: false,
        desc: '是否禁用按钮',
      },
      currency: {
        type: String,
        default: '¥',
        desc: '货币符号',
      },
      safeAreaInsetBottom: {
        type: Boolean,
        default: true,
        desc: '是否为 iPhoneX 留出底部安全距离',
      },
      decimalLength: {
        type: Number,
        default: 2,
        desc: '价格小数点后位数',
      },
    },

    slots: {
      '-': {
        desc: '自定义订单栏左侧内容',
      },
      'tip': {
        desc: '自定义订单栏上方内容',
      },
    },

    emits: {
      submit: {
        desc: '点击提交时触发',
        payload: {
          e: {
            type: Object,
            desc: '事件对象',
          },
        },
      },
    },
    computed: {
      floatPrice() {
        return this.price.split('.')[1]
          ? `.${this.price.split('.')[1].substring(0, this.decimalLength)}`
          : '';
      },
    },

    methods: {
      handleClick(e) {
        if (!this.disabled) {
          this.$emit('submit', e);
        }
      },
    },
  });
</script>

<style lang="scss" module>
  .submit_bar {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    background-color: #fff;
    user-select: none;
    &.safe_area_inset_bottom {
      padding-bottom: 0;
    }
    .tip {
      padding: 8px 12px;
      color: #f56723;
      font-size: 12px;
      line-height: 1.5;
      background-color: #fff7cc;

      .icon {
        min-width: 18px;
        font-size: 12px;
        vertical-align: middle;
      }
    }
    .bar {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 54px;
      padding: 0 16px;
      font-size: 14px;
      text-align: right;
      .text {
        flex: 1;
        text-align: right;
        padding-right: 12px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ee0d24;

        .label {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 20px;
        }
        .price {
          font-size: 20px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ee0d24;
        }
      }
      .button {
        width: 103px;
        height: 38px;
        line-height: 38px;
        font-weight: 500;
        border: none;
        background: linear-gradient(90deg, #ff5f33 0%, #ef1325 100%);
      }
    }
  }
</style>
