<template>
  <div class="slot">
    <d-nav-bar-page
      class="page-home"
      title="标题"
      :navBarBg="navBarBg"
      :scrollCallBack="scrollCallBack"
    >
      <template #navBar>
        <d-nav-bar
          search
          search-bg-color="rgba(255, 255, 255, 0.41)"
          background="transparent"
          :safe-top="false"
          :color="color"
          @back="handleClick('back')"
          @search="handleClick('handleClick')"
        />
      </template>
      <div
        style="height: 20px; margin-bottom: 20px; background: #00bc9d"
        v-for="item in 30"
      ></div>
    </d-nav-bar-page>
  </div>
</template>
<!--插槽-->
<script>
export default {
  data() {
    return {
      navBarBg: 'transparent',
      color: '#fff',
    };
  },
  methods: {
    handleClick(v) {
      alert(v);
    },
    //  that 组件实例，opacity 透明度, scrollExceed 滚动距离是否超过导航栏高度, scrollTop 滑动距离顶部的高度
    scrollCallBack({that, opacity, scrollExceed, scrollTop}) {
      this.navBarBg = `linear-gradient(270deg, rgba(253, 154, 120, ${opacity}) 0%,
       rgba(255, 161, 23, ${opacity}) 51%, rgba(255, 123, 105, ${opacity}) 100%)`;
      this.color = '#000';
      if (scrollTop === 0) {
        this.navBarBg = 'transparent';
        this.color = '#fff';
      }
    },
  },
};
</script>

<style scoped lang="scss">
.slot {
}
</style>
