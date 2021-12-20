<template>
  <div :class="_.swiper" >
    <div :ref="ref"
         :class="_.wrapper"
         @touchstart="swiperOnMouseDown"
         @touchmove = "swiperOnMouseMove"
         @touchend ="randomDelay(swiperOnMouseUp,$event)"
         @mousedown="swiperOnMouseDown"
         @mousemove="swiperOnMouseMove"
         @mouseleave="randomDelay(swiperOnMouseUp,$event)"
         @mouseup="randomDelay(swiperOnMouseUp,$event)"
    >
      <slot></slot>
    </div>
    <span v-show="showIndicators&&!indicatorIsCustom"
          :class="[
            _.cleanFix,
            _[indicatorPosition],
            _.indicators,
            ]"
          @click="nextPage">
      <i v-for="count in (options.elementTotal-2)"
         :key="count"
         :class="[
           _.indicator_item,
           indicatorIndex === (count-1)&& (indicatorPosition ==='bottom'||indicatorPosition ==='top') ?_.indicator_item_active:null,
           indicatorIndex === (count-1)&& (indicatorPosition ==='right'||indicatorPosition ==='left') ?_.indicator_item_active_vertical:null
           ]"></i>
    </span>
    <slot name="indicator"></slot>
  </div>
</template>

<script>
import {defineComponent} from '@/utils';


