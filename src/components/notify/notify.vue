<template>
  <p @click="handleClick">
    <d-popup
      :position="position"
      :visible="notifyVisible"
      :class="[_.notify]"
      no-mask
      :mask-transparent="true"
      render-in-place
      @maskClick="handleMaskClick"
    >
          <span  v-if="notifyVisible"
                :class="[
                  _.sp,
                  _[type],
                ]"
                :style="{color:color,backgroundColor:background}"
            >

            <d-icon v-if="icon" :name="icon" />
            {{ message }}
          </span>
    </d-popup>
  </p>
</template>

<script>
  import Icon from '@/components/icon/icon';
  import Popup from '@/components/popup/popup';

  import { defineComponent } from '@/utils';

  export default defineComponent({
    name: 'Notify',
    // eslint-disable-next-line vue/no-unused-components
    components:{Popup,Icon},
    props: {
      notifyVisible:{
        type:Boolean,
        default:false,
        desc:'是否显示'
      },
      type: {
        type: String,
        enum: ['primary','success', 'error', 'warning'],
        default: 'normal',
        desc: '通知状态',
      },
      message:{
        type:String,
        default: '通知内容',
        desc: '通知内容',
      },
      icon:{
        type:String,
        default: null,
        desc: 'icon图标name名称(详情查看icon组件)',
      },
      color:{
        type:String,
        default:'white',
        desc:'字体颜色'
      },
      background:{
        type:String,
        default:null,
        desc:'背景颜色'
      },
      className:{
        type:String,
        default:null,
        desc:'自定义类名'
      },
    },
    slots: {
      default: {
        desc: '按钮内容',
      },
    },
    emits: {
      onClick:{
        type:String,
        default:null,
        desc:'点击时的回调函数'
      },

    },
    data(){
      return{
        position: 'top',
        setTimeoutOfId:'',
        options:{
          type: {
            type: String,
            enum: ['primary','success', 'error', 'warning'],
            default: 'primary',
            desc: '通知状态',
          },
          message:{
            type:String,
            default: '通知内容',
            desc: '通知内容',
          },
          icon:{
            type:String,
            default: null,
            desc: 'icon的Class名称',
          },
          color:{
            type:String,
            default:'white',
            desc:'字体颜色'
          },
          background:{
            type:String,
            default:null,
            desc:'背景颜色'
          },
        }
      }
    },
    created() {
      this.timer = setTimeout(() => {
        this.timeFlag = true;
      }, this.time);
    },
    mounted(){
      console.log('123')
    },
    methods:{
      handleButtonClick(position) {
        this.position = position;
        this.visible = !this.visible;
      },
      handleMaskClick() {
        this.visible = false;
      },
      handleClick(){
        this.$emit('onClick')
      },
    },
    });
</script>

<style lang="scss" module>
  .notify {
    .sp{
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      z-index: 50;
    }
    .error{
      background-color: red ;
    }
    .success{
      background-color: green ;
    }
    .primary{
      background-color: blue ;
    }
    .warning{
      background-color: orange ;
    }
  }
  .drawer {
    width: 60%;
    height: 100%;
    background-color: #f7f8fa;
    padding: 20px;
    box-sizing: border-box;

    &.top,
    &.bottom {
      width: 100%;
      height: 40%;
    }
  }
</style>
