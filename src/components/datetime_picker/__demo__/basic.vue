<template>
  <div class="datetime-picker-demo">
    <p class="title">选择年月日</p>
    <d-cell
      title="年月日"
      desc="描述文字"
      right-icon="return"
      @click="showDatetime(1)"
    >
      <input
        slot="desc"
        readonly
        type="text"
        @click="showDatetime(1)"
        v-model="value1"
        placeholder="请选择年月日"
      />
    </d-cell>
    <p class="title">选择年月</p>
    <d-cell
      title="年月"
      desc="描述文字"
      right-icon="return"
      @click="showDatetime(2)"
    >
      <input
        slot="desc"
        readonly
        type="text"
        @click="showDatetime(2)"
        v-model="value2"
        placeholder="请选择年月"
      />
    </d-cell>
    <p class="title">选择月日</p>
    <d-cell
      title="月日"
      desc="描述文字"
      right-icon="return"
      @click="showDatetime(3)"
    >
      <input
        slot="desc"
        readonly
        v-model="value3"
        type="text"
        @click="showDatetime(3)"
        placeholder="请选择月日"
      />
    </d-cell>
    <p class="title">选择时分</p>
    <d-cell
      title="时分"
      desc="描述文字"
      right-icon="return"
      @click="showDatetime(4)"
    >
      <input
        slot="desc"
        readonly
        type="text"
        v-model="value4"
        @click="showDatetime(4)"
        placeholder="请选择时分"
      />
    </d-cell>
    <p class="title">选项过滤器</p>
    <d-cell
      title="过滤器"
      desc="描述文字"
      right-icon="return"
      @click="showDatetime(5)"
    >
      <input
        slot="desc"
        readonly
        type="text"
        v-model="value5"
        @click="showDatetime(5)"
        placeholder="请选择选项过滤器"
      />
    </d-cell>
    <p class="title">选项完整时间</p>
    <d-cell
      title="完整时间"
      desc="描述文字"
      right-icon="return"
      @click="showDatetime(5)"
    >
      <input
        slot="desc"
        readonly
        type="text"
        v-model="value6"
        @click="showDatetime(6)"
        placeholder="请选择完整时间"
      />
    </d-cell>
    <d-popup
      :position="position"
      :visible="visible"
      render-in-place
      @maskClick="handleMaskClick"
    >
      <d-datetime-picker
        v-model="value1"
        v-if="datetimeNum === 1"
        type="yearMonthDate"
        title="请选择年月日"
        @cancel="visible = false"
        @confirm="visible = false"
        :formatter="formatter"
      ></d-datetime-picker>
      <d-datetime-picker
        v-model="value2"
        v-if="datetimeNum === 2"
        type="yearMonth"
        title="请选择年月"
        @cancel="visible = false"
        @confirm="confirm"
        :formatter="formatter"
      ></d-datetime-picker>
      <d-datetime-picker
        v-if="datetimeNum === 3"
        type="monthDate"
        title="请选择月日"
        @cancel="visible = false"
        @confirm="confirm"
        :formatter="formatter"
      ></d-datetime-picker>
      <d-datetime-picker
        v-if="datetimeNum === 4"
        type="hourMinute"
        title="请选择时分"
        @cancel="visible = false"
        @confirm="confirm"
        :formatter="formatter"
      ></d-datetime-picker>
      <d-datetime-picker
        v-if="datetimeNum === 5"
        type="hourMinute"
        title="请选择过滤器"
        @cancel="visible = false"
        @confirm="confirm"
        :filter="filter"
        :formatter="formatter"
      ></d-datetime-picker>
      <d-datetime-picker
        v-model="value6"
        v-if="datetimeNum === 6"
        :maxDate="new Date(2030, 11, 31)"
        @cancel="visible = false"
        @confirm="confirm"
      ></d-datetime-picker>
    </d-popup>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        datetimeNum: '',
        value1: new Date(),
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: new Date(),
        position: 'bottom',
        visible: false,
      };
    },
    methods: {
      showDatetime(num) {
        this.datetimeNum = num;
        this.visible = true;
      },
      handleMaskClick() {
        this.visible = false;
      },
      confirm(valueData) {
        this.visible = false;
        if (this.datetimeNum === 2) {
          this.value2 = valueData.dateData;
        } else if (this.datetimeNum === 3) {
          this.value3 = valueData.dateString;
        } else if (this.datetimeNum === 4) {
          this.value4 = valueData.dateString;
        } else if (this.datetimeNum === 5) {
          this.value5 = valueData.dateString;
        } else if (this.datetimeNum === 5) {
          this.value6 = valueData.dateData;
        }
      },
      filter(type, options) {
        if (type === 'minute') {
          return options.filter(option => option.value % 5 === 0);
        }
        return options;
      },
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`;
        } else if (type === 'date') {
          return `${value}日`;
        }
        return value;
      },
    },
  };
</script>
<style scoped lang="scss">
  .datetime-picker-demo {
    .title {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 20px;
    }
    input {
      outline: none;
      padding: 0;
      width: 100%;
      height: 22px;
      border: none;
      font-size: 15px;
      line-height: 1;
    }
    ::v-deep .d-cell {
      cursor: pointer;
      &-box {
        border-bottom: 0 !important;
      }
      i {
        transform: rotate(180deg);
      }
    }
  }
</style>
