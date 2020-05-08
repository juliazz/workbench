
const fetch = async (options) => {
  try {
    return await Promise.resolve({code: 0})
  } catch (err) {
    return {}
  }
}

Page({
  $route: 'pages/recharge/recharge',
  /**
   * 页面的初始数据
   */
  data: {
    title: 'recharge'
  },
  onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    this.$wLoading.show()
    const result = await this.$getPreload(fetch, options)
    console.log(result)
    this.$wLoading.hide()
  },
  bindinput(event) {
    const { value } = event.detail;
    this.setData({ rechargeNum: value });
  },
  nextEventer() {
    const {rechargeNum } = this.data
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
