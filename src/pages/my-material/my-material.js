import api from '../../api/index.js'

let currentPage = 1;
let totalPage;
let limit = 3;
let status_ = 0;
let totalData = [];
const fetch = async (options) => {
  try {
    const par = {
      page: currentPage,
      status: 0,
      limit
    }
    return await api.getUserMaterialList(par)
  } catch (err) {
    return {}
  }
}

Page({
  $route: 'pages/my-material/my-material',
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['微信素材', '其他素材'],
    activeList: 'audit',
    myMaterialList: [{}, {}],
    auditList: [{}, {}],
    wattingList: [{}],
    failLitst: [{}, {}, {}]
  },
  onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    this.$showLoading()
    const result = await this.$getPreload(fetch, options)
    console.log(result)
    this.$hideLoading()
  },
  async getMaterialList() {
    if (currentPage > totalPage) return this.$showToast('没有更多数据啦！');
    const par = {
      page: currentPage,
      status: status_,
      limit
    }
    this.$showLoading()
    const result = await api.getUserMaterialList(par)
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    totalPage = data.last_page
    const personDetailList = data.data.map((i) => {
      i.collState = false;
      return i
    })
    totalData = totalData.concat(personDetailList)
    this.setData({personDetailList: totalData})
  },
  changeEventer(event) {
    totalData = []
    currentPage = 1
    const {type } = event.currentTarget.dataset
    status_ = type
    this.setData({
      activeList: type
    })
    this.getMaterialList()
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
    currentPage++
    this.getMaterialList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
