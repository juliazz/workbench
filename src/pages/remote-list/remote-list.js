/* eslint-disable import/named */
import api from '../../api/index.js'
import storageManage from '../../utils/storage-manage'
import  orderMessage  from '../../utils/orderMessage.js'

const app = getApp();
let isdel = false;
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
    console.log(orderMessage.orderMessage)
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
    const caInfo = await storageManage.getCaInFo()
    const caCode = caInfo.cacode
    const storeCode = caInfo.storeCode
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
    console.log(recommendedNo, caCode, storeCode)
    app.navigateToMiniProgram_('pages/giftlist-ca/giftlist-ca', {recommendedNo, caCode, storeCode})
  },
  // 订阅消息
  orderMessageShare(eve) {
    const {tempId} = eve.currentTarget.dataset
    console.log(eve.currentTarget.dataset)
    orderMessage.orderMessage(tempId, () => {
      this.toEcMiniProgram()
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
    if(isdel) return // 防止操作太快
    const {index } = eve.currentTarget.dataset
    let productList = await storageManage.getRemoteProducts() || []
    console.log(index, index + 1)
    productList.length && productList.splice(index, 1)
    console.log(productList)
    this.setData({
      productList
    })
    await storageManage.setRemoteoducts(productList)
    isdel = true
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 2000,
      success: () => {
        setTimeout(() => {
          isdel = false
        }, 1500);
      }
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

  }
})
