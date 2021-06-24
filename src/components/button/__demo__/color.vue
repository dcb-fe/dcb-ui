<template>
  <div class="button-group">
    <d-button style="background: #00bc9d" @click="handleClick">
      我是绿色按钮
    </d-button>
    <d-button class="gradient" @click="handleClick">我是渐变按钮</d-button>
    <d-button style="background: #00bc9d" disabled @click="handleClick">
      我是被禁用的绿色按钮
    </d-button>
    <d-button class="gradient" disabled @click="handleClick">
      我是被禁用的渐变按钮
    </d-button>
  </div>
</template>

<script>
  export default {
    methods: {
      handleClick() {
        alert('hello');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .button-group {
    > *:not(:first-child) {
      margin-top: 12px;
    }
  }

  .gradient {
    background: linear-gradient(90deg, #fead2c 0%, #fe7404 100%);
  }
</style>
