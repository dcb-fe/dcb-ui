<template>
  <div>
    <d-image
      src="https://dcb-resource.gogpay.cn/duoduo-warehouse/png/8656bf02dc494689848e35e55ef2032f2.png"
      :height="200"
    >
      <template v-slot:error></template>
    </d-image>
    <p style="text-align: center; margin: 0">默认</p>
    <d-image
      src="https://dcb-resource.gogpay.cn/duoduo-warehouse/png/8656bf02dc494689848e35e55ef2032f2.png"
      :height="200"
    >
      <template v-slot:error>加载失败</template>
    </d-image>
    <p style="text-align: center; margin: 0">自定义提示</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    methods: {},
  };
</script>
