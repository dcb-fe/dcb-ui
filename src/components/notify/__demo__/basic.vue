<template>
  <div>
    <button @click="handleClick">打开通知</button>

    <d-notify
      v-model="visible"
      render-in-place
      message="默认展示危险通知 1500 毫秒"
    />
  </div>
</template>

<script>
  export default {
    data: () => ({ visible: false }),

    methods: {
      handleClick() {
        this.visible = !this.visible;
      },
    },
  };
</script>
