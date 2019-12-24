export default Component({
  options: {
    multipleSlots: true
  },
  properties: {
    // 是否显示Page
    showPage: {
      type: Boolean,
      value: true
    },
    // 是否显示Tabbar
    showTabBar: {
      type: Boolean,
      value: false
    },
    // 是否显示Footer
    showFooter: {
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
