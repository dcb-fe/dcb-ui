<template>
  <div :class="_.list">
    <div :class="_.group">
      <div v-for="(item, index) in list" :key="index" :class="_.item" @click="$emit('select', item, index)">
        <div :class="[_.cell, item.serviceFlag && _.disabled]">
          <div :class="_.name">
            <span>{{item.receiver}}</span>
            <span :class="_.tel">{{item.phoneNo}}</span>
          </div>
          <div :class="_.address">
            <span v-if="item.defaultFlag" :class="_.default_tag">{{item.serviceFlag ? '不在服务范围' : defaultTagText}}</span>
            {{item.detail}}
          </div>
        </div>

        <div :class="_.action">
          <d-radio v-if="!item.serviceFlag" v-model="radioVal" :class="_.default" :label="item.id" @click="label => {$emit('chose-default', label, item, index)}">默认地址</d-radio>
          <div :class="_.delete" @click="$emit('delete', item, index)"><d-icon name="delete" :class="_.icon_delete"/>删除</div>
          <div :class="_.edit" @click="$emit('edit', item, index)"><d-icon name="edit" :class="_.icon_edit"/>编辑</div>
        </div>
      </div>
    </div>

    <div :class="_.bottom">
      <d-button :class="_.add" @click="$emit('add')"><d-icon name="plus"/>{{addButtonText}}</d-button>
    </div>
  </div>
</template>

<script>
  import DButton from '../button/button';
  import DIcon from '../icon/icon';
  import DRadio from '../radio/radio';
  import { defineComponent } from '@/utils';

  export default defineComponent({
    name: 'AddressList',

    components: {
      DButton,
      DIcon,
      DRadio
    },

    props: {
      list: {
        type: Array,
        default: () => [],
        desc: '地址列表'
      },

      // eslint-disable-next-line vue/require-default-prop
      value: {
        type: [Number, String],
        desc: '当前选中地址的 id'
      },

      addButtonText: {
        type: String,
        default: '添加地址',
        desc: '底部按钮文字'
      },

      defaultTagText: {
        type: String,
        default: '默认',
        desc: '默认地址标签文字'
      }
    },

    emits: {
      add: {
        desc: '点击新增按钮时触发'
      },

      edit: {
        desc: '点击编辑按钮时触发',
        payload: {
          item: {
            type: Object,
            desc: '地址对象',
          },
          index: {
            type: Number,
            desc: '索引',
          }
        },
      },

      delete: {
        desc: '点击删除按钮时触发',
        payload: {
          item: {
            type: Object,
            desc: '地址对象',
          },
          index: {
            type: Number,
            desc: '索引',
          }
        },
      },

      select: {
        desc: '点击选中的地址时触发',
        payload: {
          item: {
            type: Object,
            desc: '地址对象',
          },
          index: {
            type: Number,
            desc: '索引',
          }
        },
      },

      'chose-default': {
        desc: '点击设置默认地址时触发',
        payload: {
          item: {
            type: Object,
            desc: '地址对象',
          },
          index: {
            type: Number,
            desc: '索引',
          }
        },
      }
    },

    data () {
      return {
        radioVal: this.value
      }
    },

    methods: {

    }
  });
</script>

<style lang="scss" module>
  .list {
    height: 100%;
    background-color: #F5F5F5;
    box-sizing: border-box;
    padding: 12px 12px 80px;
    overflow: auto;
  }

  .group {}

  .item {
    background-color: #fff;
    padding: 12px;
    margin-bottom: 12px;
    border-radius: 8px;
    user-select: none;
  }

  .cell {
    
  }

  .name {
    color: #333;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 7px;
  }

  .tel {
    font-size: 15px;
    color: #333333;
    padding-left: 8px;
  }

  .address {
    color: #333;
    font-size: 12px;
    line-height: 17px;
    padding-bottom: 4px;
    border-bottom: 1px solid #E9E9E9;
    text-align: justify;
  }

  .default_tag {
    font-size: 10px;
    color: #18B2B9;
    padding: 0 5px;
    border-radius: 7px;
    background-color: #F4FBFB;
    margin-right: 2px;
  }

  .default {
    margin-right: auto !important;
  }

  .action {
    padding-top: 12px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .delete, .edit {
    color: #333;
    font-size: 13px;
    display: flex;
    align-items: center;
  }

  .edit {
    color: #333;
    font-size: 13px;
    margin-left: 24px;
  }

  .icon_delete, .icon_edit {
    font-size: 20px !important;
    margin-right: 4px;
  }

  .disabled {
    .name, .tel {
      color: #AAAAAA;
    }

    .default_tag {
      background-color: rgba(153, 153, 153, .2);
      color: #AAAAAA;
    }

    .address {
      color: #AAAAAA;
    }
  }


  .bottom {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9999;
    padding: 0 16px;
    width: 100%;
    box-sizing: border-box;
  }

  .add {
    margin: 5px 0;
  }
</style>
