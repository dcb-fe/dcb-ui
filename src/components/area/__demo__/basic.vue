<template>
  <div class="mobile">
    <d-cell label="所在区域" right-icon="arrow_right" @click="handleClick">
      <span slot="desc" :class="['addressText', !addressText && 'placeholder']">{{addressText ? addressText : '请选择所在区域'}}</span>
    </d-cell>
    
    <d-area 
    v-model="visible" 
    :province="province"
    :city="city"
    :country="country"
    @confirm="handleConfirm"
    @onChange="onChange"/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        addressText: '',
        province: [
          { districtCode: 1, districtSimpleName: '北京' },
          { districtCode: 2, districtSimpleName: '广西' },
          { districtCode: 3, districtSimpleName: '江西' },
          { districtCode: 4, districtSimpleName: '岫岩满族自治县' },
        ], // 省
        city: [
          { districtCode: 7, districtSimpleName: '朝阳区' },
          { districtCode: 8, districtSimpleName: '崇文区' },
          { districtCode: 9, districtSimpleName: '昌平区' },
          { districtCode: 6, districtSimpleName: '岫岩满族自治县' }
        ], // 市
        country: [
          { districtCode: 3, districtSimpleName: '八里庄街道' },
          { districtCode: 9, districtSimpleName: '北苑' },
          { districtCode: 4, districtSimpleName: '岫岩满族自治县' }
        ] // 县
      }
    },

    methods: {
      handleClick() {
        this.visible = true
      },

      onChange (cal) {
        // 请求二级三级区划
        console.log(cal);
      },

      handleConfirm ({province, city, country}) {
        // 选择区划确认赋值
        this.addressText = [province.districtSimpleName, city.districtSimpleName, country.districtSimpleName].join('');
      }
    },
  };
</script>

<style scoped>
  .mobile {
    height: 643px;
  }

  .addressText {
    flex: 1;
  }

  .placeholder {
    color: #ccc;
  }
</style>