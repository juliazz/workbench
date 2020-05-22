import api from '../../api/index.js'

const fetch = async (options) => {
  try {
    const par = {
      activity_id: 1
    }
    return await api.brandList(par)
  } catch (err) {
    return {}
  }
}
let brandList_ = []

Page({
  $route: 'pages/order-brand/order-brand',
  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    stickyOffsetTop: 50,
    scrollTop: 0,
    indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    brandList: []
  },

  onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    this.$showLoading();
    const result = await this.$getPreload(fetch)
    this.$hideLoading();
    const {status, data, msg} = result
    console.log(result)
    if (status != '200') return this.$showToast(msg);
    brandList_ = data // 将列表存起来搜索用
    this.setData({brandList: data})
  },
  selectEvent(e) {
    const { brandId, brandName } = e.currentTarget.dataset
    wx.setStorageSync('brandInfo',{brandId,brandName})
    this.$navigateBack()
  },
  async onSearch(e) {
    const {detail} = e
    console.log(detail)
    const brandList = await this.filterBySearch(detail)
    console.log(brandList)
    this.setData({brandList})
  },
  // 搜索框搜索
  filterBySearch(keyWord) {
    let filterRes = {};
    return new Promise((resolve, reject) => {
      for (let i in brandList_) {
        let filterbrand = brandList_[i].filter((v) => {
          return v.name.indexOf(keyWord) > -1
        })
        if (filterbrand.length) filterRes[i] = brandList_[i]
      }
      resolve(filterRes)
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });
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
