<template>
  <d-address-edit 
  :address-info="addressInfo" 
  :province="province" 
  :city="city" 
  :country="country"
  @onChange="onChange" 
  @save="handleSave"></d-address-edit>
</template>

<script>
  export default {
    data () {
      return {
        addressInfo: {
          detail: '',
          defaultFlag: 0,
          province: '',
          city: '',
          county: '',
          districtCode: '',
          receiver: '',
          phoneNo: '',
          id: '',
        },
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
        alert('hello');
      },

      handleSave (form) {
        console.log(form);
      },

      onChange (cal) {
        console.log(cal);
      },
    },
  };
</script>
