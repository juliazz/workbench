

Page({
  $route: 'pages/customer/customer',
  /**
   * 页面的初始数据
   */
  data: {
    customerList: [{
      name: '裂变客户',
      id: 1,
      icon: 'fission',
      type: '裂变'
    }, {
      name: '报名客户',
      id: 2,
      icon: 'apply',
      type: '报名'
    },
    {
      name: '售卡客户',
      id: 3,
      icon: 'sale-card',
      type: '售卡'
    },
    {
      name: '爆款秒杀客户',
      id: 4,
      icon: 'seckill',
      type: '爆款秒杀'
    },
    {
      name: '逛店客户',
      id: 5,
      icon: 'shopping',
      type: '逛店'
    },
    {
      name: '贡献逛店',
      id: 6,
      icon: 'contribution-shopping'
    },
    {
      type: '被贡献逛店',
      id: 7,
      icon: 'passi-contribution-shopping'
    },
    {
      icon: 'order',
      id: 8,
      type: '直播预约'
    },
    {
      id: 9,
      icon: 'live',
      type: '直播间在线'
    },
    {
      id: 10,
      icon: 'un-in-live',
      type: '未进直播间'
    },
    {
      id: 11,
      icon: 'live-order',
      type: '直播订单'
    },
    {
      id: 12,
      icon: 'change-order',
      type: '转单客户'
    },
    {
      id: 13,
      icon: 'signself',
      type: '自签单'
    },
    {
      id: 14,
      icon: 'contribution-sign',
      type: '贡献签单'
    },
    {
      icon: 'passi-contribution-sign',
      id: 15,
      type: '被贡献签单'
    },
    {
      id: 16,
      icon: 'outline-costumer',
      type: '线下签到'
    }

    ]
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
