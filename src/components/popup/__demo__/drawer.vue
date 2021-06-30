<template>
  <div>
    <p>
      <button @click="handleButtonClick('left')">打开左侧抽屉</button>
      <button @click="handleButtonClick('right')">打开右侧抽屉</button>
    </p>

    <p>
      <button @click="handleButtonClick('top')">打开顶部抽屉</button>
      <button @click="handleButtonClick('bottom')">打开底部抽屉</button>
    </p>

    <d-popup
      :position="position"
      :visible="visible"
      render-in-place
      @maskClick="handleMaskClick"
    >
      <div :class="['drawer', position]">HELLO</div>
    </d-popup>
  </div>
</template>

<script>
  export default {
    data: () => ({
      visible: false,
      position: 'left',
    }),

    methods: {
      handleButtonClick(position) {
        this.position = position;
        this.visible = !this.visible;
      },
      handleMaskClick() {
        this.visible = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
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
