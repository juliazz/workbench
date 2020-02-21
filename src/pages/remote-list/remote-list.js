import api from '../../api/index.js'
import storageManage from '../../utils/storage-manage'

let remotelistStorge;
Page({
  $route: 'pages/remote-list/remote-list',
  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0
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
    this.getremoteList()
  },
  async toEcMiniProgram() {
    wx.showLoading()
    const caCode = wx.getStorageSync('cacode')
    const storeCode = wx.getStorageSync('storeCode')
    // const productId = e.currentTarget.dataset.productid
    let {productList } = this.data
    let productId = productList.map((i) => i.productId).join()
    const par = {
      productId,
      caCode: caCode,
      type: 0
    }
    const result = await api.addRemoteList(par)
    wx.hideLoading()
    console.log(result)
    const { msg, resultCode, data} = result
    if (resultCode != 1) return this.$showToast(msg);
    const { recommendedNo} = data
    wx.navigateToMiniProgram({
      appId: 'wxcc92c871c0188fe5',
      path: 'pages/giftlist-ca/giftlist-ca',
      extraData: {
        // fromCaMiniShare: {
        recommendedNo,
        caCode,
        storeCode
        // }
      },
      envVersion: 'trial',
      success(res) {
        // 打开成功
      }
    })
  },
  tabEventer(e) {
    const {index} = e.currentTarget.dataset
    console.log(e)
    this.setData({
      tabIndex: index
    })
  },
  async getremoteList() {
    wx.showLoading()
    const remotelistStorge = await storageManage.getRemoteProducts() || []
    console.log(remotelistStorge)
    this.setData({
      productList: remotelistStorge
    })
    wx.hideLoading()
  },
  async delRemoteList(eve) {
    const {index } = eve.currentTarget.dataset
    let productList = await storageManage.getRemoteProducts() || []
    productList.length && productList.splice(index, index + 1)
    console.log(productList)
    this.setData({
      productList
    })
    await storageManage.setRemoteoducts(productList)
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 2000
    })
  },
  // async getRemoteProducts() {
  //   return await storageManage.getRemoteProducts() || []
  // },
  async clearRemoteList() {
    await storageManage.setRemoteoducts([])
    this.setData({
      productList: []
    })
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
    return {
      title: '',
      imageUrl: '',
      path: '/pages/home/home?share=首页'
    };
  }
})
