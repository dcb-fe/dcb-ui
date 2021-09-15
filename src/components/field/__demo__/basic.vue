<template>
  <div class="form-container">
    <d-field :label="label" v-model="value"> ... </d-field>
    <button @click="handleClick">www</button>
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
        console.log('label',this.value)
      },
    },
  };
</script>
