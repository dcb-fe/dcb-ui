<template>
  <d-nav-bar-page
    class="page-home"
    title="标题"
    close
    service
    @back="handleClick('back')"
    @close="handleClick('close')"
    @service="handleClick('service')"
  >
    <div
      class="page-home-content"
    >
      <div style="height: 20px; margin-bottom: 20px; background: #00bc9d"
           v-for="item in 30"></div>
    </div>
  </d-nav-bar-page>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleClick(v) {
      alert(v);
    },
  },
};
</script>
<style lang="scss">
.page-home-content {
  background: rosybrown;
}
.x-demo-container{
  .d-nav_bar-nav_bar_fixed{
    width: 351px;
  }
}
</style>
