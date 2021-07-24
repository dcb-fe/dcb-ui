<template>
  <div>
    <d-cell title="我是标题" desc="描述文字" left-icon="clock" right-icon="setting" @click="handleClick"/>
    <d-cell title="我是标题" desc="描述文字" right-icon="setting" @click="handleClick">
      <input slot="desc" type="text" placeholder="请输入名字">
    </d-cell>
    <d-cell title="是否设置为默认地址" desc="描述文字" @click="handleClick">
      <d-switch slot="desc" />
    </d-cell>
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

<style scoped>
  input {
    outline: none;
    padding: 0;
    width: 100%;
    height: 22px;
    border: none;
    font-size: 15px;
    line-height: 1;
  }
</style>
