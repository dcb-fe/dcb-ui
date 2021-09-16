<template>
  <div class="form-container">
    <d-field :label="label" v-model="value">
      <div slot="button"></div>
    </d-field>

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
