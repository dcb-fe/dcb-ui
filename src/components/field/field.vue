<template>
  <div :class="_.field">
    <div>
      <span>{{label}}</span>
    </div>
    <div>
      <input v-model="inputVal" :placeholder="placeholder">
    </div>
  </div>
</template>

<script>
  import { defineComponent } from '@/utils';


  export default defineComponent({
    name: 'Field',
    props: {
      // eslint-disable-next-line vue/prop-name-casing
      'v-model (value)': {
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
      // size: {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },
      // maxlength: {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },
      // border: {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },
      // disabled: {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },
      // readonly: {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },
      // colon: {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },
      // required: {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },
      // center: {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },
      // clearable: {
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
      // 'show-word-limit': {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },
      // error: {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },
      // 'error-message': {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },
      // formatter: {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },
      // 'format-trigger': {
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
      // 'input-align': {
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
      // 'left-icon': {
      //   type: String,
      //   default: '',
      //   desc: '自动轮播间隔，单位为 ms',
      // },
      // 'right-icon': {
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
      inputVal:''
    }),
    watch:{
      inputVal(val){
        this.fitterVal(val).then((rightVal)=>{
          this.inputVal = rightVal
          this.$emit('input', rightVal)
        })
      }
    },
    methods:{
      click(){
        console.log(this.inputVal)
      },
      fitterNumberOnly(val){
        return val.replace(/[^\d]/g,'')
      },
      fitterTelLength(val){
        if (val.length > 11) return val.slice(1,11)
        return val
      },
      async fitterVal(val){
        switch (this.type) {
          case 'text':
            return val
          case 'tel':
            return val
          case 'digit':
            return val
          case 'number':
            return val
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
    height: 54px;
    display: flex;
    line-height: 54px;
    background: #fff;
    border-bottom: 1px solid #E9E9E9;

    >div:first-child{
      display: inline-block;
      width: auto;
      padding: 0 12px;
      text-align: center;
      font-size: 16px;
      font-family: PingFangSC-Regular;
    }
    >div:nth-child(2){
      display: inline-block;
      padding-right: 12px;
      flex: 1;
      >input{
        width: 100%;
        outline:0;
        border: none;
        background: transparent;
        font-size: 16px;
        font-family: PingFangSC-Regular;
      }
    }
    //span{
    //  width: 20%;
    //  background-color: green;
    //  display: inline-block;
    //}
    //input{
    //  display: block;
    //  box-sizing: border-box;
    //  width: 100%;
    //  min-width: 0;
    //  margin: 0;
    //  padding: 0;
    //  color: #323233;
    //  line-height: inherit;
    //  text-align: left;
    //  background-color: transparent;
    //  border: 0;
    //  resize: none;
    //}

  }
</style>
