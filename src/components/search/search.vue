<template>
  <div :class="_.search">
    <form :class="_.form" action="javascript:void 0">
      <div :class="[_.content, _[shape]]">
        <Icon name="search" :class="_.icon" />
        <input
          v-model="keyword"
          :class="[_.control, _[inputAlign]]"
          type="text"
          :placeholder="placeholder"
          @focus="handlerInputFocus"
          @blur="handlerInputBlur"
          @keyup.13="handlerInputSearch"
          @input="handlerInput"
        />
        <Icon
          v-show="keyword.length"
          :class="_.clear"
          name="search_eliminate"
          @click="handlerClearClick"
        />
      </div>
      <div v-if="hasSlot" :class="_.action">
        <slot name="right" />
      </div>
    </form>
  </div>
</template>

<script>
  import Icon from '@/components/icon/icon';
  import { defineComponent } from '@/utils';

  export default defineComponent({
    name: 'Search',

    components: { Icon },

    props: {
      value: {
        type: String,
        default: '',
        desc: '输入框初始值',
      },
      placeholder: {
        type: String,
        default: '请输入搜索关键字',
        desc: '输入框提示文案',
      },
      shape: {
        type: String,
        default: 'square',
        enum: ['square', 'round'],
        desc: '搜索框形状',
      },
      inputAlign: {
        type: String,
        default: 'left',
        enum: ['left', 'center', 'right'],
        desc: '输入框对齐方式',
      },
    },

    emits: {
      search: {
        desc: '确定搜索时触发',
        payload: {
          value: {
            type: String,
            desc: '输入框当前的值',
          },
        },
      },
      input: {
        desc: '输入框内容变化时触发',
        payload: {
          value: {
            type: String,
            desc: '输入框当前的值',
          },
        },
      },
      focus: {
        desc: '输入框获得焦点时触发',
        payload: {
          value: {
            type: String,
            desc: '输入框当前的值',
          },
        },
      },
      blur: {
        desc: '输入框失去焦点时触发',
        payload: {
          value: {
            type: String,
            desc: '输入框当前的值',
          },
        },
      },
      clear: {
        desc: '点击清除按钮后触发',
      },
    },

    slots: {
      right: {
        desc: '搜索区域右侧内容',
      },
    },

    data() {
      return {
        keyword: '',
      };
    },

    computed: {
      hasSlot() {
        return Object.keys(this.$slots).length;
      },
      attrs() {
        return this.$attrs;
      },
    },

    watch: {
      keyword(val) {
        this.$emit('input', val);
      },
    },

    created() {
      this.keyword = this.value;
    },

    methods: {
      handlerClearClick() {
        this.keyword = '';
        this.$emit('clear');
      },
      handlerInputFocus() {
        this.$emit('focus', this.keyword);
      },
      handlerInputBlur() {
        this.$emit('blur', this.keyword);
      },
      handlerInput() {
        this.$emit('input', this.keyword);
      },
      handlerInputSearch() {
        this.$emit('search', this.keyword);
      },
    },
  });
</script>

<style lang="scss" module>
  .search {
    width: auto;
    padding: 12px;
    background: white;

    .form {
      display: flex;
      align-items: center;

      .content {
        display: flex;
        flex: 1;
        align-items: center;
        height: 22px;
        padding: 8px 12px;
        background: #f5f5f5;
        border-radius: 6px;
        font-size: 22px;

        .icon {
          color: #d2d5d9;
          font-size: 22px;
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
            color: #aaaaaa;
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

        .clear {
          color: #d2d5d9;
          font-size: 22px;
        }

        &.round {
          border-radius: 18px;
        }
      }

      .action {
        padding: 8px 4px 8px 16px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ff960a;
        line-height: 22px;
        cursor: pointer;
      }
    }
  }
</style>
