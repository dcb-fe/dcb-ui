<template>
  <div>
    <d-swipe @click="handleClick" @change="handleChange" :indicatorPosition="'left'" vertical loop >
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
<!--      <div slot="indicator" style="position: absolute;top: 50%;left: 50%">12312</div>-->
    </d-swipe>
  </div>
</template>

<script>
  export default {
    methods: {
      handleClick() {
        alert('hello');
      },
      handleChange(val,allTotal){
        console.log('val',val,allTotal)
      }
    },
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
</style>
