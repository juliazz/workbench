
const fetch = async (options) => {
  try {
    return await Promise.resolve({code: 0})
  } catch (err) {
    return {}
  }
}

Page({
  $route: 'pages/finance/finance',
  /**
   * 页面的初始数据
   */
  data: {
    activeTabIndex: 1,
    personDetailShow: true,
    popupType: '',
    tabs: ['品牌财务', '个人财务'],
    explainRule: [{
      title: '1.推广费用余额',
      content: ' 阅读红包、浏览红包、金币兑换指出等费用由所有品牌平摊'
    }, {
      title: '2.推广费用均摊支出',
      content: ' 推广总费用／品牌数'
    }]
  },
  onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    const result = await this.$getPreload(fetch, options)
    console.log(result)
  },
  onChange: function(eve) {
    const {index} = eve.detail
    this.setData({
      activeTabIndex: index
    })
  },
  showPersonDetail: function() {
    this.setData({personDetailShow: true})
  },
  popupShow: function(eve) {
    this.setData({
      popupType: 'pop-explain'
    })
  },
  closePopup: function(eve) {
    this.setData({
      popupType: ''
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
