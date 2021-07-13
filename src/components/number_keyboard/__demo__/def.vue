<template>
  <div class="test">
    <ul class="card">
      <li @click.stop.prevent="showFn(1)"><span>弹出默认键盘</span>
        <d-icon name="return"/>
      </li>
      <li @click.stop.prevent="showFn(2)"><span>弹出带右侧栏键盘</span>
        <d-icon name="return"/>
      </li>
      <li @click.stop.prevent="showFn(3)"><span>弹出身份证号键盘</span>
        <d-icon name="return"/>
      </li>
      <li @click.stop.prevent="showFn(4)"><span>弹出带标题键盘</span>
        <d-icon name="return"/>
      </li>
      <li @click.stop.prevent="showFn(5)"><span>弹出随机键盘</span>
        <d-icon name="return"/>
      </li>
      <li @click.stop.prevent="showFn(6)"><span>弹出配置多个按键的键盘</span>
        <d-icon name="return"/>
      </li>
      <li @click.stop.prevent="showFn(7)"><span>双向绑定<input placeholder="点此输入" readonly v-model="text"/></span></li>
    </ul>
    <d-number-keyboard @blur="show1 = false" @close="show1 = false" :show="show1"></d-number-keyboard>
    <d-number-keyboard extraKey="." @close="show2 = false" :show="show2" theme="custom"></d-number-keyboard>
    <d-number-keyboard extraKey="X" closeButtonText="完成" @close="show3 = false" :show="show3"></d-number-keyboard>
    <d-number-keyboard title="标题" closeButtonText="完成" @close="show4 = false" extraKey="."
                       :show="show4"></d-number-keyboard>
    <d-number-keyboard :show="show5" @close="show5 = false" :randomKey="true"></d-number-keyboard>
    <d-number-keyboard :extraKey="['0','0']" closeButtonText="完成" @close="show6 = false" :show="show6"
                       :randomKey="false"></d-number-keyboard>
    <d-number-keyboard v-model="text" @close="show7 = false" closeButtonText="完成" @select="select" :extraKey="['0','0']"
                       :show="show7" :randomKey="true"></d-number-keyboard>
  </div>
</template>
<!--test-->
<script>
  export default {
    name: "test",
    components: {},
    data() {
      return {
        text: '',
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        show6: false,
        show7: false
      }
    },
    mounted() {
    },
    methods: {
      select(val) {
        console.log(val)
      },
      showFn(key) {
        [1, 2, 3, 4, 5, 6, 7].map(key => {
          this['show' + key] = false
        })
        this['show' + key] = true
      },
      close() {
        [1, 2, 3, 4, 5, 6, 7].map(key => {
          this['show' + key] = false
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .test {
    height: 643px;
    .d-icon {
      transform: rotate(180deg);
    }
    .card {
      background: #FFFFFF;
      border-radius: 8px;
      padding: 0 12px;
      margin: 0;
      li {
        list-style: none;
        cursor: pointer;
        padding: 8px 0;
        border-bottom: 1px solid #ebedf0;
        &:last-child {
          border-bottom: 0;
        }
        span {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 20px;
        }
      }
    }
    input {
      margin-left: 10px;
      border: 0;
      outline: none;
      cursor: pointer;
    }
  }
</style>
