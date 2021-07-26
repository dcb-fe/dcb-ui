<template>
  <div :class="_.area">
    <d-popup
      position="bottom"
      :visible="showPopup"
      render-in-place
      @maskClick="handleMaskClick"
    >
      <div :class="_.bottom">
        <div :class="_.title">
          <span>请选择所在地区</span>
          <d-icon :class="_.close" name="close" @click="handleClose"/>
        </div>
        <div :class="_.region_tab">
          <div
            v-for="(item, key, index) in selectedRegion"
            :key="index"
            :ref="'tab-item-' + key"
            :class="[_.tab_item, index === tabIndex ? 'active' : '']"
            @click="changeRegionTab(index)"
            >
            <span>{{ getTabName(item, index) }}</span>
          </div>

          <span ref="regionLine" :class="_.region_tab_line" :style="{ left: lineDistance + 'px', backgroundColor: tabLineColor}"></span>
        </div>

        <div :class="_.region_con">
          <ul :class="_.region_group">
            <li
              v-for="(item, index) in regionList[tabName[tabIndex]]"
              :key="index"
              :class="[_.region_item, selectedRegion[tabName[tabIndex]].districtCode === item.districtCode ? _.active : '']"
              @click="nextAreaList(item)"
            >
              <span>{{ item.districtSimpleName }}</span>
              <d-icon v-if="selectedRegion[tabName[tabIndex]].districtCode === item.districtCode" :class="_.selected" name="select"/>
            </li>
          </ul>
        </div>
      </div>
    </d-popup>
  </div>
</template>

<script>
  import { defineComponent } from '@/utils';

  export default defineComponent({
    name: 'Area',

    inheritAttrs: false,

    props: {
      value: {
        type: Boolean,
        default: false,
        desc: '是否显示'
      },

      province: {
        type: Array,
        default: () => [],
        desc: '省'
      },

      city: {
        type: Array,
        default: () => [],
        desc: '市'
      },

      country: {
        type: Array,
        default: () => [],
        desc: '县'
      },

      tabLineColor: {
        type: String,
        default: '#FF960A',
        desc: '选中颜色'
      }
    },

    data () {
      return {
        showPopup: false,
        tabName: ['province', 'city', 'country'],
        tabIndex: 0,
        lineDistance: 0,
        regionList: {
          province: this.province,
          city: this.city,
          country: this.country
        },
        selectedRegion: {
          province: {},
          city: {},
          country: {},
        }
      }
    },

    watch: {
      value(newVal) {
        this.showPopup = newVal;
      },

      showPopup(newVal) {
        if (!newVal) this.$emit('input', false);

        if (newVal) {
          this.initAddress();
        }
      },

      province(newVal) {
        this.regionList.province = newVal;
      },

      city(newVal) {
        this.regionList.city = newVal;
      },

      country(newVal) {
        this.regionList.country = newVal;
      }
    },

    methods: {
      getTabName(item, index) {
        if (item.districtSimpleName) return item.districtSimpleName;

        if (this.tabIndex < index) {
          return item.districtSimpleName;
        } 
        
        return '请选择';
      },

      nextAreaList(item) {
        const calBack = {
          custom: this.tabName[this.tabIndex]
        };

        this.selectedRegion[this.tabName[this.tabIndex]] = item;

        for (let i = this.tabIndex; i < this.tabName.length - 1; i++) {
          this.selectedRegion[this.tabName[i + 1]] = {};
        }

        if (this.tabIndex < 3) {
          this.tabIndex = this.tabIndex + 1;
          this.lineAnimation();

          calBack.next = this.tabName[this.tabIndex];
          calBack.value = item;
          
          this.$emit('onChange', calBack);

          if (calBack.custom === 'country') {
            this.$emit('confirm', this.selectedRegion);
            this.showPopup = false;
          }
        } else {
          this.showPopup = false;
        }
      },

      changeRegionTab(index) {
        this.tabIndex = index;
        this.lineAnimation();
      },

      lineAnimation() {
        const name = `tab-item-${this.tabName[this.tabIndex]}`;
        this.$nextTick(() => {
          if (this.$refs[name] && this.$refs[name][0]) {
            const distance = this.$refs[name][0].offsetLeft;
            this.lineDistance = distance;
          }
        });
      },

      handleMaskClick () {
        this.initAddress();

        this.showPopup = false;
      },

      handleClose () {
        this.showPopup = false;
      },

      initAddress() {
        for (let i = 0; i < this.tabName.length; i++) {
          this.selectedRegion[this.tabName[i]] = {};
        }

        this.tabIndex = 0;
        this.lineAnimation();
      },
    }
  });
</script>

<style lang="scss" module>
  .bottom {
    background-color: #fff;
    padding: 16px;
    box-sizing: border-box;
    border-radius: 12px 12px 0 0;
    width: 100%;
    height: 375px;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: 16px;
      font-weight: 600;
    }
  }

  .close {
    color: #999999;
    font-size: 20px !important;
  }

  .region_tab {
    position: relative;
    margin-top: 32px;
    display: flex;
    font-size: 13px;
    color: #1d1e1e;
  }

  .tab_item {
    margin-right: 20px;

    &.active {
      font-weight: bold;
    }

    span {
      display: inline-block;
      max-width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .region_tab_line {
    position: absolute;
    bottom: -10px;
    left: 0;
    display: inline-block;
    margin-top: 5px;
    width: 42px;
    height: 3px;
    transition: 0.2s all linear;
    border-radius: 1px;
  }

  .region_con {
    margin: 20px 0 0;
  }

  .region_group {
    padding: 15px 0 0 0;
    margin: 0;
    height: 240px;
    overflow-y: auto;
  }

  .region_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: 14px;
    color: #333;
  }

  .active {
    font-weight: bold;
  }

  .selected {
    color: #ff960a;
    font-size: 18px !important;
  }
</style>
