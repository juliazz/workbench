import api from '../../api/index.js'

let par;
let currentPage = 1;// 个人页数
let totalPage = 1;
let totalData = [];
let limit = 5;
let type;

Page({
  $route: 'pages/customer-list/customer-list',
  /**
   * 页面的初始数据
   */
  data: {
    customerList: null
  },
  /**
   * 生命周期函数--监听页面加载h
   */
  onLoad: async function(options) {
    console.log('totalData=============', totalData)
    const {customerType, id} = options
    type = id
    this.setData({
      customerType
    })
    wx.setNavigationBarTitle({
      title: `${customerType}客户`
    })
    this.getCustomerList()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  async getCustomerList() {
    console.log('=============getCustomerList===============')
    par = {
      type,
      page: currentPage,
      limit: limit
    }
    this.$showLoading()
    const result = await api.getClientList(par)
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    totalData = totalData.concat(data.data)
    totalPage = data.last_page
    this.setData({customerList: totalData})
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    currentPage = 1;// 个人页数
    totalPage = 1;
    totalData = [];
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
    console.log('==================onReachBottom================')
    currentPage++
    if (currentPage > totalPage) return this.$showToast('没有更多数据啦！');
    console.log('currentPage', currentPage)
    this.getCustomerList()
  }
})
