
const timeNow = new Date()
Page({
  $route: 'pages/order-type-in/order-type-in',
  /**
   * 页面的初始数据
   */
  data: {
    order: {
      date: `${timeNow.getFullYear()}-${timeNow.getMonth() + 1}-${timeNow.getDate()}`
    },
    fileList: [

    ], // 上传文件列表
    multiArray: [['无脊柱动物名字很长很长', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],
    multiIndex: [0, 0, 0],
    calendarConfig: {
      minDate: new Date(2020, 0, 1).getTime(),
      maxDate: new Date(2025, 0, 31).getTime(),
      nowDate: timeNow.getTime(),
      round: true,
      poppable: true
    },
    popupType: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    console.log('pace')
  },
  bindblur(event) {
    const { type } = event.currentTarget.dataset;
    const { value } = event.detail;
    this.setData({ [`order.${type}`]: value || '' });
    console.log('event', value, this.data.order);
  },
  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新 fileList
        console.log(res)
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res.data });
        this.setData({ fileList });
      }
    });
  },
  bindsubmit(event) {
    const { value } = event.detail;
    let options = { ...value };
    console.log('value', value);
    // const component = this.selectComponent('#field-group');
    // component.validateEventer(rules, options, async valid => {
    //   if (!valid) return this.$showToast('请完善订单信息');
    // this.createOrder(value);
    // });
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(e)
    const multiIndex = e.detail.value
    this.setData({
      multiIndex,
      'order.signing': this.data.multiArray[2][multiIndex[2]]
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log(e)
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    let data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
    case 0:
      switch (data.multiIndex[0]) {
      case 0:
        data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
        data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
        break;
      case 1:
        data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
        data.multiArray[2] = ['鲫鱼', '带鱼'];
        break;
      }
      data.multiIndex[1] = 0;
      data.multiIndex[2] = 0;
      break;
    case 1:
      switch (data.multiIndex[0]) {
      case 0:
        switch (data.multiIndex[1]) {
        case 0:
          data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
          break;
        case 1:
          data.multiArray[2] = ['蛔虫'];
          break;
        case 2:
          data.multiArray[2] = ['蚂蚁', '蚂蟥'];
          break;
        case 3:
          data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
          break;
        case 4:
          data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
          break;
        }
        break;
      case 1:
        switch (data.multiIndex[1]) {
        case 0:
          data.multiArray[2] = ['鲫鱼', '带鱼'];
          break;
        case 1:
          data.multiArray[2] = ['青蛙', '娃娃鱼'];
          break;
        case 2:
          data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
          break;
        }
        break;
      }

      data.multiIndex[2] = 0;
      console.log(data.multiIndex);
      break;
    }
    this.setData(data);
  },
  popupShow: function(eve) {
    const { popupType } = eve.currentTarget.dataset
    this.setData({
      popupType
    })
  },
  closePopup: function(eve) {
    const { popupType } = eve.currentTarget.dataset
    this.setData({
      popupType: ''
    })
  },
  formatDate(date) {
    date = new Date(date);
    console.log(date.getFullYear())
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  onClose() {
    this.setData({ popupType: '' });
  },
  onConfirm(event) {
    console.log(event.detail)
    this.setData({
      popupType: '',
      ['order.date']: this.formatDate(event.detail)
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
