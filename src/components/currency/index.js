export default Component({
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
