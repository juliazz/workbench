export default Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true // 页面影响组件样式
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