export default defineComponent({
  name: 'Swipe',
  props: {
    autoplay: {
      type: Number,
      default: 2800,
      desc: '自动轮播间隔，单位为 ms',
    },
    duration: {
      type: Number,
      default: 1400,
      desc: '动画时长，单位为 ms',
    },
    initialSwipe: {
      type: Number,
      default: 1,
      desc: '初始位置索引值',
    },
    width: {
      type: String,
      enum: ['number', 'string'],
      default: '未完成',
      desc: '滑块宽度，单位为px',
    },
    height: {
      type: String,
      enum: ['number', 'string'],
      default: '未完成',
      desc: '滑块高度，单位为px',
    },
    loop: {
      type: Boolean,
      default: false,
      desc: '是否开启循环播放',
    },
    showIndicators: {
      type: Boolean,
      default: true,
      desc: '是否显示指示器',
    },
    vertical: {
      type: Boolean,
      default: false,
      desc: '是否为纵向滚动',
    },
    indicatorPosition: {
      type: String,
      enum: ['left', 'right', 'top', 'bottom'],
      default: 'bottom',
      desc: '指示器位置',
    }
  },
  emits: {
    change: {
      desc: '页面改变时触发',
      payload: {
        val: {
          type: Number,
          desc: '当前页面索引',
        },
        allPages: {
          type: Number,
          desc: '页面索引总数',
        },
      },
    },
  },
  slots: {
    indicator: {
      desc: '自定义指示器内容',
    },
  },
  data() {
    return {
      ref: '',
      options: {
        offset:'',
        loopStep: '',
        initialSwipe: 1,
        elementTotal: 2,
        swiperThreshold: 0.4,
        touchResponseTime: 5,
        swiperReturn: false,
        touchUpStatus: true,
        TestSPentTimeStar: 0,
        tempNodeRight: null,
        tempNodeLeft: null,
        timer:'',
        style: {
          width: '',
          padding: ''
        }
      },
      clickStarPointer: 0,
      clickEndPointer:0,
      lastTouchTimeStamp: 0,
      nowPositionPoint: null,
      idOfTimeOut: '',
      onmousedown: false,
      transitionDuration: true,
      moveDistanceAll:0,
      touchDirect:'Next'
    }
  },
  computed:{
    nextInitialSwipe(){
      if (this.options.initialSwipe === this.options.elementTotal-1) return 0
      return this.options.initialSwipe + 1
    },
    preInitialSwipe(){
      if (this.options.initialSwipe === 0) return this.options.elementTotal - 2
      return this.options.initialSwipe - 1
    },
    transitionDurationTime(){
      if (this.onmousedown)return 5
      return this.duration
    },
    indicatorIndex(){
      let result
      if (this.options.initialSwipe === 0) result = this.$el.children[1].children.length-1
      else if (this.options.initialSwipe === this.options.elementTotal - 1) result = 0
      else result = this.options.initialSwipe - 1
      this.$emit('change',result+1,this.options.elementTotal-2)
      return result
    },
    indicatorIsCustom(){
      return this.$slots.indicator
    },
  },
  watch:{
    'options.initialSwipe':{//深度监听，可监听到对象、数组的变化
      handler(val){
        // console.log('options.initialSwipe Change',val,oldVal)
        if (this.touchDirect === 'Next') {
          if (val !== 1) this.nextPage()
        }
        else this.prevPage()
      },
      deep:true
    },
    onmousedown:function (val) {
      if (val){
        clearInterval(this.options.timer)
      }
      else if (this.loop){
        this.options.timer = setInterval(()=>{
          this.options.initialSwipe = this.nextInitialSwipe
        },this.autoplay)
      }

    }
  },
  mounted() {
    this.ref = `swiper-${Math.ceil(Math.random() * 10000)}`
    this.$nextTick(() => {
      this.options.tempNodeLeft = this.$refs[this.ref].children[0]
      this.options.tempNodeRight = this.$refs[this.ref].children[this.$refs[this.ref].children.length - 1]
      const firstNode = this.options.tempNodeLeft.cloneNode(true)
      const lastNode = this.options.tempNodeRight.cloneNode(true)
      this.$refs[this.ref].appendChild(firstNode)
      this.$refs[this.ref].insertBefore(lastNode,this.options.tempNodeLeft)
      // // 获取步长
      this.options.loopStep = (this.vertical ? this.$el.offsetHeight : this.$el.offsetWidth)
      // // 获取子项数量
      this.options.elementTotal = this.$refs[this.ref].children.length
      // // 检测是否纵向
      if (this.vertical) this.$refs[this.ref].style.flexWrap = 'wrap'
      // 检测是否定义指示器位置
      this.setIndicatorPosition()
      // // 初始化当前索引页
      this.options.initialSwipe = this.initialSwipe
      // // 初始动画时间
      // this.$refs[this.ref].style.transitionDuration = `${this.duration}ms`
      // // 检查是否自动播放
      // if (!this.noAutoplay) this.idOfTimeOut = setTimeout(this.nextPage,200)
      this.offset = `-${this.options.initialSwipe * this.options.loopStep}`
      this.nowPositionPoint = this.options.initialSwipe * this.options.loopStep
      this.swipeTranslate(this.offset,0,0)

      if (this.loop){
        this.options.timer =
        setInterval(()=>{
          this.options.initialSwipe = this.nextInitialSwipe
        },this.autoplay)
      }

    })

  },
  methods: {
    setIndicatorPosition(){
      switch (this.indicatorPosition) {
        case 'bottom':
          this.$el.children[1].style.flexWrap = 'nowrap'
          this.$el.children[1].style.width = '100%'
          this.$el.children[1].style.height = '20px'
          break
        case 'left':
          this.$el.children[1].style.flexWrap = 'wrap'
          this.$el.children[1].style.height = '100%'
          this.$el.children[1].style.width = '6px'
          break
        case 'top':
          this.$el.children[1].style.flexWrap = 'nowrap'
          this.$el.children[1].style.width = '100%'
          this.$el.children[1].style.height = '20px'
          break
        case 'right':
          this.$el.children[1].style.flexWrap = 'wrap'
          this.$el.children[1].style.height = '100%'
          this.$el.children[1].style.width = '6px'
          break
        default:
          this.$el.children[1].style.flexWrap = 'nowrap'
          this.$el.children[1].style.width = '100%'
          this.$el.children[1].style.height = '20px'
      }
    },
    async jumpSecondChildren(){
      this.offset = `-${1 * this.options.loopStep}`
      // eslint-disable-next-line no-return-await
      return await this.swipeTranslate(this.offset, 0, 0)
    },
    async jumpSecondLastChildren(){
      this.offset = `-${(this.options.elementTotal-2) * this.options.loopStep}`
      // eslint-disable-next-line no-return-await
      return await this.swipeTranslate(this.offset, 0, 0)
    },
    nextPage(){
      this.offset = `-${this.options.initialSwipe * this.options.loopStep}`
      // 判断下是不是最后一个 是的话跳转
      // console.log('判断下是不是最后一个 是的话跳转',this.options.initialSwipe)
      // console.log('调用nextPAge')
      if (this.nextInitialSwipe === 1){
        this.jumpSecondChildren().then(()=>{
          setTimeout(()=>{
            this.options.initialSwipe = 2
          },10)
        })
      }
      else {
        this.swipeTranslate(this.offset,0,this.duration)
        // setTimeout(()=>{
        //   this.options.initialSwipe = this.nextInitialSwipe
        // },2800)
      }
    },
    resetPage(){
      this.offset = `-${this.options.initialSwipe * this.options.loopStep}`
      // console.log('调用REsetPAge')
      this.swipeTranslate(this.offset,0,this.duration)
    },
    prevPage() {
      this.offset = `-${this.options.initialSwipe * this.options.loopStep}`
      // 判断下是不是最后一个 是的话跳转
      // console.log('prevPage判断下是不是最后一个 是的话跳转',this.options.initialSwipe,this.preInitialSwipe)
      if (this.preInitialSwipe === this.options.elementTotal-3){
        // console.log('是是是:this.preInitialSwipe === 0',this.preInitialSwipe)
        this.jumpSecondLastChildren().then(()=>{
          setTimeout(()=>{
            this.options.initialSwipe = this.options.elementTotal - 2
            // console.log('this.options.initialSwipe',this.options.initialSwipe)
          },10)
        })
      }
      else {
        // console.log('prevPage123')
        this.swipeTranslate(this.offset,0,this.duration)
        // setTimeout(()=>{
        //   this.options.initialSwipe = this.preInitialSwipe
        // },2800)
      }

    },
    async swipeTranslate(offset, starPointer,duration = -1) {
      // console.log('swipeTranslate',offset, starPointer,duration)
      // 判断loop
      if (this.loop){
        if (duration !== -1) {
          // console.log('Has Duration')
          this.$refs[this.ref].style.transitionDuration = `${duration}ms`
        }
        if (this.vertical) {
          this.$refs[this.ref].style.transform = `translateY(${offset}px)`
        } else {
          this.$refs[this.ref].style.transform = `translateX(${offset}px)`
        }
        setTimeout(()=>{
          this.$refs[this.ref].style.transitionDuration = `${this.transitionDurationTime}ms`
        },duration)
        this.clickStarPointer = starPointer
        return true
      }

      console.log('notLoop')
      const minOffset = -(this.options.elementTotal - 2)*this.options.loopStep
      const maxOffset = - 1*this.options.loopStep
      if (offset <= maxOffset && offset >= minOffset){
        if (duration !== -1) {
          // console.log('Has Duration')
          this.$refs[this.ref].style.transitionDuration = `${duration}ms`
        }
        if (this.vertical) {
          this.$refs[this.ref].style.transform = `translateY(${offset}px)`
        } else {
          this.$refs[this.ref].style.transform = `translateX(${offset}px)`
        }
        setTimeout(()=>{
          this.$refs[this.ref].style.transitionDuration = `${this.transitionDurationTime}ms`
        },duration)
        this.clickStarPointer = starPointer
        return true
      }



    },

    sleep(time) {
      const startTime = new Date().getTime() + parseInt(time, 10);
      // eslint-disable-next-line no-empty
      while (new Date().getTime() < startTime) {
      }
    },
    randomDelay(fun,event) {
      setTimeout(fun(event), Math.ceil(Math.random() * 10))
    },
    swiperOnMouseDown(event) {
      //checked
      // console.log('nowIN',this.options.initialSwipe)
      if (this.options.initialSwipe === this.options.elementTotal - 1){
        this.onmousedown = false
        // console.log('jump',this.nextInitialSwipe)
        // console.log('jump1',this.options.initialSwipe)
        this.options.initialSwipe = 1
        this.touchDirect = 'Next'
        this.jumpSecondChildren().then(()=>{
          setTimeout(()=>{
            let tempEvent
            if (event.targetTouches) tempEvent = event.targetTouches[0]
            else tempEvent = event
            this.onmousedown = true
            if (this.vertical) this.clickStarPointer = tempEvent.clientY
            else this.clickStarPointer = tempEvent.clientX
            this.moveDistanceAll = 0
          },10)
        })

      }
      else if(this.options.initialSwipe === 0){
        this.onmousedown = false
        // console.log('jumpPrev',this.nextInitialSwipe)
        // console.log('jumpPrev1',this.options.initialSwipe)
        this.options.initialSwipe = this.options.elementTotal - 2
        this.touchDirect = 'Prev'
        this.jumpSecondLastChildren().then(()=>{
          setTimeout(()=>{
            let tempEvent
            if (event.targetTouches) tempEvent = event.targetTouches[0]
            else tempEvent = event
            this.onmousedown = true
            if (this.vertical) this.clickStarPointer = tempEvent.clientY
            else this.clickStarPointer = tempEvent.clientX
            this.moveDistanceAll = 0
          },10)
        })
      }
      else {
        let tempEvent = ''
        if (event.targetTouches) tempEvent = event.targetTouches[0]
        else tempEvent = event
        this.onmousedown = true
        if (this.vertical) this.clickStarPointer = tempEvent.clientY
        else this.clickStarPointer = tempEvent.clientX
        this.moveDistanceAll = 0
      }


    },
    swiperOnMouseMove(event) {
      // 设置响应时长 优化性能
      // 检测是否按下按键
      // 总长度加上当前长度
      let tempEvent = ''
      const responseStatus = (event.timeStamp - this.lastTouchTimeStamp) > this.options.touchResponseTime
      if (event.targetTouches) tempEvent = event.targetTouches[0]
      else tempEvent = event
      event.preventDefault();
      // console.log('TouchMove',(this.options.initialSwipe))
      if (responseStatus && this.onmousedown) {
        // this.moveDistanceAll += this.moveDistanceStep
        if (this.vertical) this.moveDistanceStep = tempEvent.clientY - this.clickStarPointer
        else this.moveDistanceStep = tempEvent.clientX - this.clickStarPointer
        // console.log('this.clickStarPointer',this.clickStarPointer)
        // this.nowPositionPoint -= this.moveDistanceStep
        const offset = -(this.options.initialSwipe * this.options.loopStep) + this.moveDistanceStep
        // console.log('this.options.initialSwipe',this.options.initialSwipe)
        const duration = `${2 * this.options.touchResponseTime}ms`
        // const starPointer = this.vertical ? tempEvent.clientY : tempEvent.clientX
        // console.log('调用swiperOnMouseMove')
        this.swipeTranslate(offset, this.clickStarPointer, duration)
        this.lastTouchTimeStamp = event.timeStamp

      }
    },
    swiperOnMouseUp() {
      //检测是否滑动超过一定距离
      // console.log('++++++++++++++++', this.moveDistanceAll, '++++++++++++++++')
      if (this.options.touchUpStatus && this.onmousedown) {
        this.options.touchUpStatus = false
        this.resetPosition()
        this.options.touchUpStatus = true
        this.onmousedown = false
      }
    },
    resetPosition() {
      //  判断纵横
      let tempPosition = this.$refs[this.ref].style.transform
      if (tempPosition) {
        tempPosition = parseInt(tempPosition.split(/[(]|[)]/)[1])
        const absolutePosition = Math.abs(tempPosition)
        // 向上取整
        const positionCeil = Math.ceil(absolutePosition / this.options.loopStep)
        const positionFloor = Math.floor(absolutePosition / this.options.loopStep)
        const ceilOffset = Math.abs(positionCeil * this.options.loopStep - absolutePosition)
        const floorOffset = Math.abs(positionFloor * this.options.loopStep - absolutePosition)
        // const distance = ceilOffset - floorOffset
        // console.log(distance,'distance')
        if (ceilOffset>floorOffset){
          positionFloor > this.options.initialSwipe?this.resetPositionDoing(0):positionFloor<this.options.initialSwipe?this.resetPositionDoing(1):this.resetPositionDoing(2)
          // if (positionFloor > this.options.initialSwipe) {
          //   this.resetPositionDoing(0)
          // }
          // else if (positionFloor < this.options.initialSwipe) {
          //   this.resetPositionDoing(1)
          // }
          // else {
          //   this.resetPositionDoing(2)
          // }
        }
        else if (ceilOffset < floorOffset){
          positionCeil > this.options.initialSwipe?this.resetPositionDoing(0):positionCeil<this.options.initialSwipe?this.resetPositionDoing(1):this.resetPositionDoing(2)
          // if (positionCeil > this.options.initialSwipe) {
          //   this.resetPositionDoing(0)
          // } else if (positionCeil < this.options.initialSwipe) {
          //   this.resetPositionDoing(1)
          // } else {
          //   this.resetPositionDoing(2)
          // }
        }
        else {
          this.resetPositionDoing(2)
        }
      }
    },
    resetPositionDoing(model) {
      //model 为 int 0向前 1向后 2不变
      console.log('model',model)
      switch (model) {
        case 0:
          this.touchDirect = 'Next'
          this.options.initialSwipe = this.nextInitialSwipe
          break;
        case 1:
          this.touchDirect = 'Prev'
          this.options.initialSwipe = this.preInitialSwipe
          break;
        case 2:
          this.resetPage()
          break;
        default:
          // break
      }
    },
  }
});
</script>

