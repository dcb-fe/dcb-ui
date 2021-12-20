<template>
  <div>
    <d-nav-bar
      search
      :safe-top="false"
      @back="handleClick"
      @search="handleSearch"
    />
    <br />
    <d-nav-bar
      search
      search-bg-color="rgba(255, 255, 255, 0.41)"
      background="linear-gradient(270deg, #FD9A78 0%, #FFA117 51%, #FF7B69 100%)"
      :safe-top="false"
      @back="handleClick"
      @search="handleSearch"
    />
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      alert('hello');
    },

    handleSearch() {
      alert('search');
    },
  },
};
</script>
