<template>
  <div style="padding-left: 12px; background-color: #fff">
    <div :class="_.field">
      <d-icon v-if="leftIcon" :class="_.left_icon" :name="leftIcon" />
      <div
        :class="[
          _.left_label,
          disabled?_.field_disabled:'',
          required?_.field_required:'',
          ]">
        <span :disabled="disabled">{{label}}</span>
      </div>
      <div :class="[
        _.right_input,
        disabled?_.field_disabled:'',
        error?_.field_error:'',
        errorMessage?_.field_error_message:''
        ]"
           style="position: relative"
      >
        <input
          v-if="type!=='textarea'"
          v-model="inputVal"
          :placeholder="placeholder"
          :type="inputType(type)"
          :readonly="readonly"
          :disabled="disabled"
          :style="`text-align: ${inputAlign}`"
          @input="input"
          @focus="onfocus = true"
          @focusout="focusout"
        >
        <label v-else>
          <div contenteditable="true">
            {{inputVal}}
          </div>
          <textarea
            ref="textarea"
            v-model="inputVal"
            :placeholder="placeholder"
            :type="inputType(type)"
            :readonly="readonly"
            :disabled="disabled"
            @input="input"
            @focus="onfocus = true"
            @focusout="focusout"
          />

        </label>
        <span v-if="type === 'textarea' && maxlength" style="position: absolute;bottom: -10px;right: 6px">
            {{ textareaLength }}/{{ maxlength }}
        </span>
      </div>
      <div v-if="clearable?onfocus:rightIcon"  :class="_.right_icon">
        <d-icon
          :name="clearable?'search_eliminate':rightIcon"
          :style="clearable?'cursor:pointer':''"
          @click="clearInput"
        />
      </div>
      <div :class="_.right_button">
        <slot name="button"></slot>
      </div>

      <br>
      <div v-show="errorMessage" :class="_.error_message">
        {{ errorMessage }}
      </div>
    </div>

  </div>
</template>

<script>
import {defineComponent} from '@/utils';

function compose(...funcs) {
    return function proxy(...args) {
      const len = funcs.length;
      if (len === 0) {
        return args;
      }
      if (len === 1) {
        return funcs[0](...args);
      }
      return funcs.reduce((x, y) => {
        return typeof x === "function" ? y(x(...args)) : y(x)
      });
    };
  }


  export default defineComponent({
    name: 'Field',
    props: {
      // eslint-disable-next-line vue/prop-name-casing
      value: {
        type: String,
        default: '',
        desc: '当前输入的值',
      },
      label: {
        type: String,
        default: '',
        desc: '输入框左侧文本',
      },
      name: {
        type: String,
        default: '',
        desc: '名称，提交表单的标识符',
      },
      type: {
        type: String,
        enum: ['text','tel','digit','number','textarea','password'],
        default: 'text',
        desc: '输入框类型,字符串格式',
      },
      placeholder:{
        type: String,
        default: '请输入文本',
        desc: '输入框占位提示文字',
      },
      readonly: {
        type: Boolean,
        default: false,
        desc: '是否只读',
      },
      disabled: {
        type: Boolean,
        default: false,
        desc: '是否禁用',
      },
      leftIcon: {
        type: String,
        default: '',
        desc: 'icon组件名字，详情查看icon组件',
      },
      rightIcon: {
        type: String,
        default: '',
        desc: 'icon组件名字，详情查看icon组件',
      },
      clearable: {
        type: Boolean,
        default: false,
        desc: '是否显示清除按钮',
      },
      required: {
        type: Boolean,
        default: false,
        desc: '是否为必填项',
      },
      error: {
        type: Boolean,
        default: false,
        desc: '是否为警告',
      },
      errorMessage: {
        type: String,
        default: '',
        desc: '错误消息',
      },
      formatter: {
        type: Function,
        default: null,
        desc: '自动轮播间隔，单位为 ms',
      },
      formatTrigger: {
        type: String,
        default: 'onChange',
        desc: '可以选择onBlur',
      },
      showWordLimit: {
        type: Boolean,
        default: false,
        desc: '是否显示字数限制',
      },
      maxlength: {
        type: Number,
        default: 0,
        desc: '设置最大输入长度',
      },
      inputAlign: {
        type: String,
        default: '',
        desc: '自动轮播间隔，单位为 ms',
      },
      // size: {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },

      // border: {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },


      // colon: {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },

      // center: {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },

      // 'clear-trigger': {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },
      // clickable: {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },
      // 'is-link': {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },
      // autofocus: {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },


      // 'error-message': {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },

      // 'arrow-direction': {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },
      // 'label-class': {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },
      // 'label-width': {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },
      // 'label-align': {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },

      // 'error-message-align': {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },
      // autosize: {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },

      // 'icon-prefix': {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },
      // placeholder: {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },
      // rules : {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },
      // autocomplete: {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },

    },
    data:()=>({
      inputVal:'',
      onfocus:false,
      textareaLength:0,
    }),
    computed:{

    },
    watch:{
      value(){
        this.inputVal = this.value
      },
      inputVal(val){
        this.$emit('input', val)
      },

    },
    mounted(){
      this.$nextTick(()=>{
        this.inputVal = this.value
      })
    },
    methods:{
      inputType(val){
        if (val === 'password'||val==='textarea') return val
        return ''
      },
      input(val){
        // 通过数据来记录高度
        // if (this.type === 'textarea') this.textareaHeightAuto(val)
        this.textareaLength = val.target.value.length

        console.log(val.target.value,this.value)
        if (this.formatTrigger === 'onChange'){
          if (this.formatter){
            const tempVal = compose(this.formatter,this.fitterVal)(val.target.value)
            this.inputVal =  this.maxlength?this.fitterLength(tempVal,this.maxlength-1):tempVal
          }
          else {
            const tempVal = this.fitterVal(val.target.value)
            this.inputVal =  this.maxlength?this.fitterLength(tempVal,this.maxlength-1):tempVal
          }
        }
        else {
          this.inputVal = val.target.value
        }
      },
      // textareaHeightAuto(val) {
      //   // if (val.target.value.length>this.textareaLength){
      //   //   this.textareaLength = val.target.value.length
      //   //   const textArea = this.$refs.textarea
      //   //   if (textArea.scrollHeight - this.textareaHeight>5){
      //   //     this.textareaHeightArr.push({length:val.target.value.length,height:this.textareaHeight})
      //   //     this.textareaHeight = textArea.scrollHeight
      //   //   }
      //   // }
      //   // else {
      //   //   this.textareaLength = val.target.value.length
      //   //   const tempDict = this.textareaHeightArr[this.textareaHeightArr.length-1]
      //   //   if (val.target.value.length<tempDict.length){
      //   //     if(this.textareaHeightArr.length>1){
      //   //       let lastStepHeight = this.textareaHeightArr.pop()
      //   //       lastStepHeight = lastStepHeight.height
      //   //       this.textareaHeight = lastStepHeight
      //   //     }
      //   //   }
      //   // }
      // },

      clearInput(){
        this.clearable?
          this.inputVal = ''
          :
          {}
      },
      focusout(val){
        if (this.formatTrigger === 'onBlur'){
          if (this.formatter){
            const tempVal = compose(this.formatter,this.fitterVal)(val.target.value)
            this.inputVal =  this.maxlength?this.fitterLength(tempVal,this.maxlength-1):tempVal
          }
          else {
            const tempVal = this.fitterVal(val.target.value)
            this.inputVal =  this.maxlength?this.fitterLength(tempVal,this.maxlength-1):tempVal
          }
        }
        else {
          this.inputVal = val.target.value
        }
        setTimeout(()=>{
          this.onfocus = false
        },200)
      },
      fitterNumberOnly(val){
        return val.replace(/[^\d]/g,'')
      },
      fitterTelLength(val){
        return this.fitterLength(val,11)
      },
      fitterLength(val,limit){
        if (val.length > limit) return val.slice(0,limit)
        return val
      },
      fitterNumberWithDecimalPoint(val){
        //清除“数字”和“.”以外的字符
        val = val.replace(/[^\d.]/g,"");
        //验证第一个字符是数字而不是.
        val = val.replace(/^\./g,"");
        //只保留第一个. 清除多余的.
        val = val.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的.
        val = val.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        return val
      },
      fitterVal(val){
        switch (this.type) {
          case 'text':
            return val
          case 'tel':
            return compose(this.fitterNumberOnly,this.fitterTelLength)(val)
          case 'digit':
            return this.fitterNumberWithDecimalPoint(val)
          case 'number':
            return this.fitterNumberOnly(val)
          case 'password':
            return val
          default:
            return val
        }
      }
    }
  });
