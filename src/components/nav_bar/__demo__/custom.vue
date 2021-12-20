<template>
  <div>
    <d-nav-bar
      background="linear-gradient(270deg, #FD9A78 0%, #FFA117 51%, #FF7B69 100%)"
      title="标题"
      share
      close
      :safe-top="false"
      @back="handleClick"
    />
    <br />
    <d-nav-bar
      background="rgba(22, 187, 191, 1)"
      title="标题"
      share
      close
      :safe-top="false"
      @back="handleClick"
    />
    <br />
    <d-nav-bar
      background="rgba(0, 0, 0, 1)"
      title="标题"
      share
      close
      :safe-top="false"
      @back="handleClick"
    />
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      alert('hello');
    },
  },
};
</script>
