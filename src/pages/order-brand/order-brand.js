
Page({
  $route: 'pages/order-brand/order-brand',
  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    stickyOffsetTop: 120,
    scrollTop: 0,
    indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    brandList: [{
      index: 'A',
      list: ['欧派橱柜a', '欧派橱柜']
    }, {
      index: 'B',
      list: ['欧派橱柜b', '欧派橱柜']
    }, {
      index: 'C',
      list: ['欧派橱柜c', '欧派橱柜']
    }, {
      index: 'D',
      list: ['欧派橱柜d', '欧派橱柜']
    }, {
      index: 'E',
      list: ['欧派橱柜d', '欧派橱柜']
    }, {
      index: 'F',
      list: ['欧派橱柜F', '欧派橱柜']
    }, {
      index: 'G',
      list: ['欧派橱柜', '欧派橱柜']
    }, {
      index: 'H',
      list: ['欧派橱柜', '欧派橱柜']
    }, {
      index: 'I',
      list: ['欧派橱柜', '欧派橱柜']
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  selectEvent(e) {
    console.log(e)
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
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });
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
