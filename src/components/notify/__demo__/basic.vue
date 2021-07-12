<template>
  <div class="basic-notify-group">
    <span>基础用法</span>
    <div class="notify-item">
      <span @click="notifyShow">基础默认通知</span>
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
    name:'Demo1',
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
      notifyShow(){
        console.log('this.options.visible',this.options.visible)
        this.options.visible = true
        clearTimeout(this.idOfTimeOut)
        this.idOfTimeOut = setTimeout(()=>{this.options.visible = false},3000)
      },

    },
  };
</script>

<style lang="scss" scoped>
.basic-notify-group {
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
.notify-item{
  //padding-left: 30px;
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
