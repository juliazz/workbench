export default Component({
  options: {
    multipleSlots: true
  },
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer(value) {
        value ? this.show() : this.hide();
      }
    },
    type: {
      type: String,
      value: 'center' // 弹窗内容显示位置left right top bottom center
    },
    radius: {
      type: Boolean,
      value: true // 弹窗内容显示位置left right top bottom center
    },
    headTitle: {
      type: String // 弹窗内容标题   传值显示，不传隐藏
    },
    closeIcon: {
      type: Boolean,
      default: false // 是否显示X号关闭按钮
    },
    closeBottom: {
      type: String // 底部关闭按钮，传值显示，不传隐藏
    },
    borBottom: { // 不要底部边框
      type: Boolean,
      value: true
    }
  },
  data: {
    num1: 0,
    num2: 0
  },
  methods: {
    show() {
      // if (popupType == 'choosePoster') { this.getTabBar().hideTabBar(); }
      this.setData({ show: true });
      setTimeout(() => {
        console.log(this.data.radius, 'radius')
      }, 300)
    },
    hide() {
      this.setData({ show: false });
    },
    clickCloseBackdrop() {
      this.setData({ show: !this.data.show });
      this.triggerEvent('callback', {})
    }
  }
});
