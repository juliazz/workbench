import api from '../../api/index.js'
import config from '../../config';

Page({
  $route: 'pages/recharge/recharge',
  /**
   * 页面的初始数据
   */
  data: {
    title: 'recharge'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {},
  bindinput(event) {
    const { value } = event.detail;
    this.setData({ rechargeNum: value });
  },
  async nextEventer() {
    const {rechargeNum } = this.data
    this.$showLoading()
    console.log(rechargeNum)
    const result = await api.submitRecharge({
      amount: rechargeNum,
      app_id: config.appid
    })
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    const {timestamp, nonce_str, sign_type, prepay_id, pay_sign } = data
    const par = {
      timeStamp: timestamp + '',
      nonceStr: nonce_str,
      package: prepay_id,
      signType: sign_type,
      paySign: pay_sign
    }
    console.log(par)
    wx.requestPayment({
      ...par,
      success: (res) => {
        console.log('res', res)
        if (res.errMsg == 'requestPayment:ok') {
          this.$showToast({title: '充值成功', icon: 'success'})
          setTimeout(() => {
            this.$navigateBack()
          }, 2000)
        } else {
          this.$showToast('充值失败稍后再试！')
          setTimeout(() => {
            this.$navigateBack()
          }, 20000)
        }
      },
      fail: (err) => {
        console.log(err, 'err')
        setTimeout(() => {
          this.$navigateBack()
        }, 2000)
      }
    });
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

  }

})
