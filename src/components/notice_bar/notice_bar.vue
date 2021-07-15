<template>
  <div v-if="show" :class="_.notice_bar" :style="noticeColor" @click="onClick()">
    <icon v-if="leftIcon" :name="leftIcon" :class="_.icon"/>
    <!-- <img v-if="leftIcon" :src="leftIcon" :class="_.icon" alt="左侧图片"> -->
    <slot name="left-icon"></slot>
    <div :class="_.notice_text">
      <div :class="[!wrapable&&_.wrapable,scrollable&&vertical?_.scrollY:_.scrollX]">
        <slot>
        {{ text }}
        </slot>
      </div>
    </div>
    <icon v-if="mode" :name="mode&&mode=='link'?'return':'close'" @click="onClickRight()" :class="_.right_icon"/>
    <slot name="right-icon"></slot>
  </div>
</template>

<script>
  import { defineComponent } from '@/utils';
  import Icon from '../icon/icon.vue';

  export default defineComponent({
    name: 'NoticeBar',
    components:{
      Icon
    },
    props:{
      leftIcon:{
        type:String,
        default:'',
        desc:'左侧图标'
      },
      text:{
        type:String,
        default:'',
        desc:"通知栏文字"
      },
      mode:{
        type:String,
        enum: ['closeable', 'link'],
        default:'',
        desc:'通知栏模式'
      },
      wrapable:{
        type:Boolean,
        enum: [true, false],
        default:false,
        desc:'是否开启文本换行'
      },
      color:{
        type:String,
        default:'#ED6A0B',
        desc:'通知栏文本颜色'
      },
      background:{
        type:String,
        default:'#FFFBE8',
        desc:'通知栏背景颜色'
      },
      scrollable:{
        type:Boolean,
        enum: [true, false],
        default:true,
        desc:'是否滚动'
      },
      vertical:{
        type:Boolean,
        enum: [true, false],
        default:false,
        desc:'是否垂直滚动'
      }
    },
    slots: {
      default: {
        desc: '通知栏文案，如果和属性 text 同时出现，此项优先级更高',
      },
      leftIcon:{
        desc:'左侧图标'
      },
      rightIcon:{
        desc:'右侧图标'
      }
    },

    emits: {
      click: {
        desc: '通知栏点击事件',
      },
      close:{
        desc: '右侧关闭按钮,点击关闭通知栏',
      }
    },
    computed:{
      noticeColor(){
        return {
          color:this.color,
          backgroundColor:this.background
        }
      }
    },
    data(){
      return {
        show:true
      }
    },
    methods:{
      //通知栏点击事件
      onClick(){
        this.$emit('click')
      },
      //右侧关闭按钮点击事件
      onClickRight(){
        if(this.mode=="closeable"){
          this.show=false
          this.$emit('close')
        }
      }
    }
  });
</script>

<style lang="scss" module>
  .notice_bar {
    height: 40px;
    padding:0px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    // color: #ED6A0B;
    line-height: 20px;
    // background-color: #FFFBE8;
    .icon{
      font-size:16px;
      padding-right:12px;
      cursor: pointer;
    }
    .notice_text{
      width: 100%;
      height:100%;
      padding-right: 12px;
      display: flex;
      align-items: center;
      overflow:hidden;
      .wrapable{
        width: 100%;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        &.scrollX{
          animation: moveLeft 12s linear infinite
        }
        &.scrollY{
          animation: moveTop 4s ease-out infinite
        }
      }
    }
    .right_icon{
      font-size:16px;
      cursor: pointer;
    }
  }
</style>
<style lang="scss">
@keyframes d-notice_bar-moveLeft {
    from {
      transform: translateX(100%);
    }

    to {
      transform: translateX(-100%);
    }
  }
  @keyframes d-notice_bar-moveTop {
    from {
      transform: translateY(100%);
    }

    to {
      transform: translateY(-100%);
    }
  }
</style>