<style lang="scss" module>
.swiper {
  height: 200px;
  width: 100%;
  overflow: hidden;
  position: relative;
  user-select:none;
  .wrapper{
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    height: 200px;
    transition-duration: 400ms;
  }
  .cleanFix{
    clear: both;
  }
  .bottom{
    position:absolute;
    bottom: 0;
    left: 0;
  }
  .left{
    position:absolute;
    bottom: 0;
    left: 10px;
  }
  .right{
    position:absolute;
    bottom: 0;
    right: 10px;
  }
  .top{
    position:absolute;
    top: 10px;
    left: 0;
  }
  .indicators{
    display: flex;
    justify-content:center;
    align-content: center;
    flex-wrap: nowrap;
    width: 100%;
    height: 20px;
    z-index: 51;
    text-align: center;
    .indicator_item {
      flex-shrink:0;
      display: inline-block;
      margin-bottom: 3px;
      margin-right: 3px;
      width: 4px;
      height: 4px;
      line-height: 20px;
      background-color: #FFFFFF;
      border-radius: 8px;
      opacity: 0.6;
      -webkit-transition: opacity 0.2s, background-color 0.2s;
      transition: opacity 0.2s, background-color 0.2s;
    }
    .indicator_item_active{
      width: 8px;
      height: 4px;
      border-radius: 3px;
      background-color: #FF960A;
      opacity: 1.0;
    }
    .indicator_item_active_vertical{
      width: 4px;
      height: 8px;
      border-radius: 3px;
      background-color: #FF960A;
      opacity: 1.0;
    }
  }
}
</style>
