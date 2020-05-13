
const fetch = async (options) => {
  try {
    return await Promise.resolve({code: 0})
  } catch (err) {
    return {}
  }
}

Page({
  $route: 'pages/statistics-rank/statistics-rank',
  /**
   * 页面的初始数据
   */
  data: {
    stepList: [
      { text: '总排行', value: 0 },
      { text: '昨日排行', value: 1 },
      { text: '今日排行', value: 2 }
    ],
    stepValue: 0,
    isFirstStep: null,
    timeTitle: '总排行'

  },
  onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    const {isFirstStep, rankTitle, tabIndex} = options
    console.log(options)
    console.log(isFirstStep)
    // 是否还有下一级
    if (isFirstStep) this.setData({isFirstStep})
    // if(rankTitle) wx.setNavigationBarTitle({title: rankTitle })
    // if(tabIndex){}
    //
    // this.$wLoading.show()
    const result = await this.$getPreload(fetch, options)
    console.log(result)
    // this.$wLoading.hide()
  },
  timeChangeEventer(eve) {
    const index = eve.detail
    const timeTitle = this.data.stepList.find((i) => {
      return i.value == index
    })
    this.setData({timeTitle: timeTitle.text})
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
