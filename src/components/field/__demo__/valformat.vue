<template>
  <div class="form-container">
    <d-field
      v-model="value"
      :label="label"
      :formatter="formatter"

    />
    <d-field
      v-model="value1"
      :label="label1"
      :formatter="formatter"
      format-trigger="onBlur"
    > ... </d-field>

  </div>
</template>

<script>
  export default {
    data:()=>({
      label:'输入时校验',
      value:'',
      label1:'失焦时校验',
      value1:'',

    }),
    methods: {
      formatter(value) {
        // 过滤输入的数字
        console.log('value',value)
        return value.replace(/\d/g, '');
      },
    },
  };
</script>
