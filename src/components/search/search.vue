<template>
<form action="javascript:void 0">
  <div :class="_.search" :style="{backgroundColor: background}">
      <div :class="[_.content, {[_.round]: shape === 'round'}]">
        <d-icon name="search" />
        <input 
        v-model="keyword" 
        :class="[_.control, _[inputAlign]]" 
        type="text" 
        :placeholder="placeholder" 
        @focus="handlerInputFocus" 
        @blur="handlerInputBlur"
        @keyup.13="handlerInputSearch"
        @input=handlerInput
        >
        <d-icon v-show="keyword.length" name="close" @click="handlerClearClick"/>
      </div>
      <div v-if="hasSlot" :class="_.action">
        <slot name="right"/>
      </div>
  </div>
</form>
</template>

<script>
  import Icon from '../icon/icon.vue';
  import { defineComponent } from '@/utils';
  export default defineComponent({
    name: 'Search',
     components: {
      'd-icon': Icon
    },
    props: {
      value: {
        type: String,
        default: '',
        desc: '输入框初始值'
      },
      placeholder: {
        type: String,
        default: '请输入搜索关键字',
        desc: '输入框提示文案'
      },
      shape: {
        type: String,
        default: 'square',
        desc: '搜索框形状，可选值为 round'
      },
      background: {
        type: String,
        default: 'white',
        desc: '搜索区域外部背景颜色'
      },
      inputAlign: {
        type: String,
        default: 'left',
        desc: '输入框对齐方式, 可选值为center, right'
      }
    },
    emits: {
      search: {
        desc: '确定搜索时触发',
        payload: {
          val: {
            type: String,
            desc: '输入框当前的值'
          }
        }
      },
      input: {
        desc: '输入框内容变化时触发',
        payload: {
          val: {
            type: String,
            desc: '输入框当前的值'
          }
        }
      },
      focus: {
        desc: '输入框获得焦点时触发',
        payload: {
          val: {
            type: String,
            desc: '输入框当前的值'
          }
        }
      },
      blur: {
        desc: '输入框失去焦点时触发',
        payload: {
          val: {
            type: String,
            desc: '输入框当前的值'
          }
        }
      },
      clear: {
        desc: '点击清除按钮后触发'
      }
    },
    data() {
      return {
        keyword: ''
      }
    },
    slots: {
      right: {
        desc: '搜索区域右侧内容'
      }
    },
    computed: {
      hasSlot() {
        return Object.keys(this.$slots).length
      }
    },
    watch: {
      keyword(val) {
        this.$emit('input', val)
      }
    },
    created() {
      this.keyword = this.value;
    },
    methods: {
      handlerClearClick() {
        this.keyword = '';
        this.$emit('clear')
      },
      handlerInputFocus() {
        this.$emit('focus', this.keyword)
      },
      handlerInputBlur() {
        this.$emit('blur', this.keyword)
      },
      handlerInput() {
        this.$emit('input', this.keyword)
      },
      handlerInputSearch() {
        this.$emit('search', this.keyword)
      }
    }
  });
</script>

<style lang="scss" module>
  .search {
    display: flex;
    align-items: center;
    width: auto;
    padding: 12px;
    background: white;
  }

  .content {
      display: flex;
      flex: 1;
      align-items: center;
      padding: 8px 12px;
      background: #F5F5F5;
      border-radius: 6px;
      font-size: 22px;

      &.round {
        border-radius: 18px;
      }
    }

    .control {
      flex: 1;
      margin-left: 2px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 20px;
      border: none;
      outline: none;
      background: transparent;

      &::placeholder {
        color: #AAAAAA;
      }

      &.left {
        text-align: left;
      }

      &.center {
        text-align: center;
      }

      &.right {
        text-align: right;
      }
    }

    .action {
      padding: 8px 4px 8px 16px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FF960A;
      line-height: 22px;
      cursor: pointer;
    }
</style>
