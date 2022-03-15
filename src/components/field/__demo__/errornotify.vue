<template>
  <div class="form-container">
    <d-field v-model="value" :label="label" required error/>
    <d-field v-model="value1" :label="label1" required error-message="请输入12"/>
  </div>
</template>

<script>
  export default {
    data:()=>({
      label:'文本',
      value:'',
      label1:'文本',
      value1:'',

    }),
    methods: {
      handleClick() {
        console.log('当前Value值为:', this.value)
        alert(`当前Value值为:${this.value}`)
        return true
      },
    },
  };
</script>