</script>

<style lang="scss" module>
  .field {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    line-height: 54px;
    background: #fff;
    border-bottom: 1px solid #E9E9E9;
    .left_label{
      display: inline-block;
      //max-width: 84px;
      min-width: 84px;
      padding-right: 12px;
      text-align: left;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      color: #333333;
    }
    .right_input{
      display: inline-block;
      padding-right: 12px;

      flex: 1;
      max-width: 65%;
      >input{
        width: 100%;
        outline:0;
        border: none;
        background: transparent;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        &::-webkit-input-placeholder{
          color: #ccc;
        }
        &::-moz-placeholder{
          color: #ccc;
        }
        &:-moz-placeholder{
          color: #ccc;
        }
        &:-ms-input-placeholder{
          color: #ccc;
        }
      }
      >label{
        padding-top: 20px;
        width: 100%;
        >div{
          width: 100%;
          margin-top: 20px;
          margin-bottom: 25px;
          position: relative;
          background-color: red;
          z-index: -1;
          opacity: 0;
          font-family: PingFangSC-Regular;
          line-height: 21px;
          min-height: 21px;
        }
        textarea{
          margin-top: 15px;
          width: 95%;
          height: auto;
          line-height: 22px;
          outline:0;
          border: none;
          background: transparent;
          font-size: 16px;
          resize: none;
          font-family: PingFangSC-Regular;

          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          &::-webkit-input-placeholder{
            color: #ccc;
          }
          &::-moz-placeholder{
            color: #ccc;
          }
          &:-moz-placeholder{
            color: #ccc;
          }
          &:-ms-input-placeholder{
            color: #ccc;
          }
          &::-webkit-scrollbar{display: none;}
        }

      }
    }
    .field_disabled{
      color: #ccc !important;
      >input{
        color: #ccc !important;
      }
    }
    .field_required{
      &:before{
        clear: both;
        display: inline-block;
        content: '*';
        line-height: 21px;
        height: 21px;
        color: #FF4A55;
      }
    }
    .field_error{
      color: red ;
      >input{
        color: red ;
        &::-webkit-input-placeholder{
          color: #EE0D24;
        }
        &::-moz-placeholder{
          color: #EE0D24;
        }
        &:-moz-placeholder{
          color: #EE0D24;
        }
        &:-ms-input-placeholder{
          color: #EE0D24;
        }
      }
    }
    .field_error_message{
      min-width: 49%;
    }
    .error_message{
      color: #EE0D24;
      line-height: 0;
      padding-bottom: 20px;
      margin-left: 98px;
    }
    .right_button{
      padding-right: 12px;
    }
    .left_icon{
      font-size: 22px;
      padding-right: 8px;
    }
    .right_icon{
      font-size: 22px;
      padding-right: 12px;
    }
  }
</style>
