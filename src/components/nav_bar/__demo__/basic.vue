<template>
  <div>
    <d-nav-bar title="标题" :safe-top="false" @back="handleClick"/>
    <br/>
    <d-nav-bar :safe-top="false" @back="handleClick"/>
    <br/>
    <d-nav-bar :safe-top="false" @back="handleClick">
      <template #action>
        <d-icon name="search" @click="handleSearch"/>
      </template>
    </d-nav-bar>
    <br/>
    <d-nav-bar :safe-top="false" :tab="tab" @back="handleClick">
      <template #head>
        <d-icon name="search" @click="handleSearch"/>
      </template>
    </d-nav-bar>
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
    handleClick() {
      alert('back');
    },

    handleSearch() {
      alert('search');
    },
  },
};
</script>

<style lang="scss">
.d-icon-search {
  font-size: 22px;
}
</style>
