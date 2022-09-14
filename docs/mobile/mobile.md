<template>
  <div id="mobile"
       style="width: 100%;
       height: 100%;
       position: fixed;
       left: 0;
       top: 0;
       margin: 0;
       z-index: 999999;
       background: #fff;
       overflow-y: scroll;
       box-sizing: border-box;
       ">
    <demo
      v-if="isIframe"
    ></demo>
    <ul class="menu-list" v-if="!mobileIframe && !isIframe && initTo">
      <li v-for="item in list" @click="showDemo(item)"><span>{{item.title}}</span><d-icon name="arrow_right" /></li>
    </ul>
    <div class="loading" v-if="mask">
      <DemoLoadingDirection/>
    </div>
  </div>
  
</template>

<script>
  import router from './router.js'
  let list = []
  Object.keys(router).map(key => {
    if (key.indexOf('.html#') !== -1) {
      list.push({
        title: key.replace('.html#', '-'),
        key,
        routerName: router[key]
      })
    } 
  })
  let routerName = '';
  if(typeof window == 'object') {
    let href = parent.document.getElementById("mobile-demo") ? parent.document.getElementById("mobile-iframe").contentWindow.location.href : window.location.href
    let nowRoute = href.split('routerName=')[1]
    routerName = router[decodeURI(nowRoute)]
  }
  export default {
    name: 'test',
    components: {
      'demo': typeof demos == 'object' ? demos[routerName] : ''
    },
    data() {
      return {
        initTo: false,
        mask: true,
        mobileIframe: '',
        isIframe: 0,
        list
      }
    },
    mounted() {
      if (typeof window == 'object') {
        this.mobileIframe = parent.document.getElementById("mobile-demo")
        this.menuKey = this.getQueryString('menuKey')
        if (this.mobileIframe || this.menuKey) {
          this.isIframe = 1
        }
        let meta = document.createElement('meta')
        meta.name = 'viewport'
        meta.content = 'width=device-width, maximum-scale=1, user-scalable=no'
        document.head.appendChild(meta)
        document.getElementById('mobile').parentNode.parentNode.style.padding = 0
        this.$nextTick(() => {
          setTimeout(() => {
            this.mask = false
            this.initTo = true
          }, 200)
        })
      } 
    },
    methods: {
      getQueryString (name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        if(typeof window != 'undefined') {
          let r = window.location.search.substr(1).match(reg);
          if (r != null) {
            return unescape(r[2]);
          }
        }
        return null;
      },
      showDemo (info) {
        if(typeof window != 'undefined') {
          window.location.href = window.location.origin + '/dcb-ui/v0/mobile/mobile.html?&menuKey='+ info.title +'&routerName=' + info.key
        }
      }
    }
  };
</script>
<style>
  #mobile::-webkit-scrollbar {
    display: none
  }
  .menu-list{
    padding: 0;
  }
  .menu-list > li{
    display: flex;
    align-items: center;
    justify-content:space-between;
    padding: 8px;
    border-bottom: 1px solid #ccc;
    color: #323233;
    font-weight: 600;
    font-size: 14px;
    line-height: 40px;
    background: #f7f8fa;
  }
  #mobile > .loading{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
