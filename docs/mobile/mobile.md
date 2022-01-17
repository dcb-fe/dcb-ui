<template>
  <div id="mobile"
       style="width: 100%;
       height: 100%;
       position: fixed;
       left: 0;
       top: 0;
       margin: 0;
       z-index: 999999;
       padding: 16px;
       border-radius: 12px;
       background: #fff;
       overflow-y: scroll;
       box-sizing: border-box;
       ">
    <demo
      v-if="isIframe"
    ></demo>
    <ul class="menu-list" v-else>
      <li v-for="item in list" @click="showDemo(item)"><span>{{item.title}}</span><d-icon name="arrow_right" /></li>
    </ul>
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
  let getQueryString = (name) => {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    if(typeof window != 'undefined') {
      let r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
    }
    return null;
  }
  let routerName = '';
  let menuKey = '';
  let mobileIframe = '';
  if(typeof window != 'undefined') {
    let href = parent.document.getElementById("mobile-demo") ? parent.document.getElementById("mobile-iframe").contentWindow.location.href : window.location.href
    let nowRoute = href.split('routerName=')[1]
    routerName = router[decodeURI(nowRoute)] || getQueryString('routerName')
    menuKey = getQueryString('menuKey')
    mobileIframe = parent.document.getElementById("mobile-demo")
  }
  export default {
    name: 'test',
    components: {
      'demo': demos[routerName]
    },
    data() {
      return {
        isIframe: mobileIframe || menuKey ? 1: 0,
        list
      }
    },
    mounted() {
      let meta = document.createElement('meta')
      meta.name = 'viewport'
      meta.content = 'width=device-width, maximum-scale=1, user-scalable=no'
      document.head.appendChild(meta)
      document.getElementById('mobile').parentNode.parentNode.style.padding = 0
    },
    methods: {
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
</style>
