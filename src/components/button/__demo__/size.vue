<template>
  <div class="button-group">
    <d-button size="small" @click="handleClick">我是小号主要按钮</d-button>
    <d-button @click="handleClick">我是中号主要按钮</d-button>
    <d-button size="large" @click="handleClick">我是大号主要按钮</d-button>
    <d-button secondary size="small" @click="handleClick">
      我是小号次要按钮
    </d-button>
    <d-button secondary @click="handleClick">我是中号次要按钮</d-button>
    <d-button secondary size="large" @click="handleClick">
      我是大号次要按钮
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
