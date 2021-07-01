<template>
  <div class="basic-notify-group">
    <span>基础用法</span>
    <div class="notify-item">
      <span @click="notifyShow">基础默认通知</span>
    </div>
    <span>类型用法</span>
    <div class="notify-item">
      <span @click="notifyShowMain">主要通知</span>
    </div>
    <div class="notify-item">
      <span @click="notifyShowSuccess">成功通知</span>
    </div>
    <div class="notify-item">
      <span @click="notifyShowError">危险通知</span>
    </div>
    <div class="notify-item">
      <span @click="notifyShowWarning">警告通知</span>
    </div>
    <d-notify ref="notify" />
  </div>

</template>

<script>
  export default {
    name:'Demo',
    data(){
      return{
        visible:true,
        content:'123'
      }
    },
    methods: {
      notifyShow(){
        this.$refs.notify.initNotify({message:'默认通知'})
      },
      notifyShowMain(){
        this.$refs.notify.initNotify({message:'主要通知',type:'primary'})
      },
      notifyShowSuccess(){
        this.$refs.notify.initNotify({message:'成功通知',type:'success'})

      },
      notifyShowError(){
        this.$refs.notify.initNotify({message:'危险通知',type:'error'})
      },
      notifyShowWarning(){
        this.$refs.notify.initNotify({message:'警告通知',type:'warning'})
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
