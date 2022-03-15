<template>
  <div class="form-container">
    <d-field v-model="value" :label="label" readonly />
    <d-field v-model="value1" :label="label1" disabled />
  </div>
</template>

<script>
  export default {
    data:()=>({
      label:'文本',
      value:'输入框只读',
      label1:'文本',
      value1:'输入框已禁用',
    }),
    methods: {
      handleClick() {
        alert('当前Value值为:',this.value)
      },
    },
  };
</script>
