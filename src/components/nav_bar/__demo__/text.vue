<template>
  <d-nav-bar title="标题" :safe-top="false" @back="handleClick('back')">
    <template #action>
      <span @click="handleClick('按钮')">按钮</span>
    </template>
  </d-nav-bar>
</template>

<script>
export default {
  methods: {
    handleClick(text) {
      alert(text);
    },
  },
};
</script>
