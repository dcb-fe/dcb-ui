<template>
  <div :class="_.swipe_item" :style="{width:width}">
    <slot/>
  </div>
</template>

<script>
import { defineComponent } from '@/utils';

export default defineComponent({
  name: 'SwipeItem',
  data(){
    return{
      width:''
    }
  },
  mounted(){
    this.width = `${this.$el.parentNode.parentNode.offsetWidth }px`
    console.log('123123',this.$el.parentNode.parentNode.offsetWidth)
  }
});
</script>

<style lang="scss" module>
.swipe_item {
  flex-shrink:0;
  height: 200px;

  display: inline-block;
}
</style>
