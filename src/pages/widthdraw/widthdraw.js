import api from '../../api/index.js'

let value // 可用余额
Page({
  $route: 'pages/widthdraw/widthdraw',
  /**
   * 页面的初始数据
   */
  data: {
    rechargeNum: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    value = +options.value
    this.setData({value})
    console.log(value)
  },
  bindinput(event) {
    const { value } = event.detail;
    this.setData({ rechargeNum: +value });
  },
  async nextEventer() {
    this.$showLoading()
    const {rechargeNum } = this.data
    if (rechargeNum > value) { return this.$showToast('提现金额超出余额!') }
    const result = await api.submitWithdrawApply({amount: rechargeNum})
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    this.setData({value: data.money})
    this.$showToast({title: '提现成功', icon: 'success'})
    setTimeout(() => {
      this.$navigateBack()
    }, 1000)
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

  }
})
