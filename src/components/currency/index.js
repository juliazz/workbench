export default Component({
  options: {
    addGlobalClass: true // 页面影响组件样式
  },
  properties: {
    value: {
      type: String,
      value: 0,
      observer(value) {
        this.setData({
          text: value.$currency()
        })
      }
    },
    type: {
      type: String,
      value: ''
    }
  },
  data: {
    text: 0
  }
})
