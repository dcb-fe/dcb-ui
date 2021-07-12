<template>
  <div>
    <button @click="handleClick('primary')">打开主要通知</button>
    <button @click="handleClick('success')">打开成功通知</button>
    <button @click="handleClick('danger')">打开危险通知</button>
    <button @click="handleClick('warning')">打开警告通知</button>

    <d-notify
      v-model="visible"
      :type="type"
      render-in-place
      :message="`${type} 类型的通知`"
    />
  </div>
</template>

<script>
  export default {
    data: () => ({ visible: false, type: 'primary' }),

    methods: {
      handleClick(type) {
        this.type = type;
        this.visible = !this.visible;
      },
    },
  };
</script>
