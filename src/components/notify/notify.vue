<template>
<!--  <p v-show="notifyVisible" :class="[_.notify,]">-->
<!--    <span  v-if="notifyVisible"-->
<!--          :class="[-->
<!--            _.sp,-->
<!--            _[options.type.default],-->
<!--          ]"-->
<!--          :style="{color:options.color.default,background:options.background.default}"-->
<!--      >-->
<!--      <i v-if="options.icon.default" :class="options.icon.default" />-->
<!--      {{ options.message.default }}-->
<!--    </span>-->
<!--  </p>-->
  <div>
    <d-popup
      :position="position"
      :visible="notifyVisible"
      :class="[_.notify]"
      :maskTransparent="true"
      render-in-place
      @maskClick="handleMaskClick"
    >
          <span  v-if="notifyVisible"
                :class="[
                  _.sp,
                  _[options.type.default],
                ]"
                :style="{color:options.color.default,background:options.background.default}"
            >
            <i v-if="options.icon.default" :class="options.icon.default" />
            {{ options.message.default }}
          </span>
    </d-popup>
  </div>
</template>

<script>
  import Popup from '@/components/popup/popup'
  import { defineComponent } from '@/utils';

  export default defineComponent({
    name: 'Notify',
    components:{Popup},
    props: {
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
        desc: 'icon图标Class名称',
      },
      duration:{
        type:Number,
        default:3000,
        desc:'展示时长(ms)，值为 0 时，notify 不会消失'
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
      onOpened:{
        type:String,
        default:null,
        desc:'完全展示后的回调函数'
      },
      onClose:{
        type:String,
        default:null,
        desc:'关闭时的回调函数'
      }
    },
    data(){
      return{
        visible: false,
        position: 'top',
        notifyVisible:false,
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
          duration:{
            type:Number && String,
            default:3000,
            desc:'展示时长(ms)，值为 0 时，notify 不会消失'
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
    methods:{
      handleButtonClick(position) {
        this.position = position;
        this.visible = !this.visible;
      },
      handleMaskClick() {
        this.visible = false;
      },
      initNotify(options){
        this.notifyVisible = false
        if (options){
          Object.keys(options).forEach((key)=>{
            this.options[key].default = options[key]
          })
        }
        if (!options.type){
          console.log('123213123')
          this.options.type.default = 'primary'
        }
        this.notifyVisible = true
        clearTimeout(this.setTimeoutOfId)
        this.setTimeoutOfId = setTimeout(()=>{this.notifyVisible = false},this.options.duration.default)

      },
      handleClick(){
        this.$emit('click')
      }
    },
    notify(){
      console.log(22233)
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
      background-color: red !important;
    }
    .success{
      background-color: green !important;
    }
    .primary{
      background-color: blue !important;
    }
    .warning{
      background-color: orange !important;
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
