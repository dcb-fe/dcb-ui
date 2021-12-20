<template>
  <div :class="_.datetime_picker">
    <div :class="_.head">
      <a @click="cancel">{{ cancelButtonText }}</a>
      <span>{{ title }}</span>
      <a @click="confirm">{{ confirmButtonText }}</a>
    </div>
    <div :class="_.content" :style="{ height: visibleItemCount * 44 + 'px' }">
      <div
        :class="_.column"
        ref="dragBoxColumn"
        v-for="key in Object.keys(datetimeConfig.column)"
        :key="key + '-datetime-picker'"
      >
        <ul
          ref="dragBox"
          :style="{
            'transform': datetimeConfig.column[key].transform,
            'transition-duration': datetimeConfig.column[key].duration,
            'transition-property': datetimeConfig.column[key].property,
          }"
        >
          <li
            :index="index"
            v-for="(item, index) in datetimeConfig.column[key].list"
            :key="index + '-datetime-picker-' + item.type"
            :class="
              datetimeConfig.column[key].option.value === item.value &&
              datetimeConfig.column[key].option.type === item.type
                ? _['select-val']
                : ''
            "
          >
            {{ item.formatter }}
          </li>
        </ul>
      </div>
      <div :class="_.mask" :style="{ 'background-size': setMask() }"></div>
      <div :class="_.frame" ref="frame"></div>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from '@/utils';

  export default defineComponent({
    name: 'DatetimePicker',
    props: {
      value: {
        type: [String, Date],
        default: () => new Date(),
        desc: '当前选中的值',
      },
      title: {
        type: String,
        default: '选择完整时间',
        desc: '标题',
      },
      nowDate: {
        type: Boolean,
        default: false,
        desc: '是否选中当前时间',
      },
      confirmButtonText: {
        type: String,
        default: '确认',
        desc: '确认按钮文字',
      },
      cancelButtonText: {
        type: String,
        default: '取消',
        desc: '取消按钮文字',
      },
      type: {
        type: String,
        default: 'datetime', // datetime, yearMonthDate, yearMonth, monthDate, hourMinute
        desc:
          '时间类型，可选值为 datetime ' +
          'yearMonthDate yearMonth monthDate hourMinute',
      },
      formatter: {
        type: Function,
        default(type, val) {
          return val;
        },
        desc: '选项格式化函数',
      },
      filter: {
        type: Function,
        default(type, options) {
          return options;
        },
        desc: '选项过滤函数',
      },
      visibleItemCount: {
        type: [String, Number],
        default: 6,
        desc: '可见的选项个数',
      },
      minDate: {
        type: Date,
        default: () => new Date(2021, 0, 1),
        desc: '可选的最小时间，精确到分钟',
      },
      maxDate: {
        type: Date,
        default: () => new Date(2026, 0, 1),
        desc: '可选的最大时间，精确到分钟',
      },
    },
    emits: {
      cancel: {
        desc: '点击取消时触发',
      },
      confirm: {
        desc: '点击确认时触发',
        payload: {
          Object: {
            type: Object,
            desc: '返回当前时间 dateData dateString',
          },
        },
      },
      change: {
        desc: '选中选项时触发',
      },
    },
    data() {
      return {
        currentDate: this.value,
        datetimeConfig: {
          minDate: this.minDate,
          maxDate: this.maxDate,
          column: [],
          atPresentKey: '',
        },
        peak: this.visibleItemCount * 22 - 22,
      };
    },
    watch: {
      value(newVal) {
        this.currentDate = newVal;
      },
      currentDate(newValue) {
        this.$emit('input', newValue);
      },
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.datetimeConfig.column = this.setDatetime(this.type);
        this.$nextTick(() => {
          Object.keys(this.datetimeConfig.column).map((key, index) => {
            let dom = this.$refs.dragBoxColumn[index];
            this.initItemY(key, 0);
            dom.addEventListener('mousedown', event => {
              this.datetimeConfig.atPresentKey = key;
              this.touchstartHandle(
                'dragBox',
                {
                  pageX: event.pageX,
                  pageY: event.pageY,
                },
                key,
              );
              document.onmousemove = e => {
                e.preventDefault();
                this.touchmoveHandle(
                  'dragBox',
                  {
                    pageX: e.pageX,
                    pageY: e.pageY,
                  },
                  key,
                );
              };
              document.onmouseup = e => {
                setTimeout(() => {
                  this.columnData(key).moveing = false
                }, 200)
                this.toucendveHandle('dragBox', e, key);
                document.onmousemove = null;
                document.onmouseup = null;
              };
            });
            dom.addEventListener('touchstart', event => {
              event.preventDefault();
              this.datetimeConfig.atPresentKey = key;
              let e = event.targetTouches[0];
              this.touchstartHandle(
                'dragBox',
                {
                  pageX: e.pageX,
                  pageY: e.pageY,
                },
                key,
              );
            });
            dom.addEventListener('touchmove', event => {
              event.preventDefault();
              let e = event.targetTouches[0];
              this.touchmoveHandle(
                'dragBox',
                {
                  pageX: e.pageX,
                  pageY: e.pageY,
                },
                key,
              );
            });
            dom.addEventListener('touchend', event => {
              this.toucendveHandle('dragBox', event, key);
            });
          });
          if (this.currentDate) {
            let dateData;
            if (this.currentDate instanceof Date) {
              dateData = this.currentDate;
            } else {
              let dateInfo = new Date();
              let [hh, mm] = this.currentDate.split(':');
              dateData = new Date(
                dateInfo.getFullYear(),
                dateInfo.getMonth(),
                dateInfo.getDate(),
                hh,
                mm,
              );
            }
            let year = dateData.getFullYear();
            let month = dateData.getMonth() + 1;
            let date = dateData.getDate();
            let hour = dateData.getHours();
            let minute = dateData.getMinutes();
            let list = {
              year,
              month,
              date,
              hour,
              minute,
            };
            Object.keys(list).map(key => {
              if (this.columnData(key)) {
                let index = this.columnData(key).list.findIndex(
                  item => Number(item.value) === list[key],
                );
                if (index !== -1) {
                  this.initItemY(key, index);
                }
              }
            });
          }
        });
      },
      cancel() {
        this.$emit('cancel');
      },
      confirm() {
        let { year, month, date, hour, minute } = this.datetimeConfig.column;
        let data = '';
        switch (this.type) {
          case 'datetime':
            data = {
              dateData: new Date(
                year.option.value,
                month.option.value - 1,
                date.option.value,
                hour.option.value,
                minute.option.value,
              ),
              dateString:
                year.option.formatter +
                '-' +
                month.option.formatter +
                '-' +
                date.option.formatter +
                ':' +
                hour.option.formatter +
                ':' +
                minute.option.formatter,
            };
            break;
          case 'yearMonthDate':
            data = {
              dateData: new Date(
                year.option.value,
                month.option.value - 1,
                date.option.value,
              ),
              dateString:
                year.option.formatter +
                '-' +
                month.option.formatter +
                '-' +
                date.option.formatter,
            };
            break;
          case 'yearMonth':
            data = {
              dateData: new Date(year.option.value, month.option.value - 1),
              dateString: year.option.formatter + '-' + month.option.formatter,
            };
            break;
          case 'monthDate':
            data = {
              dateData: new Date(
                new Date().getFullYear(),
                month.option.value - 1,
                date.option.value,
              ),
              dateString: month.option.formatter + '-' + date.option.formatter,
            };
            break;
          case 'hourMinute':
            data = {
              dateString: hour.option.formatter + ':' + minute.option.formatter,
            };
            break;
        }
        this.$emit('confirm', data);
      },
      initItemY(key, index) {
        this.datetimeConfig.column[key].transform = `translate3d(0px, ${
          this.peak - 44 * index
        }px, 0px)`;
        this.datetimeConfig.column[key].option =
          this.datetimeConfig.column[key].list[index];
      },
      setColumnList(type, arr) {
        if (this.datetimeConfig.column[type]) {
          this.datetimeConfig.column[type].list = arr;
        }
      },
      setBoundary(key) {
        if (this.datetimeConfig.column[key]) {
          this.datetimeConfig.column[key].boundary =
            this.peak - (this.datetimeConfig.column[key].list.length - 1) * 44;
        }
      },
      hasVal(key, value) {
        let index = this.columnData(key).list.findIndex(
          item => item.value === value,
        );
        if (index === -1) {
          return this.columnData(key).list.length - 1;
        }
        return index;
      },
      resetMaxOrMinTime(key) {
        let { month, date, hour, minute } = this.datetimeConfig.column;
        let resetMonth = () => {
          if (!month) {
            return;
          }
          this.setColumnList('month', this.filter('month', this.getMonth()));
          this.setBoundary('month');
          this.initItemY('month', this.hasVal('month', month.option.value));
        };
        let resetDate = () => {
          if (!date) {
            return;
          }
          this.setColumnList('date', this.filter('date', this.getDate()));
          this.setBoundary('date');
          this.initItemY('date', this.hasVal('date', date.option.value));
        };
        let resetHour = () => {
          if (!hour) {
            return;
          }
          this.setColumnList('hour', this.filter('hour', this.getHour()));
          this.setBoundary('hour');
          this.initItemY('hour', this.hasVal('hour', hour.option.value));
        };
        let resetMinute = () => {
          if (!minute) {
            return;
          }
          this.setColumnList('minute', this.filter('minute', this.getMinute()));
          this.setBoundary('minute');
          this.initItemY('minute', this.hasVal('minute', minute.option.value));
        };
        if (key === 'year') {
          resetMonth();
          resetDate();
          resetHour();
          resetMinute();
        } else if (key === 'month') {
          resetDate();
          resetHour();
          resetMinute();
        } else if (key === 'date') {
          resetHour();
          resetMinute();
        } else if (key === 'hour') {
          resetMinute();
        }
      },
      changeOption(index, key) {
        this.$nextTick(() => {
          if (this.columnData(key).list[index]) {
            this.datetimeConfig.column[key].option =
              this.columnData(key).list[index];
          }
          let { year, month, date, hour, minute } = this.datetimeConfig.column;
          this.resetMaxOrMinTime(key);
          if (this.type === 'hourMinute') {
            this.currentDate =
              hour.option.formatter + ':' + minute.option.formatter;
          } else {
            this.currentDate = new Date(
              year ? year.option.value : new Date().getFullYear(),
              month ? month.option.value - 1 : new Date().getMonth(),
              date ? date.option.value : '00',
              hour ? hour.option.value : '00',
              minute ? minute.option.value : '00',
            );
          }
          this.$emit('change');
        });
      },
      setMask() {
        if (this.visibleItemCount <= 1) {
          return '100% 22px';
        } else {
          return `100% ${22 * (this.visibleItemCount - 1)}px`;
        }
      },
      getArr(key, startNum = 1, endNum) {
        let arr = [];
        for (let i = startNum; i <= endNum; i++) {
          let value = i < 10 ? '0' + i : i + '';
          arr.push({
            type: key,
            value,
            formatter: this.formatter(key, value),
          });
        }
        return arr;
      },
      setYear() {
        let maxYear = this.datetimeConfig.maxDate.getFullYear();
        let minYear = this.datetimeConfig.minDate.getFullYear();
        let yearDiff = maxYear - minYear;
        if (yearDiff <= 0) {
          yearDiff = 1;
        }
        let year = [];
        for (let i = 0; i <= yearDiff; i++) {
          year.push({
            type: 'year',
            value: minYear + i + '',
            formatter: this.formatter('year', minYear + i + ''),
          });
        }
        if (this.minDate.getFullYear() === this.maxDate.getFullYear()) {
          year.pop();
        }
        return year;
      },
      getMonth(init = false) {
        let maxYear = this.datetimeConfig.maxDate.getFullYear();
        let minYear = this.datetimeConfig.minDate.getFullYear();
        if (init) {
          if (maxYear === minYear) {
            return this.getArr(
              'month',
              this.datetimeConfig.minDate.getMonth() + 1,
              this.datetimeConfig.maxDate.getMonth() + 1,
            );
          }
          return this.getArr(
            'month',
            this.datetimeConfig.minDate.getMonth() + 1,
            12,
          );
        } else {
          let { year } = this.datetimeConfig.column;
          if (maxYear === minYear) {
            return this.getArr(
              'month',
              this.datetimeConfig.minDate.getMonth() + 1,
              this.datetimeConfig.maxDate.getMonth() + 1,
            );
          }
          if (maxYear === Number(year.option.value)) {
            return this.getArr(
              'month',
              1,
              this.datetimeConfig.maxDate.getMonth() + 1,
            );
          } else if (minYear === Number(year.option.value)) {
            return this.getArr(
              'month',
              this.datetimeConfig.minDate.getMonth() + 1,
              12,
            );
          } else {
            return this.getArr('month', 1, 12);
          }
        }
      },
      getDate(init) {
        let maxYear = this.datetimeConfig.maxDate.getFullYear();
        let minYear = this.datetimeConfig.minDate.getFullYear();
        if (init) {
          let date = new Date(
            this.datetimeConfig.minDate.getFullYear(),
            this.datetimeConfig.minDate.getMonth() + 1,
            0,
          ).getDate();
          return this.getArr(
            'date',
            this.datetimeConfig.minDate.getDate(),
            date,
          );
        } else {
          let { year, month } = this.datetimeConfig.column;
          if (!year) {
            if (
              this.datetimeConfig.minDate.getMonth() + 1 ===
              Number(month.option.value)
            ) {
              return this.getArr(
                'date',
                this.datetimeConfig.minDate.getDate(),
                new Date(year.option.value, month.option.value, 0).getDate(),
              );
            } else if (
              this.datetimeConfig.maxDate.getMonth() + 1 ===
              Number(month.option.value)
            ) {
              return this.getArr(
                'date',
                1,
                this.datetimeConfig.maxDate.getDate(),
              );
            } else {
              return this.getArr(
                'date',
                1,
                new Date(
                  year ? year.option.value : minYear,
                  month.option.value,
                  0,
                ).getDate(),
              );
            }
          }
          if (
            maxYear === Number(year.option.value) ||
            minYear === Number(year.option.value)
          ) {
            if (
              this.datetimeConfig.minDate.getMonth() + 1 ===
                Number(month.option.value) &&
              Number(year.option.value) === minYear
            ) {
              return this.getArr(
                'date',
                this.datetimeConfig.minDate.getDate(),
                new Date(year.option.value, month.option.value, 0).getDate(),
              );
            } else if (
              this.datetimeConfig.maxDate.getMonth() + 1 ===
                Number(month.option.value) &&
              Number(year.option.value) === maxYear
            ) {
              return this.getArr(
                'date',
                1,
                this.datetimeConfig.maxDate.getDate(),
              );
            } else {
              return this.getArr(
                'date',
                1,
                new Date(year.option.value, month.option.value, 0).getDate(),
              );
            }
          } else {
            return this.getArr(
              'date',
              1,
              new Date(year.option.value, month.option.value, 0).getDate(),
            );
          }
        }
      },
      getHour(init) {
        let maxHour = this.datetimeConfig.maxDate.getHours();
        let minHour = this.datetimeConfig.minDate.getHours();
        if (init) {
          if (this.type === 'hourMinute') {
            return this.getArr('hour', minHour || 1, maxHour || 1);
          }
          return this.getArr('hour', minHour || 1, 23);
        } else {
          let { year, month, date } = this.datetimeConfig.column;
          if (
            Number(year.option.value) === this.minDate.getFullYear() &&
            Number(month.option.value) === this.minDate.getMonth() + 1 &&
            Number(date.option.value) === this.minDate.getDate()
          ) {
            return this.getArr(
              'hour',
              this.datetimeConfig.minDate.getHours() || 1,
              23,
            );
          } else if (
            Number(year.option.value) === this.maxDate.getFullYear() &&
            Number(month.option.value) === this.maxDate.getMonth() + 1 &&
            Number(date.option.value) === this.maxDate.getDate()
          ) {
            return this.getArr(
              'hour',
              1,
              this.datetimeConfig.maxDate.getHours() || 1,
            );
          } else {
            return this.getArr('hour', 1, 23);
          }
        }
      },
      getMinute(init) {
        let minMinute = this.datetimeConfig.minDate.getMinutes();
        if (init) {
          return this.getArr('minute', minMinute || 1, 59);
        } else {
          let { year, month, date, hour } = this.datetimeConfig.column;
          if (
            (!year ||
              Number(year.option.value) === this.minDate.getFullYear()) &&
            (!month ||
              Number(month.option.value) === this.minDate.getMonth() + 1) &&
            (!date || Number(date.option.value) === this.minDate.getDate()) &&
            Number(hour.option.value) === this.minDate.getHours()
          ) {
            return this.getArr(
              'minute',
              this.datetimeConfig.minDate.getMinutes() || 1,
              59,
            );
          } else if (
            (!year ||
              Number(year.option.value) === this.maxDate.getFullYear()) &&
            (!month ||
              Number(month.option.value) === this.maxDate.getMonth() + 1) &&
            (!date || Number(date.option.value) === this.maxDate.getDate()) &&
            Number(hour.option.value) === this.maxDate.getHours()
          ) {
            return this.getArr(
              'minute',
              1,
              this.datetimeConfig.maxDate.getMinutes(),
            );
          } else {
            return this.getArr('minute', 1, 59);
          }
        }
      },
      setDatetime(type) {
        let data = {
          transform: '',
          duration: '0ms',
          property: 'none',
          moveing: false,
          upBeyond: false,
          downBeyond: false,
          moveY: '',
          atPresentY: '',
          fixupRecord: '',
          option: '',
          client: {
            x: '',
            y: '',
          },
        };
        let yearList = this.filter('year', this.setYear());
        let monthList = this.filter('month', this.getMonth(true));
        let dateList = this.filter('date', this.getDate(true));

        let hourList = this.filter('hour', this.getHour(true));
        let minuteList = this.filter('minute', this.getMinute(true));
        let defaultData = {
          year: {
            list: yearList,
            boundary: this.peak - (yearList.length - 1) * 44,
            ...data,
          },
          month: {
            list: monthList,
            boundary: this.peak - (monthList.length - 1) * 44,
            ...data,
          },
          date: {
            list: dateList,
            boundary: this.peak - (dateList.length - 1) * 44,
            ...data,
          },
          hour: {
            list: hourList,
            boundary: this.peak - (hourList.length - 1) * 44,
            ...data,
          },
          minute: {
            list: minuteList,
            boundary: this.peak - (minuteList.length - 1) * 44,
            ...data,
          },
        };
        let info = defaultData;
        switch (type) {
          case 'datetime':
            info = defaultData;
            break;
          case 'yearMonthDate':
            info = {
              year: defaultData.year,
              month: defaultData.month,
              date: defaultData.date,
            };
            break;
          case 'yearMonth':
            info = {
              year: defaultData.year,
              month: defaultData.month,
            };
            break;
          case 'monthDate':
            info = {
              month: defaultData.month,
              date: defaultData.date,
            };
            break;
          case 'hourMinute':
            info = {
              hour: defaultData.hour,
              minute: defaultData.minute,
            };
            break;
        }
        return info;
      },
      setTransform(y, status, key) {
        if (status) {
          this.columnData(key).atPresentY = y;
        }
        this.columnData(key).fixupRecord = y;
        this.columnData(key).transform = `translate3d(0px, ${y}px, 0px)`;
      },
      columnData(key) {
        return this.datetimeConfig.column[key];
      },
      touchstartHandle(refName, coordinates, key) {
        this.columnData(key).moveing = false;
        this.columnData(key).moveY = '';
        // 记录点击的坐标
        this.columnData(key).client = {
          x: coordinates.pageX,
          y: coordinates.pageY,
        };
      },
      touchmoveHandle(refName, coordinates, key) {
        this.columnData(key).moveing = true;
        if (this.columnData(key).moveY) {
          let uDomY = this.getuDomY(refName);
          let diff = Math.abs(this.columnData(key).moveY - coordinates.pageY);
          if (this.columnData(key).moveY - coordinates.pageY > 0) {
            if (uDomY <= this.columnData(key).boundary - 44) {
              this.columnData(key).downBeyond = true;
              this.setTransform(this.columnData(key).boundary - 44, false, key);
              return;
            }
            this.setTransform(uDomY - diff, false, key);
          } else if (this.columnData(key).moveY - coordinates.pageY < 0) {
            let y = uDomY + diff;
            if (y > this.peak) {
              this.columnData(key).upBeyond = true;
              if (y >= this.peak + 44) {
                this.setTransform(this.peak + 44, false, key);
                return;
              }
            }
            this.setTransform(uDomY + diff, false, key);
          }
        }
        if (this.columnData(key).moveY === '') {
          this.columnData(key).moveY = coordinates.pageY;
        } else {
          this.columnData(key).moveY = coordinates.pageY;
        }
      },
      toucendveHandle(refName, e, key) {
        let uDomY = this.getuDomY(refName);
        let amendment = y => {
          return y <= 0 ? y - (y % 44) - 22 : y - (y % 44) + 22;
        };
        if (this.columnData(key).moveing) {
          this.columnData(key).duration = '1000ms';
          this.columnData(key).property = 'all';
          // 顶部超出
          if (this.columnData(key).upBeyond) {
            this.columnData(key).upBeyond = false;
            this.setTransform(this.peak, true, key);
          } else if (this.columnData(key).downBeyond) {
            // 底部超出
            this.columnData(key).downBeyond = false;
            this.setTransform(this.columnData(key).boundary, true, key);
          } else {
            this.setTransform(amendment(uDomY), true, key);
          }
          setTimeout(() => {
            this.columnData(key).duration = '0ms';
            this.columnData(key).property = 'none';
          }, 1000);
        } else {
          this.columnData(key).duration = '200ms';
          this.columnData(key).property = 'all';
          setTimeout(() => {
            this.columnData(key).duration = '0ms';
            this.columnData(key).property = 'none';
          }, 200);
          this.columnData(key).moveing = false;
          if (e.target.getAttribute('index') !== null) {
            // 单点
            let liIndex = Number(e.target.getAttribute('index'));
            this.setTransform(this.peak - 44 * liIndex, true, key);
          }
        }
        this.columnData(key).moveY = '';
        // 超出边界回正
        if (this.getuDomY(refName) < this.columnData(key).boundary) {
          this.setTransform(this.columnData(key).boundary, true, key);
        }
        this.changeOption(
          Math.abs(
            (this.columnData(key).transform.split(',')[1].split('px')[0] -
              this.peak) /
              44,
          ),
          key,
        );
      },
      getuDomY(refName) {
        let index = Object.keys(this.datetimeConfig.column).indexOf(
          this.datetimeConfig.atPresentKey,
        );
        return Number(
          this.$refs[refName][index].style.webkitTransform
            .split(',')[1]
            .split('px')[0],
        );
      },
    },
  });
