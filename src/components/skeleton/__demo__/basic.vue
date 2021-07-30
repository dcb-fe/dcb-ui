<template>
  <div class="skeleton-demo">
    <p class="title">基础用法</p>
    <d-skeleton
      :loading="true"
      title
      titleWidth="40%"
      :rowWidth="rowWidth"
    ></d-skeleton>
    <p class="title">显示头像</p>
    <d-skeleton
      :loading="true"
      avatar
      title
      round
      titleWidth="20%"
      :rowWidth="rowWidth"
    ></d-skeleton>
    <p class="title">显示组件</p>
    <d-switch
      :active="active"
      activeBgColor="#FF960A"
      @switch-on="switchOn"
      @switch-off="switchOff"
    />
    <d-skeleton
      :loading="loading"
      avatar
      title
      round
      titleWidth="60%"
      :rowWidth="[100, 100, 85]"
    >
      <div class="show-demo">
        <div class="logo">
          <img
            src="http://assets-center.oss-cn-shenzhen.aliyuncs.com/web/onlineview/img/dcb-logo-skeleton.png"
          />
        </div>
        <div class="text">
          <p>关于多彩宝H5组件库</p>
          <div>
            多彩宝H5组件库
            是一套轻量、可靠的移动端库组件库，提供了丰富的基础组件和业务组件，帮助开发者快速搭建移动应用。
          </div>
        </div>
      </div>
    </d-skeleton>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: true,
        loading: false,
        text: '',
        rowWidth: [100, 100, 90],
      };
    },
    methods: {
      switchOn(value) {
        this.loading = !value;
      },
      switchOff(value) {
        this.loading = !value;
      },
    },
  };
</script>
<style scoped lang="scss">
  .skeleton-demo {
    height: 100%;
    background: white;
    padding: 16px;
    .d-switch {
      margin-bottom: 16px;
    }
    .title {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 20px;
    }
    .show-demo {
      display: flex;
      .logo {
        width: 32px;
        height: 32px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .text {
        flex: 1;
        margin-left: 16px;
        p {
          margin-top: 0;
          font-size: 17px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: 24px;
          margin-bottom: 14px;
        }
        div {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 20px;
        }
      }
    }
  }
</style>
