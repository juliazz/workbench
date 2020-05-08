
const fetch = async (options) => {
  try {
    return await Promise.resolve({code: 0})
  } catch (err) {
    return {}
  }
}

Page({
  $route: 'pages/customer/customer',
  /**
   * 页面的初始数据
   */
  data: {
    customerList: [{
      name: '浏览客户',
      id: 1,
      type: '浏览'
    }, {
      name: '裂变海报客户',
      id: 2,
      type: '裂变海报'
    },
    {
      name: '报名客户',
      id: 3,
      type: '报名'
    },
    {
      name: '售卡客户',
      id: 4,
      type: '售卡'
    },
    {
      name: '报名未关注公众号客户',
      id: 5,
      type: '报名未关注公众号'
    },
    {
      name: '报名关注公众号客户',
      id: 6,
      type: '报名关注公众号'
    },
    {
      name: '爆款秒杀客户',
      id: 7,
      type: '爆款秒杀'
    },
    {
      name: '自签单客户',
      id: 8,
      type: '自签单'
    },
    {
      name: '贡献签单客户',
      id: 9,
      type: '贡献签单'
    },
    {
      name: '贡献逛店客户',
      id: 10,
      type: '贡献逛店'
    },
    {
      name: '逛店客户',
      id: 11,
      type: '逛店'
    },
    {
      name: '线下签到客户',
      id: 12,
      type: '线下签到'
    },
    {
      name: '直播预约客户',
      id: 13,
      type: '直播预约'
    },
    {
      name: '未进直播间客户',
      id: 14,
      type: '未进直播间'
    },
    {
      name: '进直播间离线客户',
      id: 15,
      type: '进直播间离线'
    },
    {
      name: '进直播间在线客户',
      id: 16,
      type: '进直播间在线'
    },
    {
      name: '直播订单客户',
      id: 17,
      type: '直播订单'
    },
    {
      name: '转单客户',
      id: 18,
      type: '转单'
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
