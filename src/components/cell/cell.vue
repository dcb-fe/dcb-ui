<template>
  <div :class="_.cell" :style="{ 'background-color': bgColor }">
    <div :class="[_.box, border && _.border_bottom]">
      <!-- <slot name="left-icon">
        <d-icon v-if="leftIcon" :class="_.left_icon" :name="leftIcon"/>
      </slot> -->

      <div :class="_.left">
        <span :class="_.title">
          <slot name="title">{{ label }}</slot>
        </span>

        <div v-if="subTitle" :class="_.sub_title">
          <slot name="sub-title">{{ subTitle }}</slot>
        </div>
      </div>

      <div :class="_.right">
        <span v-if="!$slots.desc && desc" :class="_.desc">{{desc}}</span>
        <slot v-if="$slots.desc" name="desc"></slot>
        
        <slot name="right-icon">
          <d-icon v-if="rightIcon" :class="_.right_icon" :name="rightIcon" @click="handleClick"/>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
  import DIcon from '../icon/icon';
  import { defineComponent } from '@/utils';

  export default defineComponent({
    name: 'Cell',

    components: {
      DIcon
    },

    props: {
      label: {
        type: String,
        default: '',
        desc: '单元格标题'
      },

      subTitle: {
        type: String,
        default: '',
        desc: '单元格副标题'
      },

      leftIcon: {
        type: String,
        default: '',
        desc: '左侧图标名称 name="clock"，支持插槽'
      },

      rightIcon: {
        type: String,
        default: '',
        desc: '右侧图标名称 name="setting"，支持插槽'
      },
      
      desc: {
        type: String,
        default: '',
        desc: '右侧内容'
      },
      
      bgColor: {
        type: String,
        default: '#fff',
        desc: '单元格背景色'
      },

      border: {
        type: Boolean,
        default: true,
        desc: '是否显示内边框'
      }
    },

    methods: {
      clickCell () {
        this.$emit('click-cell');
      },

      handleClick () {
        this.$emit('click')
      }
    }
  });
</script>

<style lang="scss" module>
  .cell { 
    box-sizing: border-box;
    padding: 0 0 0 12px;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    outline: none;
    overflow: hidden;
  }

  .box {
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    min-height: 54px;
    padding: 16px 12px 16px 0;
  }

  .border_bottom {
    border-bottom: 1px solid #E9E9E9;
  }

  .title, .desc {
    display: block;
    color: #333;
    font-size: 16px;
    line-height: 22px;
  }

  .left_icon {
    font-size: 19px !important;
    margin-right: 5px;
  }

  .right_icon {
    font-size: 19px !important;
    margin-left: 5px;
  }

  .left, .right {
    align-items: baseline;
  }

  .left {
    min-width: 80px;
  }

  .right {
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
  }
</style>
