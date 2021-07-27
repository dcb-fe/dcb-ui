<template>
  <div>
    <d-cell label="我是标题" desc="描述文字" left-icon="clock" right-icon="arrow_right" @click="handleClick"/>
    <d-cell label="我是标题" desc="描述文字" right-icon="arrow_right" @click="handleClick">
      <input slot="desc" type="text" placeholder="请输入名字">
    </d-cell>
    <d-cell label="是否设置为默认地址" desc="描述文字" @click="handleClick">
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
