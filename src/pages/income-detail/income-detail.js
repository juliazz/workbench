import api from '../../api/index.js'

let currentPage = 1;// 当前页数
let totalPage;
let totalData = [];
Page({
  $route: 'pages/income-detail/income-detail',
  /**
   * 页面的初始数据
   */
  data: {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    const {type} = options
    this.setData({
      type
    })
    this.$showLoading()
    switch (options.type) {
    case 'live':
      console.log('live======')
      this.getLiveDetaildata('getLiveOrderList')
      break;
    case 'onlineOrder':
      this.getLiveDetaildata('getOnlineOrderList')
      console.log('onlineOrder======')
      // return await api.getLiveOrderList()
      break;
    case 'onlineSign':
      this.getLiveDetaildata('getSignList')
      console.log('onlineSign======')
        // return await api.getLiveOrderList()
    }
    this.$hideLoading()
  },
  async getLiveDetaildata(type) {
    if (currentPage > totalPage) return this.$showToast('没有更多数据啦！');
    const par = {
      page: currentPage,
      limit: 10
    }
    const result = await api[`${type}`](par)
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    totalData = totalData.concat(data.data)
    totalPage = data.last_page
    this.setData({list: totalData, amount: data.amount?data.amount:''})
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
    console.log('currentPage', currentPage)
    this.getLiveDetaildata()
  }
})
