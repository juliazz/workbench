

Object.defineProperty(exports, '__esModule', { value: true });
let component_1 = require('../../../common/component');
let utils_1 = require('../../utils');

component_1.VantComponent({
  props: {
    date: {
      type: null,
      observer: 'setDays'
    },
    type: {
      type: String,
      observer: 'setDays'
    },
    color: String,
    minDate: {
      type: null,
      observer: 'setDays'
    },
    maxDate: {
      type: null,
      observer: 'setDays'
    },
    showMark: Boolean,
    rowHeight: {
      type: [Number, String]
    },
    formatter: {
      type: null,
      observer: 'setDays'
    },
    currentDate: {
      type: [null, Array],
      observer: 'setDays'
    },
    allowSameDay: Boolean,
    showSubtitle: Boolean,
    showMonthTitle: Boolean
  },
  data: {
    visible: true,
    days: []
  },
  methods: {
    onClick: function (event) {
      let index = event.currentTarget.dataset.index;
      let item = this.data.days[index];
      if (item.type !== 'disabled') {
        this.$emit('click', item);
      }
    },
    setDays: function () {
      let days = [];
      let startDate = new Date(this.data.date);
      let year = startDate.getFullYear();
      let month = startDate.getMonth();
      let totalDay = utils_1.getMonthEndDay(startDate.getFullYear(), startDate.getMonth() + 1);
      for (let day = 1; day <= totalDay; day++) {
        let date = new Date(year, month, day);
        let type = this.getDayType(date);
        let config = {
          date: date,
          type: type,
          text: day,
          bottomInfo: this.getBottomInfo(type)
        };
        if (this.data.formatter) {
          config = this.data.formatter(config);
        }
        days.push(config);
      }
      this.setData({ days: days });
    },
    getMultipleDayType: function (day) {
      let currentDate = this.data.currentDate;
      if (!Array.isArray(currentDate)) {
        return '';
      }
      let isSelected = function (date) {
        return currentDate.some((item) => { return utils_1.compareDay(item, date) === 0; });
      };
      if (isSelected(day)) {
        let prevDay = utils_1.getPrevDay(day);
        let nextDay = utils_1.getNextDay(day);
        let prevSelected = isSelected(prevDay);
        let nextSelected = isSelected(nextDay);
        if (prevSelected && nextSelected) {
          return 'multiple-middle';
        }
        if (prevSelected) {
          return 'end';
        }
        return nextSelected ? 'start' : 'multiple-selected';
      }
      return '';
    },
    getRangeDayType: function (day) {
      let _a = this.data; let currentDate = _a.currentDate; let
        allowSameDay = _a.allowSameDay;
      if (!Array.isArray(currentDate)) {
        return;
      }
      let startDay = currentDate[0]; let
        endDay = currentDate[1];
      if (!startDay) {
        return;
      }
      let compareToStart = utils_1.compareDay(day, startDay);
      if (!endDay) {
        return compareToStart === 0 ? 'start' : '';
      }
      let compareToEnd = utils_1.compareDay(day, endDay);
      if (compareToStart === 0 && compareToEnd === 0 && allowSameDay) {
        return 'start-end';
      }
      if (compareToStart === 0) {
        return 'start';
      }
      if (compareToEnd === 0) {
        return 'end';
      }
      if (compareToStart > 0 && compareToEnd < 0) {
        return 'middle';
      }
    },
    getDayType: function (day) {
      let _a = this.data; let type = _a.type; let minDate = _a.minDate; let maxDate = _a.maxDate; let
        currentDate = _a.currentDate;
      if (utils_1.compareDay(day, minDate) < 0 || utils_1.compareDay(day, maxDate) > 0) {
        return 'disabled';
      }
      if (type === 'single') {
        return utils_1.compareDay(day, currentDate) === 0 ? 'selected' : '';
      }
      if (type === 'multiple') {
        return this.getMultipleDayType(day);
      }
      /* istanbul ignore else */
      if (type === 'range') {
        return this.getRangeDayType(day);
      }
    },
    getBottomInfo: function (type) {
      if (this.data.type === 'range') {
        if (type === 'start') {
          return '开始';
        }
        if (type === 'end') {
          return '结束';
        }
        if (type === 'start-end') {
          return '开始/结束';
        }
      }
    }
  }
});
