<template>
  <div>
    <button @click="handleButtonClick">打开弹窗</button>
    <button @click="handleButton2Click">无遮罩，打开弹窗后你可以点我</button>

    <d-popup
      :visible="visible"
      no-mask
      transition-name="fade-left"
      render-in-place
      @maskClick="handleMaskClick"
    >
      <div class="dialog">HELLO</div>
    </d-popup>
  </div>
</template>

<script>
  export default {
    data: () => ({
      visible: false,
    }),

    methods: {
      handleButtonClick() {
        this.visible = !this.visible;
      },
      handleButton2Click() {
        alert('hi');
      },
      handleMaskClick() {
        this.visible = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .dialog {
    width: 60%;
    background-color: white;
    padding: 20px;
    text-align: center;
  }
</style>