</script>

<style lang="scss" module>
  .datetime_picker {
    width: 100%;
    border-radius: 12px 12px 0 0;
    background: #ffffff;
    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      border-bottom: 1px solid #e9e9e9;
      a {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 24px;
        &:hover {
          cursor: pointer;
          text-decoration: none;
        }
        &:first-child {
          color: #333333;
        }
        &:last-child {
          color: #ff960a;
        }
      }
      span {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #333333;
        line-height: 25px;
      }
    }
    .content {
      display: flex;
      cursor: grab;
      position: relative;
      .column {
        flex: 1;
        overflow: hidden;
        user-select: none;
        ul {
          transform: translate3d(0px, 22px, 0px);
          transition-duration: 200ms;
          transition-property: all;
          margin: 0;
          padding: 0;
          list-style: none;
          li {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            line-height: 22px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 4px;
            white-space: nowrap;
            color: #000;
          }
        }
        .select-val {
          font-size: 20px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: normal;
        }
      }
      .mask {
        background-size: 100% 110px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        background-image: -webkit-linear-gradient(
            top,
            hsla(0, 0%, 100%, 0.9),
            hsla(0, 0%, 100%, 0.4)
          ),
          -webkit-linear-gradient(bottom, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4));
        background-image: linear-gradient(
            180deg,
            hsla(0, 0%, 100%, 0.9),
            hsla(0, 0%, 100%, 0.4)
          ),
          linear-gradient(0deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4));
        background-repeat: no-repeat;
        background-position: top, bottom;
        transform: translateZ(0);
        pointer-events: none;
      }
      .frame {
        height: 44px;
        position: absolute;
        top: 50%;
        right: 16px;
        left: 16px;
        z-index: 2;
        transform: translateY(-50%);
        pointer-events: none;
        &::after {
          position: absolute;
          box-sizing: border-box;
          content: ' ';
          pointer-events: none;
          top: -50%;
          right: -50%;
          bottom: -50%;
          left: -50%;
          border-top: 1px solid #ebedf0;
          border-bottom: 1px solid #ebedf0;
          transform: scale(0.5);
        }
      }
    }
  }
</style>
