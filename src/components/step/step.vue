<template>
  <div :class="[_.step,_.vertical]">
    <span :class="_.title">
      <d-icon name="" />
      <div></div>
    </span>
    <span :class="_.span">
      <slot/>
    </span>
  </div>
</template>

<script>
  import { defineComponent } from '@/utils';

  export default defineComponent({
    name: 'Step',
  });
</script>

<style lang="scss" module>

  .step {
      flex: 1;
      position: relative;
      padding-top: 16px;
      .title{
        position: absolute;
        top: 0;
        margin-left: calc(50% - 6px);
        width: 100%;
        height: 16px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        //left: calc(50% + 6px);
        >div{
          display: inline-block;
          flex: 1;
          height: 2px;
          border-radius: 8px;
          background-color: #E9E9E9;
          margin-right: 6px;

        }
        >i{
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 8px;
          background-color: #E9E9E9;
          margin-right: 6px;
        }
      }
      .span{
        display: inline-block;
        width: 100%;
        text-align: center;
      }
    .cleanFix{
      clear: both;
    }
  }
  .vertical{
    width: 100%;
    padding-top: 6px;
    .title{
      margin-left: 0;
      width: 10%;
      height: 67px;
      flex-direction:column;
      top: 12px;
      >div{
        width: 2px;
        height: 60px;
      }
      >i{
        margin-bottom: 6px;
      }
    }
    .span{
      height: 67px;
      width: auto;
      text-align: left;
      margin-left: 10%;
    }
  }
  .vertical:first-child{
    padding-top: 0;
    .title{
      top: 6px;
    }
  }
</style>
