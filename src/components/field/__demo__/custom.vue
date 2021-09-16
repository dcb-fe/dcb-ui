<template>
  <div class="form-container">
    <d-field
      v-model="value1"
      :label="label1"
      type="text"
      placeholder="请输入文本"
    />
    <d-field
      v-model="value2"
      :label="label2"
      type="tel"
      placeholder="请输入手机号"
    />
    <d-field
      v-model="value3"
      :label="label3"
      type="number"
      placeholder="请输入整数"
    />
    <d-field
      v-model="value4"
      :label="label4"
      placeholder="请输入数字（支持小数点）"
      type="digit"
    />
    <d-field
      v-model="value5"
      :label="label5"
      placeholder="请输入密码"
      type="password"
    />
  </div>
</template>

<script>
  export default {
    data:()=>({
      label1:'文本',
      value1:'',
      label2:'手机号',
      value2:'',
      label3:'整数',
      value3:'',
      label4:'数字',
      value4:'',
      label5:'密码',
      value5:'',

    }),
    methods: {
      handleClick() {
        console.log('label',this.value)
      },
    },
  };
</script>
