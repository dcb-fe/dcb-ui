<template>
  <div>
    <d-nav-bar title="标题" :safe-top="true" @back="handleClick('back')"/>
    <br/>
    <d-nav-bar :safe-top="false" @back="handleClick('back')"/>
    <br/>
    <d-nav-bar :safe-top="false" @back="handleClick('back')">
      <template #action>
        <d-icon name="search" @click="handleClick('search')"/>
      </template>
    </d-nav-bar>
    <br/>
    <d-nav-bar
      :safe-top="false"
      :tab="tab"
      @back="handleClick('back')"
      @tabIndex="index => handleClick(index)"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: ['tab1', 'tab2'],
    };
  },
  methods: {
    handleClick(name) {
      alert(name);
    },
  },
};
</script>

<style lang="scss">
.d-icon-search {
  font-size: 22px;
}
</style>
