<template>
  <div :class="_.nav_bar_page">
    <div ref="pageHead" v-if="showNavBar">
      <slot name="navBar">
        <DNavBar
          ref="DNavBar"
          :fixed="fixed"
          :title="title"
          :tab="tab"
          :safeTop="safeTop"
          :leftText="leftText"
          :rightText="rightText"
          :search="search"
          :shamSearch="shamSearch"
          :site="site"
          :siteOption="siteOption"
          :placeholder="placeholder"
          :share="share"
          :more="more"
          :service="service"
          :close="close"
          :searchBgColor="searchBgColor"
          :background="nowBgColor"
          :color="nowColor"
          @back="$emit('back')"
          @close="$emit('close')"
          @service="$emit('service')"
          @more="$emit('more')"
          @share="$emit('share')"
        />
      </slot>
    </div>
    <div
      :class="_.nav_bar_page_content"
      @scroll.stop.prevent="scrollPageContent($event)"
      ref="pageContent"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {defineComponent} from '@/utils';
import DNavBar from '@/components/nav_bar/nav_bar';

const props = () => {
  const data = {...DNavBar.props};
  delete data.background;
  return data;
};
export default defineComponent({
  name: 'NavBarPage',
  components: {
    DNavBar
  },
  props: {
    ...props(),
    fixed: {
      type: Boolean,
      default: true,
      desc: '是否浮动布局',
    },
    showNavBar: {
      type: Boolean,
      default: true,
      desc: '是否隐藏导航栏，非多彩宝环境设置为false',
    },
    navBarBg: {
      type: String,
      default: 'transparent',
      desc: '导航栏背景颜色',
    },
    navBarColor: {
      type: String,
      default: '#fff',
      desc: '导航栏文字颜色',
    },
    backToTop: {
      type: Boolean,
      default: true,
      desc: '再次进入时，是否回到顶部',
    },
    scrollCallBack: {
      // 滑动回调
      type: Function,
      desc: '页面滑动事件，返回Object（that,// 组件实例，opacity，// 透明度, scrollExceed // 滚动距离是否超过导航栏高度, scrollTop // 滑动距离顶部的高度, pageHeadH // 导航栏区域的高度）,可以通过实例修改newBgColor,newColor的颜色值',
    },
  },
  emits: {
    back: {
      desc: '返回',
    },

    close: {
      desc: '关闭',
    },
    service: {
      desc: '客服',
    },
    more: {
      desc: '更多',
    },
    share: {
      desc: '分享',
    },
  },
  slots: {
    default: {
      desc: '内容区域，可以滑动',
    },
    navBar: {
      desc: '导航栏',
    },
  },
  data() {
    return {
      newBgColor: '',
      newColor: '',
      pageHeadH: 0
    };
  },
  computed: {
    nowBgColor: {
      get() {
        return this.newBgColor ? this.newBgColor : this.navBarBg;
      },
    },
    nowColor: {
      get() {
        return this.newColor ? this.newColor : this.navBarColor;
      },
    },
  },
  activated() {
    if (this.backToTop) {
      this.$nextTick(() => {
        this.scrollPageContent({
          target: {
            scrollTop: 0
          }
        })
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.pageHeadH = this.$slots.navBar ? this.$refs.pageContent.parentNode.children[0].children[0].offsetHeight : this.$refs.DNavBar.$el.offsetHeight
      this.$refs.pageContent.children[0].style.paddingTop = this.pageHeadH + 'px'
    })
  },
  methods: {
    hexToRgb(val) {
      // HEX十六进制颜色值转换为RGB(A)颜色值
      // 16进制颜色值的正则
      const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      // 把颜色值变成小写
      let color = val.toLowerCase();
      let result = '';
      if (reg.test(color)) {
        // 如果只有三位的值，需变成六位，如：#fff => #ffffff
        if (color.length === 4) {
          let colorNew = '#';
          for (let i = 1; i < 4; i += 1) {
            colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
          }
          color = colorNew;
        }
        // 处理六位的颜色值，转为RGB
        const colorChange = [];
        for (let i = 1; i < 7; i += 2) {
          colorChange.push(parseInt(`0x${color.slice(i, i + 2)}`));
        }
        result = `rgb(${colorChange.join(',')})`;
        return {
          rgb: result,
          r: colorChange[0],
          g: colorChange[1],
          b: colorChange[2],
        };
      }
      result = '无效';
      return {rgb: result};
    },
    async scrollPageContent({target}) {
      console.log('执行', target)
      const pageHeadH = this.pageHeadH
      let opacity =
        target.scrollTop <= pageHeadH
          ? target.scrollTop / Math.round(pageHeadH)
          : 1;
      if (isNaN(opacity)){
        opacity = 0
      }
      const scrollExceed = target.scrollTop >= pageHeadH;
      if (this.scrollCallBack) {
        // 自定义滚动事件
        this.scrollCallBack({
          that: this, //当前组件实例
          opacity, // 透明度
          scrollExceed, // 滑动距离是否超过导航栏
          scrollTop: target.scrollTop, // 滑动距离顶部的高度
          pageHeadH // 导航栏区域的高度
        });
        return;
      }
      this.newBgColor = `rgba(255,255,255,${opacity})`;
      this.newColor = '#000';
      this.$emit('scrollExceed', {scrollExceed, opacity}); // 根据opacity 设置手机状态栏颜色
      if (scrollExceed) {
        this.newBgColor = `rgba(255,255,255,1)`;
        this.newColor = '#000';
      }
      if (target.scrollTop === 0) {
        this.newColor = '';
      }
    },
  },
});
</script>

<style lang="scss" module>
.nav_bar_page {
  overflow: hidden;

  &_content {
    height: 100vh;
    overflow-y: scroll;
    padding-bottom: 20px;

    &::-webkit-scrollbar {
      display: none;
    }

    @supports (-webkit-touch-callout: none) {
      /*针对IOS的css*/
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
}
</style>
