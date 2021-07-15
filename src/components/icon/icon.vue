<template>
  <i :class="[_.icon, _[name]]" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
  import { defineComponent } from '@/utils';

  const icons = [
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
    'qr_code',
    'picture',
    'popup_close',
    'order',
    'return',
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
  @font-face {
    font-family: 'd-icon';  /* Project id 2653829 */
    src: url('//at.alicdn.com/t/font_2653829_0wdqomj1rtg.woff2?t=1626147012941') format('woff2'),
        url('//at.alicdn.com/t/font_2653829_0wdqomj1rtg.woff?t=1626147012941') format('woff'),
        url('//at.alicdn.com/t/font_2653829_0wdqomj1rtg.ttf?t=1626147012941') format('truetype');
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

  .add:before {
    content: "\e722";
  }

  .camera:before {
    content: "\e723";
  }

  .calendar:before {
    content: "\e724";
  }

  .close:before {
    content: "\e725";
  }

  .clock:before {
    content: "\e726";
  }

  .cart:before {
    content: "\e727";
  }

  .copy:before {
    content: "\e728";
  }

  .closed_eye:before {
    content: "\e729";
  }

  .eye:before {
    content: "\e72a";
  }

  .coupon:before {
    content: "\e72b";
  }

  .edit:before {
    content: "\e72c";
  }

  .delete:before {
    content: "\e72d";
  }

  .feedback:before {
    content: "\e72e";
  }

  .good_job:before {
    content: "\e72f";
  }

  .more:before {
    content: "\e730";
  }

  .like:before {
    content: "\e731";
  }

  .fire:before {
    content: "\e732";
  }

  .location:before {
    content: "\e733";
  }

  .home:before {
    content: "\e734";
  }

  .link:before {
    content: "\e735";
  }

  .notice:before {
    content: "\e736";
  }

  .qr_code:before {
    content: "\e737";
  }

  .picture:before {
    content: "\e738";
  }

  .popup_close:before {
    content: "\e739";
  }

  .order:before {
    content: "\e73a";
  }

  .return:before {
    content: "\e73b";
  }

  .refresh:before {
    content: "\e73c";
  }

  .search:before {
    content: "\e73d";
  }

  .scan:before {
    content: "\e73e";
  }

  .service:before {
    content: "\e73f";
  }

  .star:before {
    content: "\e740";
  }

  .telephone:before {
    content: "\e741";
  }

  .setting:before {
    content: "\e742";
  }

  .user_circle:before {
    content: "\e743";
  }

  .theme_color:before {
    content: "\e744";
  }

  .copy_fill:before {
    content: "\e70e";
  }

  .cart_fill:before {
    content: "\e70f";
  }

  .edit_fill:before {
    content: "\e710";
  }

  .calendar_fill:before {
    content: "\e711";
  }

  .coupon_fill:before {
    content: "\e712";
  }

  .like_fill:before {
    content: "\e713";
  }

  .eye_fill:before {
    content: "\e714";
  }

  .home_fill:before {
    content: "\e715";
  }

  .good_job_fill:before {
    content: "\e716";
  }

  .location_fill:before {
    content: "\e717";
  }

  .fire_fill:before {
    content: "\e718";
  }

  .qr_code_fill:before {
    content: "\e719";
  }

  .theme_color_fill:before {
    content: "\e71a";
  }

  .setting_fill:before {
    content: "\e71b";
  }

  .delete_fill:before {
    content: "\e71c";
  }

  .telephone_fill:before {
    content: "\e71d";
  }

  .user_circle_fill:before {
    content: "\e71e";
  }

  .camera_fill:before {
    content: "\e71f";
  }

  .star_fill:before {
    content: "\e720";
  }

  .notice_fill:before {
    content: "\e721";
  }
</style>
