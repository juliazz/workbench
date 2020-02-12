import utils from '../../utils/utils';

let shareHistoryList = [{
  date: '2020/01/03',
  orderNum: '1234378775',
  buyerName: 'ddewefw',
  buyerPhone: '1234556y7',
  orderTotal: '3400',
  expand: false,
  shareList: [
    {
      productName: 'TECHMERINO™ A-Maze 运动鞋',
      salesPrice: '4300',
      num: 1
    },
    {
      productName: 'TECHMERINO™ A-Maze 运动鞋',
      salesPrice: '5300',
      num: 1
    },
    {
      productName: 'TECHMERINO™ A-Maze 运动鞋',
      salesPrice: '6300',
      num: 1
    }
  ]
}];
Page({
  $route: 'pages/person/person',
  /**
   * 页面的初始数据
   */
  data: {
    setNickNameShow: true,
    outLoginShow: true,
    closeOnClickOverlay: true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(utils.isIpx())
    console.log(this.data.$isIpx, '$isIpx')
    this.setData({
      shareHistoryList,
      isPhoneX: utils.isIpx
    })
  },
  expandEventer(e) {
    const { index} = e.currentTarget.dataset
    console.log(index)
    let shareHistoryList = this.data.shareHistoryList
    shareHistoryList[index].expand = !shareHistoryList[index].expand
    this.setData({
      shareHistoryList
    })
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
  closePopup: function(eve) {
    const { type } = eve.currentTarget.dataset
    console.log(type)
    this.setData({
      [type]: false
    })
  },
  // 退出登录
  outLogin: function() {

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
