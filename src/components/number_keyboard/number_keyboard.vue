<template>
  <div
    v-bind="$attrs"
    v-on="$listeners"
    ref="numberKeyboard"
    :class="[_['number-keyboard'],
    title && _['width-title'],
    show && _['number-keyboard-show'],
    !show && _['number-keyboard-hide']]">

    <div :class="_.header" v-if="title || closeButtonText">
      <span :class="_.title" v-if="title">{{title}}</span>
      <button :class="_.close" @click.prevent="finish" v-if="closeButtonText">{{closeButtonText}}</button>
    </div>

    <div :class="theme === 'custom' ? _.right : _.def">
      <div :class="_.keys" v-if="listKeys.length">
        <div :class="_.key" v-for="(item, index) in listKeys" :key="index">
          <div v-html="item.value"
               ref="key"
               @mouseup="e => {unselect(e)}"
               @mousedown.prevent.stop="e => {select(e, item)}"
               @touchstart.prevent.stop="e => {select(e, item)}"
               @touchend="e => {unselect(e)}">
          </div>
        </div>
      </div>
      <div :class="_.sidebar" v-if="theme === 'custom'">
        <div :class="_.del">
          <button @mouseup="e => {unselect(e)}"
                  @mousedown.prevent.stop="e => {select(e, {dsc: 'del'})}"
                  @touchstart.prevent.stop="e => {select(e, {dsc: 'del'})}"
                  @touchend="e => {unselect(e)}">
            <svg t="1625792621561" :class="_.icon"
                 style="width: 34px;height: 24px;"
                 viewBox="0 0 1450 1024"
                 version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 p-id="2435">
              <path
                d="M1238.741333 42.112a170.666667 170.666667 0 0 1 170.666667 170.666667v592.426666a170.666667 170.666667 0 0 1-170.666667 170.666667H492.16a85.333333 85.333333 0 0 1-60.032-24.746667l-384-380.458666L42.666667 564.821333a85.333333 85.333333 0 0 1 5.205333-115.2l384.085333-382.634666a85.333333 85.333333 0 0 1 60.245334-24.874667z m0 85.333333H492.245333l-384.085333 382.592 384 380.501334h746.581333a85.333333 85.333333 0 0 0 85.333334-85.333334V212.778667a85.333333 85.333333 0 0 0-85.333334-85.333334zM704.384 304.042667l4.053333 3.498666 145.92 144.256 145.962667-144.213333 4.053333-3.541333A42.666667 42.666667 0 0 1 1060.266667 368.213333l-145.237334 143.530667 145.237334 143.616a42.666667 42.666667 0 0 1-55.936 64.213333l-4.053334-3.541333-145.92-144.298667-145.92 144.298667-4.096 3.541333a42.666667 42.666667 0 0 1-55.936-64.213333l145.237334-143.616-145.237334-143.530667a42.666667 42.666667 0 0 1 55.936-64.213333z"
                fill="#333333" p-id="2436">
              </path>
            </svg>
          </button>
        </div>
        <div :class="_.accomplish">
          <button @mouseup="e => {unselect(e)}"
                  @mousedown.prevent.stop="accomplish"
                  @touchstart.prevent.stop="accomplish"
                  @touchend="e => {unselect(e)}">完成
          </button>
        </div>
      </div>

    </div>
    <!--带右侧栏的键盘-->
    <div :class="_.right" v-if="false">
      <div :class="_.keys" v-if="listKeys.length">
        <div :class="_.key" v-for="(item, index) in listKeys" :key="index">
          <div v-html="item.value"
               ref="key"
               @mouseup="e => {unselect(e)}"
               @mousedown.prevent.stop="e => {select(e, item)}"
               @touchstart.prevent.stop="e => {select(e, item)}"
               @touchend="e => {unselect(e)}">
          </div>
        </div>
      </div>
      <div :class="_.sidebar">
        <div :class="_.del">
          <button @mouseup="e => {unselect(e)}"
                  @mousedown.prevent.stop="e => {select(e, {dsc: 'del'})}"
                  @touchstart.prevent.stop="e => {select(e, {dsc: 'del'})}"
                  @touchend="e => {unselect(e)}">
            <svg t="1625792621561" :class="_.icon"
                 style="width: 34px;height: 24px;"
                 viewBox="0 0 1450 1024"
                 version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 p-id="2435">
              <path
                d="M1238.741333 42.112a170.666667 170.666667 0 0 1 170.666667 170.666667v592.426666a170.666667 170.666667 0 0 1-170.666667 170.666667H492.16a85.333333 85.333333 0 0 1-60.032-24.746667l-384-380.458666L42.666667 564.821333a85.333333 85.333333 0 0 1 5.205333-115.2l384.085333-382.634666a85.333333 85.333333 0 0 1 60.245334-24.874667z m0 85.333333H492.245333l-384.085333 382.592 384 380.501334h746.581333a85.333333 85.333333 0 0 0 85.333334-85.333334V212.778667a85.333333 85.333333 0 0 0-85.333334-85.333334zM704.384 304.042667l4.053333 3.498666 145.92 144.256 145.962667-144.213333 4.053333-3.541333A42.666667 42.666667 0 0 1 1060.266667 368.213333l-145.237334 143.530667 145.237334 143.616a42.666667 42.666667 0 0 1-55.936 64.213333l-4.053334-3.541333-145.92-144.298667-145.92 144.298667-4.096 3.541333a42.666667 42.666667 0 0 1-55.936-64.213333l145.237334-143.616-145.237334-143.530667a42.666667 42.666667 0 0 1 55.936-64.213333z"
                fill="#333333" p-id="2436">
              </path>
            </svg>
          </button>
        </div>
        <div :class="_.accomplish">
          <button @mouseup="e => {unselect(e)}"
                  @mousedown.prevent.stop="accomplish"
                  @touchstart.prevent.stop="accomplish"
                  @touchend="e => {unselect(e)}">完成
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {defineComponent} from '@/utils';

  export default defineComponent({
    name: 'NumberKeyboard',
    props: {
      value: {
        type: String,
        default: '',
        desc: '当前输入值'
      },
      hideOnClickOutside: {
        type: Boolean,
        default: true,
        desc: '点击外部时是否收起键盘'
      },
      show: {
        type: Boolean,
        default: false,
        desc: '是否显示键盘'
      },
      extraKey: {
        type: [String, Array],
        default: '',
        desc: '额外按键的内容'
      },
      theme: {
        type: String,
        default: 'def',
        desc: '样式风格，可选值为 custom'
      },
      title: {
        type: String,
        default: '',
        desc: '键盘标题,空则不展示'
      },
      closeButtonText	: {
        type: String,
        default: '',
        desc: '关闭按钮文字，空则不展示'
      },
      randomKey: {
        type: Boolean,
        default: false,
        desc: '是否将通过随机顺序展示按键'
      }
    },
    emits: {
      close: {
        desc: '点击关闭按钮时触发'
      },
      delete: {
        desc: '点击删除键时触发'
      },
      blur: {
        desc: '点击关闭按钮或非键盘区域时触发'
      },
      select: {
        desc: '点击按键时触发',
        payload: {
          key: {
            type: String,
            desc: 'key: 按键内容'
          }
        }
      },
    },
    data() {
      return {
        inputVal: this.value,
        randomKeyList: [],
        listRight: [
          {
            value: 1
          },
          {
            value: 2
          },
          {
            value: 3
          },
          {
            value: 4
          },
          {
            value: 5
          },
          {
            value: 6
          },
          {
            value: 7
          },
          {
            value: 8
          },
          {
            value: 9
          },
          {
            value: 0
          },
          {
            value: '.'
          }
        ],
        list: [
          {
            value: 1
          },
          {
            value: 2
          },
          {
            value: 3
          },
          {
            value: 4
          },
          {
            value: 5
          },
          {
            value: 6
          },
          {
            value: 7
          },
          {
            value: 8
          },
          {
            value: 9
          },
          {
            value: '<svg t="1625792978398" class="' + this.$style.icon + '" style="width: 34px;height: 24px;" ' +
              'viewBox="0 0 1280 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2562">' +
              '<path d="M759.338667 874.282667L629.12 1024l-130.986667-149.717333h261.205334zM1194.666667 0a85.333333 85.' +
              '333333 0 0 1 85.333333 85.333333v640a85.333333 85.333333 0 0 1-85.333333 85.333334H85.333333a85.333333 85.' +
              '333333 0 0 1-85.333333-85.333334V85.333333a85.333333 85.333333 0 0 1 85.333333-85.333333h1109.333334z m0 85.' +
              '333333H85.333333v640h1109.333334V85.333333z m-256 469.333334v85.333333H341.333333v-85.333333h597.333334z m170.' +
              '666666 0v85.333333h-85.333333v-85.333333h85.333333zM256 554.666667v85.333333H170.666667v-85.333333h85.333333z m85.' +
              '333333-213.333334v85.333334H170.666667V341.333333h170.666666z m170.666667 0v85.333334h-85.333333V341.333333h85.' +
              '333333z m170.666667 0v85.333334h-85.333334V341.333333h85.333334z m170.666666 0v85.333334h-85.333333V341.333333h85.' +
              '333333z m256-213.333333v298.666667h-170.666666V341.333333h85.333333V128h85.333333zM256 128v85.333333H170.' +
              '666667V128h85.333333z m170.666667 0v85.333333H341.333333V128h85.333334z m170.666666 0v85.333333h-85.' +
              '333333V128h85.333333z m170.666667 0v85.333333h-85.333333V128h85.333333z m170.666667 0v85.333333h-85.' +
              '333334V128h85.333334z" fill="#333333" p-id="2563"></path></svg>',
            dsc: 'accomplish'
          },
          {
            value: 0
          },
          {
            value: '<svg t="1625792621561" class="' + this.$style.icon + '" style="width: 34px;height: 24px;" viewBox="0 0 1450 1024"' +
              ' version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2435">' +
              '<path d="M1238.741333 42.112a170.666667 170.666667 0 0 1 170.666667 170.666667v592.426666a170.666667 170.666667 0 0 1-170.' +
              '666667 170.666667H492.16a85.333333 85.333333 0 0 1-60.032-24.746667l-384-380.458666L42.666667 564.821333a85.333333 85.' +
              '333333 0 0 1 5.205333-115.2l384.085333-382.634666a85.333333 85.333333 0 0 1 60.245334-24.874667z m0 85.333333H492.245333l-384.' +
              '085333 382.592 384 380.501334h746.581333a85.333333 85.333333 0 0 0 85.333334-85.333334V212.778667a85.333333 85.333333 0 0 0-85.' +
              '333334-85.333334zM704.384 304.042667l4.053333 3.498666 145.92 144.256 145.962667-144.213333 4.053333-3.541333A42.666667 42.' +
              '666667 0 0 1 1060.266667 368.213333l-145.237334 143.530667 145.237334 143.616a42.666667 42.666667 0 0 1-55.936 64.213333l-4.' +
              '053334-3.541333-145.92-144.298667-145.92 144.298667-4.096 3.541333a42.666667 42.666667 0 0 1-55.936-64.213333l145.237334-143.' +
              '616-145.237334-143.530667a42.666667 42.666667 0 0 1 55.936-64.213333z" fill="#333333" p-id="2436"></path></svg>',
            dsc: 'del'
          }
        ]
      }
    },
    watch: {
      show (newVal) {
        if (this.hideOnClickOutside) {
          if (newVal) {
            document.body.addEventListener('mousedown', this.blurFn)
            document.body.addEventListener('touchstart', this.blurFn)
          } else {
            document.body.removeEventListener('mousedown', this.blurFn)
            document.body.removeEventListener('touchstart', this.blurFn)
          }
        }
      },
      value(newValue) {
        this.inputVal = newValue
      },
      inputVal(newValue) {
        this.$emit('input', newValue)
      }
    },
    computed: {
      listKeys() {
        if (this.randomKey) { // 随机
          // 不是右侧栏
          if (this.theme !== 'custom') {
            let arr = this.randomKeyList
            if (arr.length !== 12) {
              arr.splice(9, 0, this.getExtraKey())
              arr.splice(11, 0, '刪除')
            }
            return arr.map((item, index) => {
              let data = {
                value: item
              }
              if (index === 9 && !this.extraKey) {
                data.value = this.closeSvg()
                data.dsc = 'close'
              } else if (index === 9 && this.extraKey) {
                data.dsc = 'extraKey'
              }
              if (index === 11) {
                data.value = '<svg t="1625792621561" class="' + this.$style.icon + '" style="width: 34px;height: 24px;" viewBox="0 0 1450 1024"' +
                  ' version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2435">' +
                  '<path d="M1238.741333 42.112a170.666667 170.666667 0 0 1 170.666667 170.666667v592.426666a170.666667 170.666667 0 0 1-170.' +
                  '666667 170.666667H492.16a85.333333 85.333333 0 0 1-60.032-24.746667l-384-380.458666L42.666667 564.821333a85.333333 85.' +
                  '333333 0 0 1 5.205333-115.2l384.085333-382.634666a85.333333 85.333333 0 0 1 60.245334-24.874667z m0 85.333333H492.245333l-384.' +
                  '085333 382.592 384 380.501334h746.581333a85.333333 85.333333 0 0 0 85.333334-85.333334V212.778667a85.333333 85.333333 0 0 0-85.' +
                  '333334-85.333334zM704.384 304.042667l4.053333 3.498666 145.92 144.256 145.962667-144.213333 4.053333-3.541333A42.666667 42.' +
                  '666667 0 0 1 1060.266667 368.213333l-145.237334 143.530667 145.237334 143.616a42.666667 42.666667 0 0 1-55.936 64.213333l-4.' +
                  '053334-3.541333-145.92-144.298667-145.92 144.298667-4.096 3.541333a42.666667 42.666667 0 0 1-55.936-64.213333l145.237334-143.' +
                  '616-145.237334-143.530667a42.666667 42.666667 0 0 1 55.936-64.213333z" fill="#333333" p-id="2436"></path></svg>',
                  data.dsc = 'del'
              }
              return data
            })
          } else {
            let arr = this.randomKeyList
            arr.splice(9, 0, this.extraKey.getExtraKey())
            return arr.map((item, index) => {
              let data = {
                value: item
              }
              if (index === 9 && !this.extraKey) {
                data.value = this.closeSvg()
                data.dsc = 'close'
              } else if (index === 9 && this.extraKey) {
                data.dsc = 'extraKey'
              }
              return data
            })
          }
        }
        // 不是右侧栏
        if (this.theme !== 'custom') {
          if (this.extraKey) {
            this.list[9].value = this.getExtraKey()
            delete this.list[9].dsc
          } else {
            this.list[9].value = this.closeSvg()
          }
          return this.list
        } else {
          if (this.extraKey) {
            this.listRight[10].value = this.getExtraKey()
            delete this.listRight[10].dsc
          } else {
            this.listRight[10].value = this.closeSvg()
          }
          return this.listRight
        }
      }
    },
    mounted() {
      if (this.randomKey) {
        let arr = []
        while (arr.length < 10) {
          let num = Math.floor(Math.random() * 10);
          if (arr.indexOf(num) === -1) {
            arr.push(num)
          }
        }
        this.randomKeyList = arr
      }
    },
    methods: {
      getExtraKey () {
        if (this.extraKey instanceof Array) {
          return this.extraKey.join('')
        } else {
          return this.extraKey
        }
      },
      blurFn (e) {
        if (e.target.className.indexOf('number_keyboard') === -1) {
          this.$emit('blur')
        }
      },
      closeSvg() {
        return '<svg t="1625792978398" class="' + this.$style.icon + '" style="width: 34px;height: 24px;" viewBox="0 0 1280 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2562">' +
          '<path d="M759.338667 874.282667L629.12 1024l-130.986667-149.717333h261.205334zM1194.666667 0a85.333333 85.' +
          '333333 0 0 1 85.333333 85.333333v640a85.333333 85.333333 0 0 1-85.333333 85.333334H85.333333a85.333333 85.' +
          '333333 0 0 1-85.333333-85.333334V85.333333a85.333333 85.333333 0 0 1 85.333333-85.333333h1109.333334z m0 85.' +
          '333333H85.333333v640h1109.333334V85.333333z m-256 469.333334v85.333333H341.333333v-85.333333h597.333334z m170.' +
          '666666 0v85.333333h-85.333333v-85.333333h85.333333zM256 554.666667v85.333333H170.666667v-85.333333h85.333333z m85.' +
          '333333-213.333334v85.333334H170.666667V341.333333h170.666666z m170.666667 0v85.333334h-85.333333V341.333333h85.' +
          '333333z m170.666667 0v85.333334h-85.333334V341.333333h85.333334z m170.666666 0v85.333334h-85.333333V341.333333h85.' +
          '333333z m256-213.333333v298.666667h-170.666666V341.333333h85.333333V128h85.333333zM256 128v85.333333H170.' +
          '666667V128h85.333333z m170.666667 0v85.333333H341.333333V128h85.333334z m170.666666 0v85.333333h-85.' +
          '333333V128h85.333333z m170.666667 0v85.333333h-85.333333V128h85.333333z m170.666667 0v85.333333h-85.' +
          '333334V128h85.333334z" fill="#333333" p-id="2563"></path></svg>'
      },
      finish () {
        this.$emit('blur')
        this.$emit('close')
      },
      accomplish(e) {
        e.target.className = this.$style['accomplish-active']
        this.close(e)
      },
      unselect(e) {
        if (e.target.nodeName === 'svg') {
          e.target.parentNode.className = ''
        } else if (e.target.nodeName === 'path') {
          e.target.parentNode.parentNode.className = ''
        } else {
          e.target.className = ''
        }
      },
      close(e) {
        this.finish()
        setTimeout(() => {
          if (e.target.nodeName === 'svg') {
            e.target.parentNode.className = ''
          } else if (e.target.nodeName === 'path') {
            e.target.parentNode.parentNode.className = ''
          } else {
            e.target.className = ''
          }
        }, 200)
      },
      select(e, info, index) {
        this.$refs.key.map(item => {
          item.className = ''
        })
        if (e.target.nodeName === 'svg') {
          e.target.parentNode.className = this.$style.active
        } else if (e.target.nodeName === 'path') {
          e.target.parentNode.parentNode.className = this.$style.active
        } else {
          e.target.className = this.$style.active
        }
        if (info.dsc === 'close' || info.dsc === 'accomplish') {
          this.close(e)
          return
        }
        if (info.dsc === 'del') {
          this.inputVal = this.inputVal.substring(0, this.inputVal.length - 1)
          this.$emit('delete')
          return
        }
        if (!info.dsc) {
          this.inputVal += info.value
          this.$emit('select', info.value.toString())
        }
        if (info.dsc === 'extraKey') {
          this.inputVal += this.extraKey.toString()
          this.$emit('select', this.extraKey)
        }
      }
    }
  });
