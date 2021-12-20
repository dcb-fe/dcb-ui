<template>
  <div :class="_.steps">
    <slot></slot>
  </div>
</template>

<script>
  import { defineComponent } from '@/utils';

  function compose(...funcs) {
    return function proxy(...args) {
      const len = funcs.length;
      if (len === 0) {
        return args;
      }
      if (len === 1) {
        return funcs[0](...args);
      }
      return funcs.reduce((x, y) => {
        return typeof x === "function" ? y(x(...args)) : y(x)
      });
    };
  }


  export default defineComponent({
    name: 'Steps',
    props: {
      active: {
        type: Number,
        default: 0,
        desc: '当前步骤',
      },
      vertical: {
        type: Boolean,
        default: false,
        desc: '显示方向，是否水平',
      },
      activeColor: {
        type: String,
        default: '#48C478',
        desc: '激活状态颜色',
      },
      nowActiveColor:{
        type: String,
        default: '',
        desc: '当前激活状态颜色',
      },
      inActiveColor: {
        type: String,
        default: '#969799',
        desc: '未激活状态颜色',
      },
      activeIcon: {
        type: String,
        default: '',
        desc: '激活状态图标，可选值见 Icon 组件',
      },
      nowActiveIcon: {
        type: String,
        default: 'select',
        desc: '当前激活状态图标，可选值见 Icon 组件',
      },

      inActiveIcon: {
        type: String,
        default: '',
        desc: '未激活状态图标，可选值见 Icon 组件',
      },
    },
    data(){
      return{
        classPrefix:'',
      }
    },
    computed:{

    },
    watch:{
      active:function () {
        this.activeViewUpdate()
      },
      vertical: function () {
        this.directionUpdate()
      }
    },
    mounted(){

      this.activeViewUpdate()
      this.directionUpdate()
    },
    methods:{
      activeViewUpdate(){
        this.$el.children.forEach((ele,index)=>{
          // 清空当前激活所有信息
          ele.className = this.stepClassNameActiveRemove(ele.className)
          if (index <= this.active)
          {
            this.$el.children[index].className += ` ${this.$el.className}-active`
            if (index !== this.active)
            {
              if (this.activeIcon)
              {
                this.$el.children[index].className += ` ${this.$el.className}-custom-active`
                compose(
                  this.iconItemRemoveNameClass,
                  this.setActiveItemIcon,
                )(ele.children[0].children[0])
              }
              else {
                this.iconItemRemoveNameClass(ele.children[0].children[0])
              }
              compose(this.setActiveItemColor,this.setActiveSpanColor)(ele)
            }
            else {
              if (this.nowActiveIcon){
                this.$el.children[index].className += ` ${this.$el.className}-custom-active`
                this.$el.children[this.active].className += ` ${this.$el.className}-now-active`
                compose(
                  this.iconItemRemoveNameClass,
                  this.setNowActiveItemIcon,
                )(ele.children[0].children[0])
              }
              compose(this.setNowActiveItemColor,this.setNowActiveSpanColor)(ele)
            }

          }
          else {
            if (this.inActiveIcon)
            {
              this.$el.children[index].className += ` ${this.$el.className}-custom-inactive`
              compose(
                this.iconItemRemoveNameClass,
                this.setInActiveItemIcon
              )(ele.children[0].children[0])
            }
            else {
              this.iconItemRemoveNameClass(ele.children[0].children[0])
            }
            compose( this.setInActiveItemColor,this.setInActiveSpanColor)(ele)
          }
        })
        this.setItemTransparent(this.$el.children[this.$el.children.length-1])

        if (this.active !== 0 ) this.$el.children[this.active - 1].className += ` ${this.$el.className}-before-active`
        // 设置当前的图标

      },

      directionUpdate(){
        // console.log('directionUpdate')
        this.$el.children.forEach((ele)=>{
          this.vertical?
            compose(
              this.itemRemoveVertical,
              this.stepsStyleUpdate,
              this.setItemVertical,
            )(ele)
            :
            compose(
              this.itemRemoveVertical,
              this.stepsStyleUpdate,
            )(ele)
        })
      },
      stepsStyleUpdate(ele){
        if(this.vertical){
          this.$el.style.flexDirection='column'
          this.$el.style.flexWrap = 'wrap'
          this.$el.style.alignContent = 'flex-start'
        }
        else {
          this.$el.style.flexDirection='row'
          this.$el.style.flexWrap = 'nowrap'
          this.$el.style.alignContent = 'center'
        }
        return ele
      },
      stepClassNameActiveRemove(className){
        let classArr = className.split(' ')
        classArr = classArr.filter(function (cla) {
          return cla.indexOf('active') === -1
        })
        let returnStrClassName = classArr.length?classArr[0]:''
        classArr.forEach((name,index)=>{
          if (index !== 0){
            returnStrClassName += ` ${name}`
          }
        })
        return  returnStrClassName
      },
      iconItemRemoveNameClass(iconItem){
        setTimeout(()=>{
          const da = iconItem.getAttribute('class')
          console.log('da',da)
        },200)

        console.log('@@@@@@@@1111111111',iconItem)
        let classArr = iconItem.className.split(' ')
        classArr = classArr.filter((cla)=>{
          return !cla.replace(classArr[0],'')
        })
        let returnStrClassName = classArr.length?classArr[0]:''
        classArr.forEach((name,index)=>{
          if (index !== 0){
            returnStrClassName += ` ${name}`
          }
        })
        console.log('@@@@@@@@222222',returnStrClassName)
        iconItem.className = returnStrClassName
        console.log('@@@@@@@@333333',iconItem.className)
        return iconItem
      },

      itemRemoveVertical(ele){
        // console.log('itemRemoveVertical',ele)
        let classArr = ele.className.split(' ')
        classArr = classArr.filter(function (cla) {
          return cla.indexOf('vertical') === -1
        })
        let returnStrClassName = classArr.length?classArr[0]:''
        classArr.forEach((name,index)=>{
          if (index !== 0){
            returnStrClassName += ` ${name}`
          }
        })
        // console.log('returnStrClassName',returnStrClassName)
        ele.className = returnStrClassName
        return  ele
      },
      setActiveItemIcon(iconItem){
        // console.log('setActiveItemIcon',iconItem)
        iconItem.style.backgroundColor = 'transparent'
        iconItem.className += ` ${iconItem.className}-${this.activeIcon}`
        return iconItem
      },
      setItemVertical(ele){
        let baseClassName = ele.className.split(' ')
        baseClassName = baseClassName[0]
        ele.className += ` ${baseClassName}-vertical`
      },
      setActiveItemColor(iconItems){
        const targetItem = iconItems.children[0]
        targetItem.children[0].style.color = this.activeColor
        if (!this.activeIcon) targetItem.children[0].style.backgroundColor = this.activeColor
        targetItem.children[1].style.backgroundColor = this.activeColor
        return iconItems
      },
      setActiveSpanColor(iconItems){
        // console.log('setActiveSpanColor',iconItems)
        iconItems.children[1].style.color = this.activeColor
        return iconItems
      },
      setNowActiveItemIcon(iconItem){
        console.log('------------setNowActiveItemIcon----------------',iconItem)
        iconItem.style.backgroundColor = 'transparent'
        iconItem.className += ` ${iconItem.className}-${this.nowActiveIcon}`
        return iconItem
      },
      setNowActiveItemColor(iconItems){
        const targetItem = iconItems.children[0]
        if (this.nowActiveColor){
          targetItem.children[0].style.color = this.nowActiveColor
          if (!this.nowActiveIcon) targetItem.children[0].style.backgroundColor = this.nowActiveColor
          targetItem.children[1].style.backgroundColor = '#E9E9E9'
        }
        else {
          targetItem.children[0].style.color = this.activeColor
          if (!this.nowActiveIcon) targetItem.children[0].style.backgroundColor = this.activeColor
          targetItem.children[1].style.backgroundColor = '#E9E9E9'
        }
        return iconItems
      },
      setNowActiveSpanColor(iconItems){
        // console.log('setActiveSpanColor',iconItems)
        if (this.nowActiveColor){
          iconItems.children[1].style.color = this.nowActiveColor
        }
        else {
          iconItems.children[1].style.color = this.activeColor
        }
        return iconItems
      },
      setInActiveItemIcon(iconItem){
        iconItem.style.backgroundColor = 'transparent'
        iconItem.className += ` ${iconItem.className}-${this.inActiveIcon}`
        return iconItem
      },
      setInActiveItemColor(iconItems){
        // console.log('setInActiveItemColor',iconItems.children[0])
        const targetItem = iconItems.children[0]
        targetItem.children[0].style.color = this.inActiveColor
        if (!this.inActiveIcon) targetItem.children[0].style.backgroundColor = this.inActiveColor
        targetItem.children[1].style.backgroundColor = '#E9E9E9'
        return iconItems
      },
      setInActiveSpanColor(iconItems){
        // console.log('setInActiveSpanColor')
        iconItems.children[1].style.color = this.inActiveColor
        return iconItems
      },
      setItemTransparent(iconItems){
        iconItems?
          iconItems.children[0].children[1].style.backgroundColor = 'transparent'
        :
          setTimeout(()=>{
            this.setItemTransparent(this.$el.children[this.$el.children.length-1])
          },200)
      },
      isCheckActive(el){
        // console.log(el.className)
      }
    }

  });
