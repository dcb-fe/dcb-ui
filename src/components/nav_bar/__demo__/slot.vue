<template>
  <div>
    <d-nav-bar
      share
      close
      :safe-top="false"
      @back="handleClick"
      @share="handleShare"
      @close="handleClose"
    />
    <br />
    <d-nav-bar
      close
      :safe-top="false"
      @back="handleClick"
      @close="handleClose"
    />
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      alert('back');
    },

    handleShare() {
      alert('share');
    },

    handleClose() {
      alert('close');
    },
  },
};
</script>
