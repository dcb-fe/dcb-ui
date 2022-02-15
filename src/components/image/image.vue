<template>
  <div
    :class="[_.image, radius && _.radius, round && _.round]"
    :style="{
      'border-radius': radius >= 0 ? radius + 'px' : radius,
      'width': width >= 0 ? width + 'px' : width,
      'height': width >= 0 ? height + 'px' : height,
    }"
  >
    <img
      v-if="lazy && success"
      @click="clickFn"
      v-lazy="srcText()"
      :alt="alt"
      :key="srcText()"
      :style="{
        'object-fit': fit,
        'object-position': position,
      }"
    />
    <img
      v-if="!lazy && success"
      @load="load"
      @error="error"
      @click="clickFn"
      :src="srcText()"
      :alt="alt"
      :style="{
        'object-fit': fit,
        'object-position': position,
      }"
    />
    <div v-if="isShow" :class="_.status">
      <template v-if="$slots.loading">
        <slot name="loading" />
      </template>
      <Icon v-else name="picture" :style="{ 'font-size': iconSize }" />
    </div>
    <div v-if="!success" :class="_.status">
      <template v-if="$slots.error">
        <slot name="error" />
      </template>
      <Icon v-else name="picture_split" :style="{ 'font-size': iconSize }" />
    </div>
  </div>
</template>

