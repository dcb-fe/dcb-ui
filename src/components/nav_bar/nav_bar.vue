<template>
  <div
    :class="[_.nav_bar, fixed && _.nav_bar_fixed]"
    :style="{ background: background }"
  >
    <div
      v-if="safeTop"
      :class="[
        _.state,
        _isIos && _.ios_safe_top,
        _isAndroid && _.android_safe_top,
        _isAndroid && judgeBigScreen() && _.android_safe_top_full,
      ]"
    ></div>

    <div :class="[search ? _.search_content : _.content]">
      <div :class="_.content_left" @click.stop="handleBack">
        <slot name="left">
          <d-icon name="return" :class="_.icon" :style="styleGetter"/>
          <div v-if="leftText" :style="styleGetter" :class="_.content_left_text">
            {{ leftText }}
          </div>
        </slot>
      </div>

      <slot>
        <template v-if="!search">
          <div :class="[_.content_title, 'text-ellipsis']" :style="styleGetter">
            <template v-if="title">
              {{ title }}
            </template>
            <slot name="tab" v-else>
              <div :class="_.content_head_tab">
                <template>
                  <span
                    v-for="(item, index) in tabS"
                    ref="tabs"
                    :class="[
                      activeTab === index && _.content_head_tab_active,
                      _.content_head_tab_item,
                    ]"
                    :key="'tab-' + index"
                  ><a @click="selectTab(index, $event)">{{ item }}</a></span
                  >
                  <span
                    ref="activeLine"
                    :class="_.content_head_tab_active_line"
                    v-if="tab.length"
                  ></span>
                </template>
              </div>
            </slot>
          </div>

          <div :class="_.content_right">
            <slot name="action">
              <d-icon
                v-if="service"
                :class="_.icon"
                :style="styleGetter"
                @click.stop="handleService"
                name="service"
              />
              <d-icon
                v-if="share"
                :class="_.icon"
                :style="styleGetter"
                @click.stop="handleShare"
                name="share"
              />
              <d-icon
                v-if="more"
                name="more"
                :class="[_.icon, _.icon_share]"
                :style="styleGetter"
                @click.stop="handleMore"
              />
              <d-icon
                v-if="close"
                name="close"
                :class="_.icon"
                :style="styleGetter"
                @click.stop="handleClose"
              />
            </slot>
          </div>
        </template>

        <template v-else>
          <a
            :style="styleGetter"
            v-if="site"
            :class="_.search_site"
            @click="selectSite"
          >
            <span :class="_.search_site_txt">{{ site }}</span>
            <d-icon name="arroi" :style="styleGetter"/>
          </a>
          <slot name="search">
            <div
              :class="_.search_content_bar"
              :style="{ backgroundColor: searchBgColor }"
              @click.stop="handleSearch"
            >
              <d-icon name="search" :style="styleGetter"/>
              <span v-if="shamSearch" :style="styleGetter">{{
                  placeholder
                }}</span>
              <input
                v-model="searchVal"
                @blur="$emit('searchBlur')"
                @focus="$emit('searchFocus')"
                @keydown="keydown"
                v-else
                :style="styleGetter"
                :placeholder="placeholder"
              />
            </div>
            <slot name="action"/>
          </slot>
        </template>
      </slot>
    </div>
    <d-area
      v-model="siteOption.visible"
      :province="siteOption.province"
      :city="siteOption.city"
      :country="siteOption.country"
      @confirm="data => $emit('areaConfirm', data)"
      @onChange="data => $emit('areaChange', data)"
    />
  </div>
</template>

<script>
import DIcon from '../icon/icon';
import {defineComponent} from '@/utils';
import {isIOS, isAndroid} from '../../utils/validate/system';
import DArea from '../area/area';

