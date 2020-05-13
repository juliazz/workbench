import ruleList from './rule'

const fetch = async (options) => {
  try {
    return await Promise.resolve({code: 0})
  } catch (err) {
    return {}
  }
}

Page({
  $route: 'pages/rank-list/rank-list',
  /**
   * 页面的初始数据
   */
  data: {
    stepOption: [
      { text: '春暖花开', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 }
    ],
    popupType: '',
    expandIndex: null, // 查看数据展开的index
    stepValue: 0, // 活动阶段
    ruleList: []
  },
  onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    const {rankType, ruleId } = options
    const rule = ruleList[Number(ruleId) - 1]
    console.log(Number(ruleId))
    console.log(rule, '=================')
    this.setData({
      rankType,
      ruleList: rule
    })
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
  collapseEventer(eve) {
    const {expandIndex} = this.data
    let {index} = eve.currentTarget.dataset
    index = expandIndex == index ? null : index
    this.setData({
      expandIndex: index
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