</script>

<style lang="scss" module>
  @font-face {
    font-family: 'd-icon';  /* Project id 2653829 */
    src: url('//at.alicdn.com/t/font_2653829_b1j7sr82g3q.woff2?t=1627295124609') format('woff2'),
    url('//at.alicdn.com/t/font_2653829_b1j7sr82g3q.woff?t=1627295124609') format('woff'),
    url('//at.alicdn.com/t/font_2653829_b1j7sr82g3q.ttf?t=1627295124609') format('truetype');
  }
  .steps {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .active{
      color: #00bc9d;
      >span:first-child{
        //background-color: #00bc9d;
        i{
          background-color: #00bc9d;
        }
        div{
          background-color: #00bc9d;
        }
      }
    }
    .now-active{
      >span:first-child{
        >i{
          background-color: transparent;
          line-height: 10px;
          width: 16px;
        }
        div{
          background-color: #E9E9E9;
        }

      }
    }
    .custom-active{
      >span:first-child{
        >i{
          background-color: transparent;
          line-height: 10px;
          width: 16px;
        }
      }
    }
    .custom-inactive{
      >span:first-child {
        >i{
          background-color: transparent;
          line-height: 10px;
          width: 16px;
        }
      }

    }
    >div {
      color: #999999;

   }
    >div:last-child{
      >span:first-child {
        > div {
          background-color: transparent;
        }
      }
    }
  }
</style>
