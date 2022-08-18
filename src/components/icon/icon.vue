<template>
  <i :class="[_.icon, _[name]]" v-bind="$attrs" v-on="$listeners"/>
</template>

<script>
import {defineComponent} from '@/utils';

const icons = [
  'share',
  'select',
  'plus',
  'minus',
  'search_eliminate',
  'keyboard',
  'backspace',
  'add',
  'camera',
  'calendar',
  'close',
  'clock',
  'cart',
  'copy',
  'closed_eye',
  'eye',
  'coupon',
  'edit',
  'delete',
  'feedback',
  'good_job',
  'more',
  'like',
  'fire',
  'location',
  'home',
  'link',
  'notice',
  'code',
  'picture',
  'order',
  'return',
  'arrow_right',
  'arrow_up',
  'arrow_down',
  'refresh',
  'search',
  'scan',
  'service',
  'star',
  'telephone',
  'setting',
  'user_circle',
  'theme_color',
  'copy_fill',
  'cart_fill',
  'edit_fill',
  'calendar_fill',
  'coupon_fill',
  'like_fill',
  'eye_fill',
  'home_fill',
  'good_job_fill',
  'location_fill',
  'fire_fill',
  'qr_code_fill',
  'theme_color_fill',
  'setting_fill',
  'delete_fill',
  'telephone_fill',
  'user_circle_fill',
  'camera_fill',
  'star_fill',
  'notice_fill',
  'picture_split',
];

export default defineComponent({
  name: 'Icon',

  inheritAttrs: false,

  props: {
    name: {
      type: String,
      enum: icons,
      required: true,
      desc: '图标名称',
    },
  },

  emits: {
    click: {
      desc: '点击时触发',
      payload: {
        e: {
          type: Object,
          desc: '事件对象',
        },
      },
    },
  },
});
</script>

<style lang="scss" module>
/* CDN 服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: 'd-icon';  /* Project id 2653829 */
  src: url('//at.alicdn.com/t/c/font_2653829_7nuad0nkt36.woff2?t=1660727568979') format('woff2');
}

.icon {
  display: inline-block;
  font-family: 'd-icon' !important;
  font-style: normal;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.close:before {
  content: "\e647";
}

.return:before {
  content: "\e648";
}

.arrow_right:before {
  content: "\e648";
  display: inline-block;
  transform: rotate(180deg);
}

.arrow_up:before {
  @extend .arrow_right;
  transform: rotate(90deg);
}

.arrow_down:before {
  @extend .arrow_right;
  transform: rotate(-90deg);
}

.search:before {
  content: "\e649";
}

.more:before {
  content: "\e64a";
}

.arroi:before {
  content: "\e64b";
}

.copy_fill:before {
  content: "\e64c";
}

.coupon_fill:before {
  content: "\e64d";
}

.cart_fill:before {
  content: "\e64e";
}

.delete_fill:before {
  content: "\e64f";
}

.like_fill:before {
  content: "\e673";
}

.location_fill:before {
  content: "\e651";
}

.fire_fill:before {
  content: "\e652";
}

.good_job_fill:before {
  content: "\e653";
}

.eye_fill:before {
  content: "\e654";
}

.user_circle_fill:before {
  content: "\e655";
}

.home_fill:before {
  content: "\e656";
}

.notice_fill:before {
  content: "\e657";
}

.star_fill:before {
  content: "\e67e";
}

.setting_fill:before {
  content: "\e659";
}

.calendar_fill:before {
  content: "\e65a";
}

.edit_fill:before {
  content: "\e65b";
}

.telephone_fill:before {
  content: "\e65c";
}

.business:before {
  content: "\e65d";
}

.camera_fill:before {
  content: "\e65e";
}

.qr_code_fill:before {
  content: "\e65f";
}

.theme_color_fill:before {
  content: "\e660";
}

.a-bankcard:before {
  content: "\e661";
}

.clock:before {
  content: "\e662";
}

.camera:before {
  content: "\e663";
}

.closed_eye:before {
  content: "\e664";
}

.coupon:before {
  content: "\e665";
}

.copy:before {
  content: "\e666";
}

.code:before {
  content: "\e667";
}

.eye:before {
  content: "\e668";
}

.calendar:before {
  content: "\e669";
}

.edit:before {
  content: "\e658";
}

.business1:before {
  content: "\e66b";
}

.delete:before {
  content: "\e66c";
}

.home:before {
  content: "\e66d";
}

.feedback:before {
  content: "\e66e";
}

.like:before {
  content: "\e66f";
}

.location:before {
  content: "\e670";
}

.notice:before {
  content: "\e671";
}

.good_job:before {
  content: "\e672";
}

.a-IDcard:before {
  content: "\e674";
}

.fire:before {
  content: "\e675";
}

.picture:before {
  content: "\e676";
}

.order:before {
  content: "\e677";
}

.link:before {
  content: "\e678";
}

.refresh:before {
  content: "\e679";
}

.security:before {
  content: "\e67a";
}

.shopping:before {
  content: "\e67b";
}

.scan:before {
  content: "\e67c";
}

.share:before {
  content: "\e67d";
}

.star:before {
  content: "\e66a";
}

.service:before {
  content: "\e67f";
}

.add:before {
  content: "\e680";
}

.theme_color:before {
  content: "\e681";
}

.user_circle:before {
  content: "\e682";
}

.vip:before {
  content: "\e683";
}

.talk:before {
  content: "\e684";
}

.telephone:before {
  content: "\e685";
}

.alarm:before {
  content: "\e686";
}

.cart:before {
  content: "\e687";
}

.setting:before {
  content: "\e689";
}

.picture_split:before {
  content: "\e74d";
}

.select:before {
  content: "\e74a";
}

.plus:before {
  content: "\e748";
}

.minus:before {
  content: "\e749";
}

.search_eliminate:before {
  content: "\e747";
}

.backspace:before {
  content: "\e746";
}

.keyboard:before {
  content: "\e745";
}
</style>