export default defineComponent({
  name: 'NavBar',

  components: {
    DIcon,
    DArea,
  },

  props: {
    title: {
      type: String,
      default: '',
      desc: '导航标题',
    },

    tab: {
      type: Array,
      default: () => [],
      desc: 'tab菜单，最多只能放2个',
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
    shamSearch: {
      type: Boolean,
      default: true,
      desc: '是否展示虚假输入框',
    },

    site: {
      type: String,
      default: '',
      desc: '是否展示搜索',
    },
    siteOption: {
      type: Object,
      default: () => {
        return {
          visible: false,
          addressText: '',
          province: [
            {districtCode: 1, districtSimpleName: '北京'},
            {districtCode: 2, districtSimpleName: '广西'},
            {districtCode: 3, districtSimpleName: '江西'},
            {districtCode: 4, districtSimpleName: '岫岩满族自治县'},
          ], // 省
          city: [
            {districtCode: 7, districtSimpleName: '朝阳区'},
            {districtCode: 8, districtSimpleName: '崇文区'},
            {districtCode: 9, districtSimpleName: '昌平区'},
            {districtCode: 6, districtSimpleName: '岫岩满族自治县'},
          ], // 市
          country: [
            {districtCode: 3, districtSimpleName: '八里庄街道'},
            {districtCode: 9, districtSimpleName: '北苑'},
            {districtCode: 4, districtSimpleName: '岫岩满族自治县'},
          ], // 县
        };
      },
      desc: '地址配置项',
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
    more: {
      type: Boolean,
      default: false,
      desc: '是否展示更多',
    },
    service: {
      type: Boolean,
      default: false,
      desc: '是否展示客服',
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
    color: {
      type: String,
      default: '',
      desc: '导航栏文案/icon颜色',
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

    tab: {
      desc: '自定义title位置的标题（当title传值了此插槽不生效）',
    },

    action: {
      desc: '自定义操作',
    },

    left: {
      desc: '自定义左侧区域内容',
    },

    search: {
      desc: '自定义搜索栏',
    },
  },

  emits: {
    back: {
      desc: '返回',
    },

    close: {
      desc: '关闭',
    },

    share: {
      desc: '分享',
    },

    search: {
      desc: 'shamSearch为true时无返回值，反之则返回当前input中的value（回车事件也会触发该方法）',
    },
    searchBlur: {
      desc: '搜索失去焦点',
      payload: {
        event: {
          type: Object,
          desc: 'event',
        },
      },
    },
    searchFocus: {
      desc: '搜索获取焦点',
      payload: {
        event: {
          type: Object,
          desc: 'event',
        },
      },
    },
    searchChange: {
      desc: '搜索value值改变',
      payload: {
        value: {
          type: String,
          desc: '当前的搜索值',
        },
      },
    },
  },

  computed: {
    tabS() {
      return this.tab.length > 2 ? this.tab.splice(0, 2) : this.tab;
    },
    styleGetter() {
      return {color: this.color ? this.color : (this.background ? '#fff' : '')};
    },

    _isIos() {
      return isIOS();
    },

    _isAndroid() {
      return isAndroid();
    },
  },
  data() {
    return {
      searchVal: '',
      activeTab: 0,
    };
  },

  mounted() {
    this.$nextTick(() => {
      if (this.tab.length) {
        this.setTabActive(this.$refs.tabs[0]);
      }
    });
  },
  watch: {
    searchVal(v) {
      this.$emit('searchChange', v);
    },
  },

  methods: {
    judgeBigScreen() {
      return window.screen.height === window.outerHeight; // true 刘海屏
    },
    keydown(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        this.$emit('search', this.searchVal);
      }
    },
    selectSite() {
      this.siteOption.visible = true;
    },
    handleBack() {
      this.$emit('back');
    },

    handleShare() {
      this.$emit('share');
    },
    handleMore() {
      this.$emit('more');
    },
    handleService() {
      this.$emit('service');
    },

    handleClose() {
      this.$emit('close');
    },

    handleSearch() {
      if (this.shamSearch) {
        this.$emit('search');
      }
    },
    setTabActive(parentNode) {
      // 设置选中的tab
      const x =
        getComputedStyle(parentNode)['width'].split('px')[0] / 2 +
        parentNode.offsetLeft;
      this.$refs.activeLine.style.transform = `translateX(${x}px) translateX(-50%)`;
    },
    selectTab(index, event) {
      this.setTabActive(event.target.parentNode);
      this.activeTab = index;
      this.$emit('tabIndex', index);
    },
  },
});
</script>

<style lang="scss" module>
.nav_bar {
  background-color: #fff;
  width: 100%;
  user-select: none;

  &_fixed {
    position: fixed;
  }

  .icon {
    font-size: 22px;

    &_share {
      margin-right: 22px;
    }
  }

  .state {
    box-sizing: border-box;
  }

  .ios_safe_top {
    @supports (-webkit-touch-callout: none) {
      /*针对IOS的css*/
      padding-top: constant(safe-area-inset-top);
      padding-top: env(safe-area-inset-top);
    }
  }

  .android_safe_top {
    padding-top: 40px;
  }

  .android_safe_top_full {
    // 全面屏
    padding-top: 25px;
  }

  .content {
    width: 100%;
    position: relative;
    height: 44px;
    display: grid;
    grid-template-columns: 82px 1fr 82px;
    align-items: center;
    overflow: hidden;

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

      img {
        width: 100%;
        object-fit: none;
      }
    }

    &_right {
      padding-right: 16px;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      i {
        & + i {
          margin-left: 16px;
        }
      }
    }

    &_head_tab {
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      &_item {
        position: relative;
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 6px;
        cursor: pointer;
        text-decoration: none;
        outline: none;

        a {
          font-size: 18px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          line-height: 25px;
          color: #666666;

          &:hover {
            text-decoration: none !important;
          }
        }
      }

      &_active {
        a {
          font-weight: bold !important;
          color: #333333 !important;
        }

        //&::after {
        //  content: '';
        //  position: absolute;
        //  width: 100%;
        //  background: #ff960a;
        //  border-radius: 2px;
        //  height: 4px;
        //  left: 0;
        //  bottom: -8px;
        //}

        &_line {
          position: absolute;
          width: 40px;
          background: #ff960a;
          border-radius: 2px;
          height: 4px;
          left: 0;
          bottom: 0;
          transition-duration: 0.3s;
        }
      }
    }
  }

  .search_site {
    margin-left: 4px;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: bold;
    color: #333333;
    line-height: 22px;
    display: flex;

    &_txt {
      display: inline-block;
      max-width: 64px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &:hover {
      text-decoration: none !important;
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

      input {
        width: 100%;
        font-family: inherit; /* 1 */
        margin: 0; /* 2 */
        -webkit-appearance: none;
        -webkit-tap-highlight-color: rgba(255, 0, 0, 0); // 移除移动端阴影
        border: 0;
        background: none;
        padding-left: 4px;
        outline: none;

        &::placeholder {
          font-size: 14px;
          height: 22px;
          line-height: 22px;
        }
      }
    }
  }
}
</style>
