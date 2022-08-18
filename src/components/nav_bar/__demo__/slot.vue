<template>
  <div>
    <d-nav-bar
      title="标题"
      leftText="返回"
      :safe-top="false"
      @back="handleClick('back')"
    >
      <template #action>
        <span @click="handleClick('按钮')">文字按钮</span>
      </template>
    </d-nav-bar>
    <br/>
    <d-nav-bar
      title="标题"
      leftText="返回"
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
    <br/>
    <d-nav-bar
      share
      close
      title="标题"
      :safe-top="false"
      @back="handleClick('back')"
      @share="handleClick('share')"
      @close="handleClick('close')"
    />
    <br/>
    <d-nav-bar
      close
      title="标题"
      :safe-top="false"
      @back="handleClick('back')"
      @close="handleClick('close')"
    />
    <br/>
    <d-nav-bar
      service
      share
      title="标题"
      :safe-top="false"
      @back="handleClick('back')"
      @share="handleClick('share')"
      @service="handleClick('service')"
    />
    <br/>
    <d-nav-bar title="标题" :safe-top="false" @back="handleClick('back')">
      <template #action>
        <div class="service" @click="handleClick('service')">
          <d-icon name="service"/>
          <span>描述</span>
        </div>
      </template>
    </d-nav-bar>
    <br/>
    <d-nav-bar :safe-top="false" @back="handleClick('back')">
      <template #tab>
        <img
          src="http://dcb-frontend.oss-cn-chengdu.aliyuncs.com/img/COUPON.png"
        />
      </template>
    </d-nav-bar>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(name) {
      alert(name);
    },
  },
};
</script>
<style lang="scss">
.service {
  color: #018ff0;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 20px;
  display: flex;

  i {
    margin-right: 6px;
    font-size: 22px;
  }
}

.link {
  @extend .service;
  color: #202020;
}
</style>
