<template>
  <div class="form-container">
    <d-field v-model="value" :label="label"> ... </d-field>
    <d-button style="margin-top: 20px" @click="handleClick">获取当前Value值</d-button>

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
