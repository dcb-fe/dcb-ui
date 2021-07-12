<template>
  <div class="basic_notify_group">
    <span>自定义图标用法</span>
    <div class="notify_item">
      <span @click="notify_show_icon_1">自定义图标1</span>
    </div>
    <div class="notify_item">
      <span @click="notify_show_icon_2">自定义图标2</span>
    </div>
    <d-notify ref="notify"
              :notify-visible="options.visible"
              :type="options.type"
              :message="options.message"
              :icon="options.icon"
              :color="options.color"
              :background="options.background"
    />
  </div>
</template>

<script>
export default {
  name:'Demo3',
  data(){
    return{
      content:'123',
      options:{
        visible:false,
        type: 'primary',
        message:'通知内容',
        icon:null,
        color:'white',
        background:null,
      },
      idOfTimeOut:''
    }
  },
  methods: {
    notify_show_icon_1(){
      this.options.visible = true
      this.options.type = 'primary'
      this.options.background = '#666'
      this.options.icon = 'notice'
      this.options.message= '自定义图标1'
      clearTimeout(this.idOfTimeOut)
      this.idOfTimeOut = setTimeout(()=>{this.options.visible = false},3000)
    },
    notify_show_icon_2(){
      this.options.visible = true
      this.options.background = null
      this.options.type = 'success'
      this.options.icon = 'add'
      this.options.message= '自定义图标2'
      clearTimeout(this.idOfTimeOut)
      this.idOfTimeOut = setTimeout(()=>{this.options.visible = false},3000)
    },
  },
};
</script>

<style lang="scss" scoped>
.basic_notify_group {
  > *:not(:first-child) {
    margin-top: 12px;
  }
  >div{
    width: 100%;
    height:30px;
    background: white;
    border-radius: 8px;
    box-shadow: 1px 1px 0.5px #EEE;
    cursor: pointer;
  }
}
.notify_item{
  //padding_left: 30px;
  line-height: 30px;
  border-radius: 4px;
  text-align: center;
  margin-top: 10px;
  &:first-child{
    margin-top: 20px;
  }
}
.gradient {
  background: linear-gradient(90deg, #fead2c 0%, #fe7404 100%);
}
</style>
