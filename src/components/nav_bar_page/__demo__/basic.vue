<template>
  <d-nav-bar-page
    class="page-home"
    title="标题"
    @scrollExceed="scrollExceed"
    navBarColor="#fff"
  >
    <div
      style="height: 20px; margin-bottom: 20px; background: #00bc9d"
      v-for="item in 30"
    ></div>
  </d-nav-bar-page>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    scrollExceed({scrollExceed, opacity}) {
      console.log(scrollExceed, opacity);
    },
  },
};
</script>
<style lang="scss">
.page-home {
  background: rosybrown;
}
</style>
