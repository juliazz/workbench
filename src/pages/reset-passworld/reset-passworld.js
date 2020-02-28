import api from '../../api/index.js'
import { Base64 } from '../../utils/base64';
import storageManage from '../../utils/storage-manage'

const fetch = async (options) => {
  try {
    return await Promise.resolve({code: 0})
  } catch (err) {
    return {}
  }
}

Page({
  $route: 'pages/change-passworld/change-passworld',
  /**
   * 页面的初始数据
   */
  data: {
    account: {
      oldPass: '',
      newPass: '',
      againPass: ''
    }
  },
  onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    console.log('')
  },
  inputEventer(e) {
    const { value } = e.detail
    const {type } = e.currentTarget.dataset
    const data = `account.${type}`
    this.setData({
      [data]: value
    })
  },
  async submitEventer(e) {
    const caInfo = await storageManage.getCaInFo()
    const { account} = this.data
    const { oldPass, newPass, againPass} = account
    if (oldPass === newPass) return this.$showToast('原密码与新密码不能相同！');
    if (againPass != newPass) return this.$showToast('两次输入的密码不相同');
    for (let key in account) {
      if (!account[key]) return this.$showToast('请填写必填项！');
    }
    const result = await api.salesAssistant({
      password: Base64.encode(newPass),
      originalPassword: Base64.encode(oldPass),
      number: caInfo.cacode
    })
    const { msg, resultCode, data} = result
    if (resultCode != 1) return this.$showToast(msg);
    setTimeout(() => {
      this.$routeTo('login', 'reLaunch')
    }, 1500)
    if (resultCode == 1) return this.$showToast('密码已修改请重新登录\r\n .......');
    console.log(msg, resultCode, data)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
