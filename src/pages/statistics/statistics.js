
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
    tabs: [{name: '个人', tabId: 1}, {name: '部门', tabId: 2}, {name: '品牌', tabId: 3}, {name: '战区', tabId: 4}],
    numViewTabs: ['主办方', '品牌'],
    rankList: [{name: '浏览', rankId: 1}, {name: '海报裂变', rankId: 2}, {name: '报名', rankId: 3}, {name: '售卡', rankId: 4},
      {name: '爆款秒杀订单', rankId: 5}, {name: '自签单', rankId: 6}, {name: '贡献签单', rankId: 7}, {name: '逛店', rankId: 8},
      {name: '贡献逛店', rankId: 9}, {name: '线下签到', rankId: 10}, {name: '直播预约', rankId: 11}, {name: '直播签到', rankId: 12},
      {name: '直播订单', rankId: 13}, {name: '转单数量', rankId: 14}, {name: '转单金额', rankId: 15}, {name: '金币', rankId: 16},
      {name: '奖金', rankId: 17}, {name: '考核扣罚', rankId: 18}, {name: '售卡签单率', rankId: 19}],
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
    const {rankName, rankId, rankIndex} = eve.currentTarget.dataset
    const {activeTabIndex, tabs } = this.data
    const rankTitle = tabs[activeTabIndex].name + `${rankName}`
    console.log(rankTitle)
    this.setData({
      activeRankItemIndex: rankIndex
    })
    let isFirstStep = activeTabIndex == 0 ? 1 : 0
    this.$routeTo(`statistics-rank?tabIndex=${activeTabIndex}&rankItemIndex=${rankId}&isFirstStep=${isFirstStep}&rankTitle=${rankTitle}`)
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
