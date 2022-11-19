<template>
  <div class="custom1">
    <d-nav-bar-page
      class="page-home"
      title="标题"
      :scrollCallBack="scrollCallBack"
    >
      <template #navBar>
        <d-nav-bar
          leftText="返回"
          title="标题"
          :background="navBarBg"
          :color="color"
          fixed
          :safe-top="false"
          @back="handleClick('back')"
        >
          <template #action>
            <div class="link">
              <d-icon name="link" @click="handleClick('link')"/>
              <span @click="handleClick('按钮')">按钮</span>
            </div>
          </template>
        </d-nav-bar>
      </template>
      <div class="content">
        <div
          style="height: 20px; margin-bottom: 20px; background: #00bc9d"
          v-for="item in 30"
        ></div>
      </div>
    </d-nav-bar-page>
  </div>
</template>
<!--插槽-->
<script>
export default {
  data() {
    return {
      navBarBg: 'transparent',
      color: '#000',
    };
  },
  methods: {
    handleClick(v) {
      alert(v);
    },
    //  that 组件实例，opacity 透明度, scrollExceed 滚动距离是否超过导航栏高度, scrollTop 滑动距离顶部的高度，pageHeadH // 导航栏区域的高度
    scrollCallBack({that, opacity, scrollExceed, scrollTop, pageHeadH}) {
      this.navBarBg = `linear-gradient(270deg, rgba(253, 154, 120, ${opacity}) 0%,
       rgba(255, 161, 23, ${opacity}) 51%, rgba(255, 123, 105, ${opacity}) 100%)`;
      this.color = '#000';
      console.log('pageHeadH', pageHeadH)
      if (scrollTop === 0) {
        this.navBarBg = 'transparent';
        this.color = '#000';
      }
    },
  },
};
</script>

<style scoped lang="scss">
.content{
  background: rosybrown;
}
.x-demo-container{
  .d-nav_bar-nav_bar_fixed{
    width: 351px;
  }
}
</style>
