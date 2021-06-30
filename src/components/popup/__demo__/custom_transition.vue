<template>
  <div>
    <button @click="handleButtonClick">打开弹窗</button>

    <d-popup
      :visible="visible"
      transition-name="fade-down"
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
