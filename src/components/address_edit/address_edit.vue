<template>
  <div :class="_.address_edit">
    <div :class="_.cell_group">
      <d-cell label="姓名">
        <input slot="desc" v-model="form.receiver" :class="_.input" type="text" placeholder="请填写姓名" @blur="onBlur">
      </d-cell>

      <d-cell label="手机号码">
        <input slot="desc" v-model="form.phoneNo" :class="_.input" type="tel" placeholder="请填写手机号" @blur="onBlur">
      </d-cell>

      <d-cell label="所在区域" right-icon="arrow_right" @click="handleClick">
        <span slot="desc" :class="[_.address_text, !addressText && _.placeholder]">{{addressText ? addressText : '请选择所在区域'}}</span>
      </d-cell>

      <d-cell label="详细地址" :border="false">
        <textarea slot="desc" v-model="form.detail" :class="_.textarea" placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等" @blur="onBlur"></textarea>
      </d-cell>
    </div>

    <div :class="_.cell_group">
      <d-cell label="是否设置为默认地址" :border="false">
        <d-switch slot="desc" @switch-on="switchOn" @switch-off="switchOff"/>
      </d-cell>
    </div>

    <div :class="_.bottom">
      <d-button :disabled="disabled" @click="handleSave">保存地址</d-button>
    </div>

    <d-area 
      v-model="visible" 
      :province="province"
      :city="city"
      :country="country"
      v-bind="$attrs"
      v-on="$listeners"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script>
  import DArea from '../area/area';
  import DButton from '../button/button';
  import DCell from '../cell/cell';
  import DSwitch from '../switch/switch';
  import { defineComponent } from '@/utils';
  import { getRootScrollTop } from '../../utils/dom/scroll';
  import { isIOS } from '../../utils/validate/system';
  import { isMobile } from '../../utils/validate/mobile';

  export default defineComponent({
    name: 'AddressEdit',

    components: {
      DArea,
      DButton,
      DCell,
      DSwitch
    },

    props: {
      province: {
        type: Array,
        default: () => [],
        desc: '省'
      },

      city: {
        type: Array,
        default: () => [],
        desc: '市'
      },

      country: {
        type: Array,
        default: () => [],
        desc: '区'
      },

      // eslint-disable-next-line vue/require-default-prop
      addressInfo: {
        type: Object,
        desc: '保存的表单信息'
      },

      telValidator: {
        type: Function,
        default: isMobile
      }
    },

    emits: {
      save: {
        desc: '点击保存地址按钮触发',
        payload: {
          form: {
            type: Object,
            default: {},
            desc: '保存的表单信息'
          }
        }
      },

      onChange: {
        desc: '选择地区时触发',
        payload: {
          calBack: {
            type: Object,
            desc: '当前点击的行政区域'
          }
        }
      }
    },

    data () {
      return {
        addressText: '',
        visible: false,
        disabled: true,
        form: {
          ...this.addressInfo
        }
      }
    },

    watch: {
      form: {
        deep: true,
        handler (params) {
          const isValid = this.validate(params);

          this.disabled = !isValid;
        }
      }
    },

    methods: {
      validate (params) {
        const flag = true;

        for (const key in params) {
          if (!params[key] && key !== 'id' && key !== 'defaultFlag' && key !== 'province' && key !== 'city' && key !== 'county') {
            return false;
          }
        }

        return flag;
      },

      handleClick () {
        this.visible = true;
      },

      onBlur () {
        if (isIOS()) {
          window.scrollTo(0, getRootScrollTop());
        }
      },

      switchOn(value) {
        this.form.defaultFlag = +value;
      },

      switchOff(value) {
        this.form.defaultFlag = +value;
      },

      handleConfirm ({province, city, country}) {
        this.addressText = [province.districtSimpleName, city.districtSimpleName, country.districtSimpleName].join('');
        this.form.province = province.districtSimpleName;
        this.form.city = city.districtSimpleName;
        this.form.county = country.districtSimpleName;
        this.form.districtCode = country.districtCode;
      },

      handleSave () {
        this.$emit('save', this.form);
      }
    }
  });
</script>

<style lang="scss" module>
  .address_edit {
    height: 100%;
    background-color: #F5F5F5;
    box-sizing: border-box;
    padding-bottom: 24px;
  }

  .cell_group {
    border-top: 8px solid #F5F5F5;
  }

  .input, .textarea {
    outline: none;
    padding: 0;
    width: 100%;
    height: 22px;
    border: none;
    font-size: 15px;
    font-family: inherit;
    line-height: 1;
    display: block;

    &::placeholder {
      color: #ccc;
    }
  }

  .textarea {
    resize: none;
    min-height: 44px;
    line-height: 22px;
  }

  .address_text {
    flex: 1;
    font-size: 16px;
    line-height: 22px;
  }

  .placeholder {
    color: #ccc;
    font-size: 16px;
    line-height: 22px;
  }

  .bottom {
    margin-top: 220px;
    padding: 0 16px;
    width: 100%;
    box-sizing: border-box;
  }
</style>
