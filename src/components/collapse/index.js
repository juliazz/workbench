export default Component({
  behaviors: [],
  options: {
    multipleSlots: true
  },
  properties: {},
  data: {
    status: !1
  },
  methods: {
    toggleEventer() {
      let status = this.data.status
      this.setData({
        status: !status
      })
    }
  }
});