</script>

<style lang="scss" module>
  .number-keyboard {
    &-show {
      -webkit-animation: fadelogIn .4s;
      animation: fadelogIn .4s;
      color: rgba(70, 81, 102, 1);
      height: auto;
    }

    &-hide {
      padding: 0;
      height: 0;
      display: none;
    }
    @keyframes fadelogIn {
      0% {
        margin-bottom: -600px;
      }
      100% {
        margin-bottom: 0;
        -webkit-transform: none;
        transform: none;
      }
    }
    &.width-title {
      border-radius: 20px 20px 0 0;
    }
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #E9E9E9;
    z-index: 0;
    padding-bottom: 22px;
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: content-box;
      height: 34px;
      padding: 16px 0 10px;
      position: relative;
      .title{
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 25px;
      }
      .close {
        position: absolute;
        right: 0;
        height: 100%;
        padding: 0 16px;
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-size: 17px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FF960A;
        line-height: 24px;
      }
    }
    .keys {
      display: flex;
      flex: 3;
      flex-wrap: wrap;
      padding-top: 6px;
      padding-left: 6px;
      .key {
        position: relative;
        flex: 1;
        flex-basis: 33%;
        box-sizing: border-box;
        padding: 0 6px 6px 0;
        align-items: center;
        justify-content: center;
        text-align: center;
        cursor: pointer;

        div {
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 44px;
          font-size: 28px;
          border-radius: 6px;
          line-height: 1.5;
        }
      }
    }
    .active {
      background-color: #ebedf0 !important;
    }
    .accomplish-active {
      background-color: #d57d08 !important;
    }
    .icon {
      width: 30px;
    }
    .right {
      display: flex;
      .keys {
        .key {
          &:nth-last-child(2) {
            flex-basis: 66%;
          }
        }
      }
      .sidebar {
        flex: 1;
        .del, .accomplish {
          position: relative;
          box-sizing: border-box;
          padding: 6px 6px 3px 0;
          height: 50%;
          button {
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            border: 0;
            background: white;
            width: 100%;
            height: 100%;
          }
        }
        .del {
          height: 52px;
        }
        .accomplish {
          padding-top: 3px;
          height: calc(100% - 58px);
          padding-bottom: 0;
          button {
            color: white;
            font-size: 16px;
            background: #FF960A;
          }
        }
      }
    }
  }
</style>
