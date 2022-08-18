<template>
  <div class="form-container">
    <d-field
      v-model="value"
      type="textarea"
      :label="label"
      show-word-limit
      :maxlength="50"
    > ... </d-field>

  </div>
</template>

<script>
  export default {
    data:()=>({
      label:'测试输入框',
      value:'',

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
