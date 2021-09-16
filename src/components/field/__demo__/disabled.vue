<template>
  <div class="form-container">
    <d-field :label="label" v-model="value" readonly />
    <d-field :label="label1" v-model="value1" disabled />
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
