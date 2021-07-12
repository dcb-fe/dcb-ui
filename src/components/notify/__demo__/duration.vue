<template>
  <div>
    <button @click="handleClick(3000)">打开通知（展示3000毫秒）</button>
    <button @click="handleClick(0)">打开通知（一直展示）</button>

    <d-notify
      v-model="visible"
      :duration="duration"
      render-in-place
      :message="`展示时长 ${duration || '无限'} 毫秒的通知`"
    />
  </div>
</template>

<script>
  export default {
    data: () => ({
      visible: false,
      duration: 3000,
    }),

    methods: {
      handleClick(duration) {
        this.duration = duration;
        this.visible = !this.visible;
      },
    },
  };
</script>
