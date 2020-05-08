
const fetch = async (options) => {
  try {
    return await Promise.resolve({code: 0})
  } catch (err) {
    return {}
  }
}

Page({
  $route: 'pages/statistics/statistics',
  /**
   * 页面的初始数据
   */
  data: {
    activeTabIndex: 1,
    activeNumViewTab: 1, // 数据总览切换
    activeRankItemIndex: null,
    tabs: ['个人', '部门', '品牌', '战区'],
    numViewTabs: ['主办方', '品牌'],
    rankList: [
      '浏览', '海报裂变', '报名', '售卡', '爆款秒杀订单', '自签单', '贡献签单', '逛店', '贡献逛店', '线下签到', '直播预约', '直播签到', '直播订单', '转单数量', '转单金额', '金币', '奖金', '考核扣罚', '售卡签单率'
    ],
    dataList: [{
      num: 100,
      title: '浏览人数'
    },
    {
      num: 100,
      title: '海报裂变人数'
    },
    {
      num: 100,
      title: '报名人数'
    },
    {
      num: 100,
      title: '售卡人数'
    },
    {
      num: 100,
      title: '爆款秒杀订单'
    },
    {
      num: 100,
      title: '自签单数'
    },
    {
      num: 100,
      title: '贡献签单数'
    },
    {
      num: 100,
      title: '爆款秒杀订单'
    },
    {
      num: 100,
      title: '逛店人数'
    },
    {
      num: 100,
      title: '贡献逛店人数'
    },
    {
      num: 100,
      title: '线下签到人数'
    },
    {
      num: 100,
      title: '直播预约人数'
    },
    {
      num: 100,
      title: '直播签到人数'
    },
    {
      num: 100,
      title: '直播订单数'
    },
    {
      num: 100,
      title: '转单数量'
    },
    {
      num: 100,
      title: '转单金额'
    },
    {
      num: 100,
      title: '金币数'
    },
    {
      num: 100,
      title: '奖金'
    },
    {
      num: 100,
      title: '考核扣罚'
    },
    {
      num: 100,
      title: '售卡签单率'
    }
    ]

  },
  onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    // this.$wLoading.show()
    const result = await this.$getPreload(fetch, options)
    console.log(result)

    // this.$wLoading.hide()
  },
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.index + 1}`,
      icon: 'none'
    });
    this.setData({
      activeTabIndex: event.detail.index
    })
  },
  rankItemClick(eve) {
    const {rankIndex} = eve.currentTarget.dataset
    const {activeTabIndex} = this.data
    this.setData({
      activeRankItemIndex: rankIndex
    })
    this.$routeTo(`statistics-rank?tabIndex=${activeTabIndex}&rankItemIndex=${rankIndex}&isFirstStep=1`)
  },
  onNumViewChange(event) {
    wx.showToast({
      title: `切换到数据总览 ${event.detail.index + 1}`,
      icon: 'none'
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
