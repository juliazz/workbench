
let productList = [
  {
    productName: 'TECHMERINO™ A-Maze 运动鞋',
    salesPrice: '333300'
  },
  {
    productName: 'TECHMERINO™ A-Maze 运动鞋',
    salesPrice: '3300'
  },
  {
    productName: 'TECHMERINO™ A-Maze 运动鞋',
    salesPrice: '33300'
  }];

Page({
  $route: 'pages/remote-list/remote-list',
  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.setData({
      productList
    })
  },
  toEcMiniProgram: function() {
    console.log('00000')
    wx.navigateToMiniProgram({
      appId: 'wxcc92c871c0188fe5',
      path: 'page/giftlist-ca/giftlist-ca',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'develop',
      success(res) {
        // 打开成功
      }
    })
  },
  tabEventer(e) {
    const {index} = e.currentTarget.dataset
    console.log(e)
    this.setData({
      tabIndex: index
    })
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
