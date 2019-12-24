export default Component({
  options: {
    multipleSlots: true
  },
  properties: {
    // 是否显示
    showPage: {
      type: Boolean,
      value: true
    },
    // 是否有tabbar
    isTabBar: {
      type: Boolean,
      value: false
    },
    isFooter: {
      type: Boolean,
      value: false
    }
  },
  data: {},
  attached() {},
  methods: {
    noop() {}
  }
});
