<template>
  <label :class="_.radio" @click="clickEvt">
    <input 
      type="radio"
      :value="currentValue"
      :class="[_.input, currentValue === label && _.checked]"
      :disabled="isDisabled"
      :label="label"
    />

    <span :class="_.label">
      <slot></slot>
    </span>
  </label>
</template>

<script>
  import { defineComponent } from '@/utils';

  export default defineComponent({
    name: 'Radio',

    props: {
      value: {
        type: [String, Number, Boolean],
        default: false,
        desc: '当前选中项的标识符，与label值一致时呈选中状态'
      },

      label: {
        type: [String, Number, Boolean],
        default: '',
        desc: '标识符，与v-model值一致时呈选中状态'
      },

      disabled: {
        type: Boolean,
        default: false,
        desc: '是否禁用'
      }
    },

    emits: {
      click: {
        desc: '点击时触发',
        payload: {
          e: {
            type: [String, Number, Boolean],
            desc: '选中状态值',
          },
        },
      },
    },

    data () {
      return {
        parent: null
      }
    },

    computed: {
      currentValue: {
        get () {
          return this.parent ? this.parent.value : this.value;
        },

        set (val) {
          (this.parent || this).$emit('input', val);
        }
      },

      isDisabled () {
        return this.parent ? this.parent.disabled || this.disabled : this.disabled;
      }
    },

    methods: {
      clickEvt () {
        if (this.isDisabled) return;
        console.log(this.label);
        this.currentValue = this.label;
        this.$emit('click', this.label);
      }
    }
  });
</script>

<style lang="scss" module>
  .radio {
    margin-right: 10px;
  }

  .label {
    pointer-events: none;
    vertical-align: middle;
  }

  .input {
    width: 20px;
    height: 20px;
    position: relative;
    -webkit-appearance: none;
    border: 1px solid #dadada;
    border-radius: 50%;
    background-size: cover;
    outline: none;
    opacity: 1;
    vertical-align: middle;
    margin-top: 0px;

    &::after {
      position: absolute;
      left: 50%;
      top: 50%;
      content: '';
      width: 0;
      height: 0;
      transform: translate(-50%, -50%);
      background: rgba(255, 150, 10, 1);
      border-radius: 50%;
      opacity: 0;
      pointer-events: none;
    }

    &:disabled {
      background-color: #dadada;
      border-color: #f6f6f6;
      box-shadow: none;
    }
  }

  .checked {
    background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAADnklEQVRYR82ZTYgcVRDHf/+eiTq9ySlRFAUPHvQgXlT04iEnBVH8hBwkiJFlZ3YVjAQSgjASSbysl91MjwoLohBkg+hhTx5y8CKoeIjgB3gQDMpmPEjcnh2T6ZJ+PTs7sx929+zs0n2cqar366p+VfXqiREeq+NxqPIwJe8w2IPAvcAdGAecOXEN+AP4GfQd3egSrfY3qhPlXU55FCyo3EnEDOglxF15dDF+B/sEj3lV21ey6mYCtPkDB/G6Z8BeAd2c1fjWctYBLRCV3tLMtb/SbKUCWrD/CBbNAYfSjOX8v4XnzWjqn0//T29bQKtT5jY/BpvKuXBe8SbL4Wuqc2MrxS0B7T0q3OIvAk/mXW1E+SVWwxd1nPZG/U2APc99vodwa0xLLIfPbPTkZsCGH+xBWLdzdFO1sDr45xBgb0NcGDFM41HzvCODG6cP2EslP+3Cbs0L3iIq3beWgtYBA7+BMeTevJbHKB+oFtaSogS4CmH8uvMkPC5E6yDuiStOAni+cg7p5LjMj8WO2buabp+SK/y3+r/lrq35KObY5wX82z2G9GYm1bh2Xw3vls1XHsHT15mURhESb6sa1l2kLlHmR78DeJlMRfaoLJg4idm5TAr5hU6rFp5dU7OG/zTwRWYz0ilZw78IPJ9ZKZugITuhanu2D3d+4gkUfQaqZDPhtvDFGPAycH9mpXTBGO51Vdvz63D+U8gWR8gSP8SALeBg+rrujersK89xvTsJdhZL0tTAE3fMVdXCD/pwzcpzmC5g3JRpjUEh0YoBV4FsTehKuF8nWElyp38a450Be13QMdVWPurDxb1kFH2MKOeGSxQ6+QDFpKrhh+sf/cQs2HHgBp6OamqlX8etOXGUyBaA0ohwPcDAv4pl7pavA8+qFi45L8ZBb/hNzL7UdDvebO6xhv8q8H7mdLLdG/RCnG+TmLWRPa7a6ldb2bWGPw3EnXjqcSLVs+KyLPAXMV5IFR4W+BtxWNXw+8GfLai8gSlOLTuHiw27NDN6ol6m3H1Mk51fkk2zCwnfJeqdlboryGZBD2C8nDMK6eKu1O1Ns5AOs1FirVlw4Slyu5V8PwVvWHu5qxGXqfyx2BWN4ZbfASbzl+IempJQuzlMMY+dA2WquAd358VkaFTc0YeDLPLwqB/qIo/fhhuAgg4whyDjFFTqnsHGNAKWFuiOaQS8oZ0q5hB9Ux0fvIYwe8hdQ4jbh64hjD/dNYT07U6uIf4Du+mI0FUSzCcAAAAASUVORK5CYII=');
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    background-size: 100%;
    box-shadow: 0 4px 6px 0 rgba(#FF960A, 0.15);
  }

</style>
