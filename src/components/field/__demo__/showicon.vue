<template>
  <div class="form-container">
    <d-field
      v-model="value"
      :label="label"
      left-icon="user_circle"
      right-icon="service"
    />
    <d-field
      v-model="value1"
      :label="label1"
      left-icon="user_circle"
      clearable
    />
  </div>
</template>

<script>
  export default {
    data:()=>({
      label:'文本',
      value:'',
      label1:'文本',
      value1:'123',

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
