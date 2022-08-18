<template>
  <div>
    <d-nav-bar
      search
      :shamSearch="false"
      :safe-top="false"
      @back="handleClick"
      @searchVal="searchVal"
    />
    <br/>
    <d-nav-bar
      search
      search-bg-color="rgba(255, 255, 255, 0.41)"
      background="linear-gradient(270deg, #FD9A78 0%, #FFA117 51%, #FF7B69 100%)"
      :safe-top="false"
      @back="handleClick"
      @search="handleSearch"
    />
    <br/>
    <d-nav-bar
      :site="site"
      search
      search-bg-color="rgba(255, 255, 255, 0.41)"
      background="linear-gradient(270deg, #FD9A78 0%, #FFA117 51%, #FF7B69 100%)"
      :safe-top="false"
      @back="handleClick"
      @search="handleSearch"
      @areaConfirm="confirm"
      @areaChange="change"
    />
    <br/>
    <d-nav-bar
      search
      :safe-top="false"
      @back="handleClick"
      @search="handleSearch"
      @areaConfirm="confirm"
      @areaChange="change"
    >
      <template #search>
        <div class="nav-search-div">
          <div class="nav-search">
            <d-icon name="search"/>
            <input placeholder="搜索关键词"/>
          </div>
          <span class="nav-search-custom">
            <d-icon name="cart_fill"/>
            <span>购物车</span>
          </span>
        </div>
      </template>
    </d-nav-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      site: '观山湖区',
    };
  },
  methods: {
    handleClick() {
      alert('hello');
    },

    handleSearch() {
      alert('search');
    },
    change(cal) {
      console.log(cal);
    },
    confirm({province, city, country}) {
      this.site = city.districtSimpleName;
      // 选择区划确认赋值
      console.log(
        [
          province.districtSimpleName,
          city.districtSimpleName,
          country.districtSimpleName,
        ].join(''),
      );
    },
    searchVal(v) {
      console.log(v);
    },
  },
};
</script>
<style lang="scss">
.nav-search-div {
  width: 100%;
  display: flex;
  align-items: center;

  .nav-search {
    background-color: rgb(245, 245, 245);
    border-radius: 50px;
    display: flex;
    align-items: center;
    flex: 1;
    padding: 7px 12px;
    margin-left: 12px;

    i {
      color: rgba(104, 106, 110, 1);
      flex: 0 0 22px;
      font-size: 22px;
      height: 22px;
      line-height: 22px;
      width: 22px;
    }

    input {
      font-family: inherit; /* 1 */
      margin: 0; /* 2 */
      -webkit-appearance: none;
      -webkit-tap-highlight-color: rgba(255, 0, 0, 0); // 移除移动端阴影
      border: 0;
      background: none;
      padding-left: 4px;
      color: rgba(104, 106, 110, 1);
      outline: none;

      &::placeholder {
        color: rgba(104, 106, 110, 1);
        font-size: 14px;
        height: 22px;
        line-height: 22px;
      }
    }

    &-custom {
      padding: 0 12px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #018ff0;
      line-height: 20px;
    }
  }
}
</style>