<script>
  import { defineComponent } from '@/utils';
  import Icon from '../icon/icon';
  export default defineComponent({
    name: 'Image',
    components: {
      Icon,
    },
    props: {
      src: {
        type: String,
        required: true,
        desc: '图片链接',
      },
      position: {
        type: String,
        default: 'center',
        desc: '图片位置，等同于原生的 object-position 属性，可选值为 top right bottom left 或 string',
      },
      lazy: {
        type: Boolean,
        default: false,
        desc: '是否开启图片懒加载，须配合 vue-lazyload 组件使用',
      },
      fit: {
        type: String,
        default: 'fill',
        desc: '图片填充模式',
      },
      alt: {
        type: String,
        default: '',
        desc: '替代文本',
      },
      width: {
        type: String | Number,
        enum: ['number', 'string'],
        default: '',
        desc: '宽度，默认单位为px',
      },
      height: {
        type: String | Number,
        enum: ['number', 'string'],
        default: '',
        desc: '高度，默认单位为px',
      },
      radius: {
        type: String | Number,
        enum: ['number', 'string'],
        default: '',
        desc: '圆角大小，默认单位为px',
      },
      round: {
        type: Boolean,
        default: false,
        desc: '是否显示为圆形,注意当图片宽高不相等且 fit 为 contain 或 scale-down 时，将无法填充一个完整的圆形。',
      },
      iconSize: {
        type: String,
        default: '16px',
        desc: '加载图标和失败图片的大小',
      },
    },
    slots: {
      loading: {
        desc: '自定义加载中的提示内容',
      },
      error: {
        desc: '自定义加载失败时的提示内容',
      },
    },
    emits: {
      error: {
        desc: '点击图片时触发',
      },
      click: {
        desc: '图片加载失败时触发',
        payload: {
          event: {
            type: Object,
            desc: 'event',
          },
        },
      },
      load: {
        desc: '图片加载完毕时触发',
      },
    },
    data() {
      return {
        loading: true,
        success: true,
      };
    },
    computed: {
      isShow() {
        return this.$slots.hasOwnProperty('loading') && this.loading;
      },
    },
    methods: {
      getOsVersion() {
        let u = navigator.userAgent;
        let version = '';
        if (u.indexOf('Mac OS X') > -1) {
          // ios
          var regStrSaf = /OS [\d._]*/gi;
          var verinfo = u.match(regStrSaf);
          version =
            'IOS' +
            (verinfo + '').replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.');
        } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
          // android
          version =
            'Android' +
            u.substr(
              u.indexOf('Android') + 8,
              u.indexOf(';', u.indexOf('Android')) - u.indexOf('Android') - 8,
            );
        } else if (u.indexOf('BB10') > -1) {
          // 黑莓bb10系统
          version =
            'blackberry' +
            u.substr(
              u.indexOf('BB10') + 5,
              u.indexOf(';', u.indexOf('BB10')) - u.indexOf('BB10') - 5,
            );
        } else if (u.indexOf('IEMobile') > -1) {
          // windows phone
          version =
            'winphone' +
            u.substr(
              u.indexOf('IEMobile') + 9,
              u.indexOf(';', u.indexOf('IEMobile')) - u.indexOf('IEMobile') - 9,
            );
        } else {
          var userAgent = navigator.userAgent.toLowerCase();
          if (userAgent.indexOf('windows nt 5.0') > -1) {
            version = 'Windows 2000';
          } else if (
            userAgent.indexOf('windows nt 5.1') > -1 ||
            userAgent.indexOf('windows nt 5.2') > -1
          ) {
            version = 'Windows XP';
          } else if (userAgent.indexOf('windows nt 6.0') > -1) {
            version = 'Windows Vista';
          } else if (
            userAgent.indexOf('windows nt 6.1') > -1 ||
            userAgent.indexOf('windows 7') > -1
          ) {
            version = 'Windows 7';
          } else if (
            userAgent.indexOf('windows nt 6.2') > -1 ||
            userAgent.indexOf('windows 8') > -1
          ) {
            version = 'Windows 8';
          } else if (userAgent.indexOf('windows nt 6.3') > -1) {
            version = 'Windows 8.1';
          } else if (
            userAgent.indexOf('windows nt 6.2') > -1 ||
            userAgent.indexOf('windows nt 10.0') > -1
          ) {
            version = 'Windows 10';
          } else {
            version = 'Unknown';
          }
        }
        return version;
      },
      srcText() {
        if (typeof navigator === 'object') {
          const isIOS = !!navigator.userAgent.match(
            /\(i[^;]+;( U;)? CPU.+Mac OS X/,
          );
          const getUrl =
            /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
          const version = this.getOsVersion();
          const whiteList = [
            'new-resource.gogpay.cn',
            'dcb-resource.gogpay.cn',
            'dcb-mall-china.gogpay.cn',
            'app-frontend.gogpay.cn',
            'household-service.gogpay.cn',
            'assets.gogpay.cn',
            'cdn-resource.gogpay.cn',
          ];
          if (/\.jpg$|.png$|.jpeg$|.gif$/.test(this.src)) {
            if (isIOS) {
              let [a] = version.replace('IOS', '').split('.');
              if (a >= 14) {
                return (
                  this.src +
                  (whiteList.includes(getUrl.exec(this.src)[0])
                    ? '!webp'
                    : '?x-oss-process=image/format,webp')
                );
              } else {
                return this.src;
              }
            } else {
              let [a] = version.replace('Android', '').split('.');
              let isW = version.indexOf('Windows');
              let isMac = version.indexOf('IOS');
              if (a >= 7 || isW !== -1 || isMac !== -1) {
                return (
                  this.src +
                  (whiteList.includes(getUrl.exec(this.src)[0])
                    ? '!webp'
                    : '?x-oss-process=image/format,webp')
                );
              } else {
                return this.src;
              }
            }
          } else if (/\.webp$|/.test(this.src)) {
            if (isIOS) {
              let [a] = version.replace('IOS', '').split('.');
              return a < 14
                ? this.src + '?x-oss-process=image/format,png'
                : this.src;
            } else {
              let [a] = version.replace('Android', '').split('.');
              let isW = version.indexOf('Windows');
              let isMac = version.indexOf('IOS');
              if (a >= 7 || isW !== -1 || isMac !== -1)  {
                return this.src
              } else {
                return this.src + '?x-oss-process=image/format,png'
              }
            }
          } else {
            return this.src;
          }
        } else {
          return this.src;
        }
      },
      load() {
        this.loading = false;
        this.$emit('load');
      },
      error() {
        this.loading = false;
        this.success = false;
        this.$emit('error');
      },
      clickFn(e) {
        this.$emit('click', e);
      },
    },
  });
</script>

<style lang="scss" module>
  .image {
    width: 100%;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .status {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgb(198, 199, 201);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .radius {
    overflow: hidden;
  }
  .round {
    overflow: hidden;
    border-radius: 50%;
  }
</style>
