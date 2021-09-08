<template>
  <d-goods-action class="custom-fixed">
    <d-goods-action-icon
      icon="location"
      color="#FF5F33"
      text="位置"
      @click="onClickIcon"
    />
    <d-goods-action-icon icon="star" text="收藏" @click="onClickIcon" />
    <d-goods-action-icon icon="user_circle" text="客服" @click="onClickIcon" />
    <d-goods-action-button text="加入购物车" @click="onClickButton" />
    <d-goods-action-button
      text="立即购买"
      color="linear-gradient(90deg, #FF5F33 0%, #EF1325 100%)"
      @click="onClickButton"
    />
  </d-goods-action>
</template>

<script>
  import DGoodsActionButton from '@/components/goods_action_button/goods_action_button';
  import DGoodsActionIcon from '@/components/goods_action_icon/goods_action_icon';
  export default {
    name: 'GoodsAction',
    components: {
      DGoodsActionIcon,
      DGoodsActionButton,
    },
    methods: {
      onClickIcon() {
        alert('点击图标');
      },
      onClickButton() {
        alert('点击按钮');
      },
    },
  };
</script>

<style lang="scss">
  .custom-fixed {
    position: relative;
    padding-bottom: 0;
  }
</style>
