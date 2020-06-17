
Page({
  $route: 'pages/num-export/num-export',
  /**
   * 页面的初始数据
   */
  data: {
    title: 'num-export',
    allChecked:false,
    result: [],
    list: [
      {
        title:'报名客户明细',
        type:'order'
      },
      {
        title:'现金券客户明细',
        type:'money'
      },
      {
        title:'爆款秒杀订单明细',
        type:'order'
      },
      {
        title:'签单明细',
        type:'order'
      },
      {
        title:'账户收支明细',
        type:'order'
      },
      {
        title:'积分排名明细',
        type:'order'
      },
      {
        title:'奖金池兑换',
        type:'order'
      }
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
  },
  onChangeAll(event){
    const {detail} =event
    console.log(event)
    console.log(detail)
      // 当all选择时
      if(detail){
        this.setData({
          result: ['order','money'],  //所有选项
          allChecked:true
        });
        return
      }
      this.setData({
        result: [], 
        allChecked:false
      });
  },
  onChange(event) {
    const {detail} =event
    const length = detail.length
 
    this.setData({
      result: detail
    });

  },
  noop() {},
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
