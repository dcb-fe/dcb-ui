<template>
  <div :class="_.search" >
    <input v-model="keyword" type="text" :placeholder="placeholder" @input="inputHandler">
    <button @click="clickHander">搜索</button>
  </div>
</template>

<script>
  import { defineComponent } from '@/utils';

  export default defineComponent({
    name: 'Search',
    props: {
      value: {
        type: String,
        default: '',
        desc: '输入框的值'
      },
      placeholder: {
        type: String,
        default: '请输入',
        desc: '输入框提示文案'
      },
    },
    emits: {
      clear: {
        desc: '点击清除图标时触发',
        payload: {
          val: {
            type: String,
            desc: '当前输入框的值'
          } 
        }
      },
      click: {
        desc: '点击搜索或键盘完成时触发',
        payload: {
          val: {
            type: String,
            desc: '当前输入框的值'
          }  
        }
      },
      input: {
        desc: '输入时触发',
        payload: {
          val: {
            type: String,
            desc: '当前输入框的值'
          }  
        }
      }
    },
    data() {
      return {
        keyword: ''
      }
    },
    watch: {
      keyword(val) {
        this.$emit('input', val)
      }
    },
    methods: {
      clickHander() {
        this.$emit('click', this.keyword)
      },
      inputHandler() {
        this.$emit('change', this.keyword)
      }
    }
  });
</script>

<style lang="scss" module>
  .search {
    padding: 16px;
  }
</style>
