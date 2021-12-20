<template>
  <div
    :class="[_.nav_bar, fixed && _.nav_bar_fixed]"
    :style="{ background: background }"
  >
    <div v-if="safeTop" :class="_.state"></div>

    <div :class="[search ? _.search_content : _.content]">
      <div :class="_.content_left" @click.stop="handleBack">
        <d-icon name="return" :class="_.icon" :style="styleGetter" />
        <div v-if="leftText" :class="_.content_left_text">
          {{ leftText }}
        </div>
      </div>

      <slot>
        <template v-if="!search">
          <div :class="[_.content_title, 'text-ellipsis']" :style="styleGetter">
            {{ title }}
          </div>

          <div :class="_.content_right">
            <slot name="action">
              <d-icon
                v-if="share"
                name="more"
                :class="[_.icon, _.icon_share]"
                :style="styleGetter"
                @click.stop="handleShare"
              />
              <d-icon
                v-if="close"
                name="popup_close"
                :class="_.icon"
                :style="styleGetter"
                @click.stop="handleClose"
              />
            </slot>
          </div>
        </template>

        <template v-else>
          <div
            :class="_.search_content_bar"
            :style="{ backgroundColor: searchBgColor }"
            @click.stop="handleSearch"
          >
            <d-icon name="search" :style="styleGetter" />

            <span :style="styleGetter">{{ placeholder }}</span>
          </div>
        </template>
      </slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@/utils';

export default defineComponent({
  name: 'NavBar',

  props: {
    title: {
      type: String,
      default: '',
      desc: '导航标题',
    },

    leftText: {
      type: String,
      default: '',
      desc: '左侧文案',
    },

    rightText: {
      type: String,
      default: '',
      desc: '右侧文案',
    },

    search: {
      type: Boolean,
      default: false,
      desc: '是否展示搜索',
    },

    placeholder: {
      type: String,
      default: '搜索关键词',
      desc: '搜索默认提示文案',
    },

    share: {
      type: Boolean,
      default: false,
      desc: '是否展示分享',
    },

    close: {
      type: Boolean,
      default: false,
      desc: '是否展示关闭',
    },

    background: {
      type: String,
      default: '',
      desc: '导航背景色',
    },

    searchBgColor: {
      type: String,
      default: 'rgba(245, 245, 245, 1)',
      desc: '搜索框背景色',
    },

    fixed: {
      type: Boolean,
      default: false,
      desc: '是否浮动布局',
    },

    safeTop: {
      type: Boolean,
      default: true,
      desc: '刘海屏安全区，非多彩宝环境设置为false',
    },
  },

  slots: {
    default: {
      desc: '自定义导航',
    },

    action: {
      desc: '自定义操作',
    },
  },

  emits: {
    back: {
      desc: '返回',
      payload: {
        e: {
          type: Object,
          desc: '事件对象',
        },
      },
    },

    close: {
      desc: '关闭',
      payload: {
        e: {
          type: Object,
          desc: '事件对象',
        },
      },
    },

    share: {
      desc: '分享',
      payload: {
        e: {
          type: Object,
          desc: '事件对象',
        },
      },
    },

    search: {
      desc: '点击跳转分享',
      payload: {
        e: {
          type: Object,
          desc: '事件对象',
        },
      },
    },
  },

  computed: {
    styleGetter() {
      return { color: this.background ? '#fff' : '' };
    },
  },

  methods: {
    handleBack() {
      this.$emit('back');
    },

    handleShare() {
      this.$emit('share');
    },

    handleClose() {
      this.$emit('close');
    },

    handleSearch() {
      this.$emit('search');
    },
  },
});
</script>

<style lang="scss" module>
// 安全区域变量初始化
// :root {
//   --safe-area-inset-top: 24px;
//   --safe-area-inset-right: 0px;
//   --safe-area-inset-bottom: 0px;
//   --safe-area-inset-left: 0px;
//   @supports (top: constant(safe-area-inset-top)) and (padding: Max(10px, 20px)) {
//     --safe-area-inset-top: Max(constant(safe-area-inset-top), 24px);
//     --safe-area-inset-right: constant(safe-area-inset-right);
//     --safe-area-inset-bottom: constant(safe-area-inset-bottom);
//     --safe-area-inset-left: constant(safe-area-inset-left);
//   }
//   @supports (top: env(safe-area-inset-top)) and (padding: Max(10px, 20px)) {
//     --safe-area-inset-top: Max(env(safe-area-inset-top), 24px);
//     --safe-area-inset-right: env(safe-area-inset-right);
//     --safe-area-inset-bottom: env(safe-area-inset-bottom);
//     --safe-area-inset-left: env(safe-area-inset-left);
//   }
// }

.nav_bar {
  background-color: #fff;
  width: 100%;
  user-select: none;

  &_fixed {
    position: fixed;
    top: 0;
  }

  .icon {
    font-size: 22px;

    &_share {
      margin-right: 22px;
    }
  }

  .state {
    box-sizing: border-box;
    height: 24px;
    padding-top: calc(var(--safe-area-inset-top));
  }

  .content {
    width: 100%;
    position: relative;
    height: 44px;
    display: grid;
    grid-template-columns: 82px 1fr 82px;
    align-items: center;

    &_left {
      padding-left: 12px;
      display: flex;
      align-items: center;

      &_text {
        padding-left: 4px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        line-height: 22px;
      }
    }

    &_title {
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: bold;
      color: #171a1d;
      line-height: 25px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    &_right {
      padding-right: 16px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }

  .search_content {
    display: flex;
    align-items: center;
    height: 44px;

    &_bar {
      border-radius: 50px;
      display: flex;
      align-items: center;
      flex: 1;
      padding: 7px 12px;
      margin-left: 12px;
      margin-right: 12px;

      i {
        color: rgba(104, 106, 110, 1);
        flex: 0 0 22px;
        font-size: 22px;
        height: 22px;
        line-height: 22px;
        width: 22px;
      }

      span {
        margin-left: 4px;
        color: rgba(170, 170, 170, 1);
        font-size: 14px;
        height: 22px;
        line-height: 22px;
      }
    }
  }
}
</style>
