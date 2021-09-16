<template>
  <div class="form-container">
    <d-field :label="label" v-model="value" required error/>
    <d-field :label="label1" v-model="value1" required errorMessage="请输入12"/>
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
