let currentPage = 1;
let totalPage;
let totalData = [];
let type;
import api from '../../api/index.js'

Page({
  $route: 'pages/account-detail/account-detail',
  /**
   * 页面的初始数据
   */
  data: {
    title: 'account-detail'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    console.log(options)
    console.log('onLoad=======currentPage', currentPage)
    type = options.type
    this.getPersonalAccountDetail()
  },
  async getPersonalAccountDetail() {
    this.$showLoading()
    if (currentPage > totalPage) return this.$showToast('没有更多数据啦！');
    const par = {
      page: currentPage,
      limit: 10
    }
    console.log(type)
    const result = await api[`${type}`](par)
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    totalPage = data.last_page
    const personDetailList = data.data.map((i) => {
      let arr = i.time.split('T');
      i.time = arr[0]
      return i
    })
    totalData = totalData.concat(personDetailList)
    this.setData({personDetailList: totalData})
  },

  exportOrder: function() {
    wx.downloadFile({
      url: 'https://cynthianc.github.io/images/123.pdf',
      success: function (res) {
        let filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
            console.log(res)
          },
          fail: function(res) {
            console.log('fail')
            console.log(res)
          },
          complete: function(res) {
            console.log('complete')
            console.log(res)
          }
        })
      },
      fail: function(res) {
        console.log('fail')
        console.log(res)
      },
      complete: function(res) {
        console.log('complete')
        console.log(res)
      }
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
    currentPage = 1;
    console.log('onUnloadonUnloadonUnload=======,currentPage', currentPage)
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
    currentPage++
    this.getPersonalAccountDetail()
  }
})
