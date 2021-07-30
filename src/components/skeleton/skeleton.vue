<template>
  <div :class="_.skeleton">
    <div v-if="loading" :class="[_.case, animate && _.animate]">
      <div
        :class="[_.avatar, round && _.round]"
        v-if="avatar"
        :style="{ width: avatarSize, height: avatarSize }"
      ></div>
      <div :class="_.content">
        <h3
          :class="[_.title, round && _['round-text']]"
          v-if="title"
          :style="{ width: titleWidth }"
        />
        <div
          v-for="(item, index) in Number(row)"
          :style="{ width: rowWidthFn(index) }"
          :class="[_.row, round && _['round-text']]"
          :key="item"
        ></div>
      </div>
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from '@/utils';

  export default defineComponent({
    name: 'Skeleton',
    slots: {
      default: {
        desc: '需要显示的内容可以直接放入使用，当loading为false时则显示',
      },
    },
    props: {
      avatar: {
        type: Boolean,
        default: false,
        desc: '是否显示头像占位图',
      },
      avatarSize: {
        type: String,
        default: '32px',
        desc: '头像占位图大小',
      },
      round: {
        type: Boolean,
        default: false,
        desc: '是否显示为圆角风格',
      },
      title: {
        type: Boolean,
        default: false,
        desc: '是否显示标题占位图',
      },
      row: {
        type: [Number, String],
        default: 3,
        desc: '段落占位图行数',
      },
      titleWidth: {
        type: String,
        default: '40%',
        desc: '标题占位图宽度',
      },
      loading: {
        type: Boolean,
        default: true,
        desc: '是否显示骨架屏，传 false 时会展示子组件内容',
      },
      rowWidth: {
        type: [Array, String, Number],
        enum: ['Array', 'String', 'Number', '(number|string)[]'],
        default: () => [],
        desc: '段落占位图宽度，可传数组来设置每一行的宽度',
      },
      animate: {
        type: Boolean,
        default: true,
        desc: '是否开启动画',
      },
    },
    methods: {
      rowWidthFn(index) {
        if (typeof this.rowWidth === 'number') {
          return this.rowWidth + '%';
        } else if (typeof this.rowWidth === 'string') {
          return this.rowWidth;
        } else if (this.rowWidth instanceof Array) {
          if (typeof this.rowWidth[index] === 'number') {
            return this.rowWidth[index] + '%';
          } else if (typeof this.rowWidth[index] === 'string') {
            return this.rowWidth[index];
          } else {
            return this.rowWidth[index] || '100%';
          }
        } else {
          return '100%';
        }
      },
    },
  });
</script>

<style lang="scss" module>
  .skeleton {
    .round-text {
      border-radius: 8px;
    }
    .case {
      display: flex;
      .avatar {
        width: 32px;
        height: 32px;
        background-color: #f5f5f5;
        margin-right: 16px;
        flex-shrink: 0;
      }
      .round {
        border-radius: 50%;
      }
      .content {
        width: 100%;
        padding-top: 8px;
        .title {
          margin: 0;
          height: 16px;
          background-color: #f5f5f5;
        }
        .row {
          height: 16px;
          background-color: #f5f5f5;
          margin-top: 20px;
          &:last-child {
            width: 60%;
          }
          &:first-child {
            margin-top: 0;
          }
        }
      }
    }
    .animate {
      list-style: none;
      animation: skeleton-animation 1.2s ease-in-out infinite;
    }
    @keyframes skeleton-animation {
      50% {
        opacity: 0.6;
      }
    }
  }
</style>
