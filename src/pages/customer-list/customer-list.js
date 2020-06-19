import api from '../../api/index.js'
let par;
let currentPage = 1;// 个人页数
let totalPage;
let totalData = [];
let limit =5;
let type ;
const fetch = async (options) => {
  try {
    type = options.id
    par={
      type,
      page: currentPage,
      limit: limit
    }
    
    return await api.getClientList(par)
  } catch (err) {
    return {}
  }
}

Page({
  $route: 'pages/customer-list/customer-list',
  /**
   * 页面的初始数据
   */
  data: {
  },
  onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载h
   */
  onLoad: async function(options) {
    const {customerType, id} = options
    this.setData({
      customerType
    })
    console.log('id=========',id,'customerType=====',customerType)
    this.$showLoading()
    const result = await this.$getPreload(fetch)
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    console.log(result)
    this.setData({customerList:data.data})
    // this.$wLoading.hide()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  makePhoneCall(e) {
    let { phoneNumber } = e.currentTarget.dataset
    wx.makePhoneCall({
      phoneNumber
    })
  },
  sendContact(e) {
    console.log('e', e);
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
