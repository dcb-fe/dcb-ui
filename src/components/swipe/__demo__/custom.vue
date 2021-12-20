<template>
  <div>
    <d-swipe @click="handleClick" @change="handleChange" loop>
      <d-swipe-item >
        <div class="item-contain">
          <p class="span-item">Slild 1</p>
        </div>
      </d-swipe-item>
      <d-swipe-item >
        <div class="item-contain-dark">
          <p class="span-item">Slild 2</p>
        </div>
      </d-swipe-item>
      <d-swipe-item >
        <div class="item-contain">
          <p class="span-item">Slild 3</p>
        </div>
      </d-swipe-item>
      <d-swipe-item >
        <div class="item-contain-dark">
          <p class="span-item">Slild 4</p>
        </div>
      </d-swipe-item>
      <div slot="indicator" class="custom">{{ indicator }}</div>
    </d-swipe>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        indicator:''
      }
    },
    methods: {
      handleClick() {
        alert('hello');
      },
      handleChange(val,allTotal){
        this.indicator = `${val}/${allTotal}`
      }
    }
  };
</script>

<style>
.span-item{
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 184px;
  color: white;
  margin: 0;
  padding: 0;
}
.item-contain{
  width: 100%;
  height: 100%;
  background-color: #00bc9d;
}
.item-contain-dark{
  width: 100%;
  height: 100%;
  background-color: green;
}
.custom{
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 30px;
  height: 16px;
  font-size: 12px;
  border-radius: 8.5px;
  background-color: #000;
  opacity: 0.3;
  text-align: center;
  line-height: 16px;
  color: white;
}
</style>
