import request from '../../utils/request';
import config from '../../config';
import api from '../../api/index.js'
import {
  storageManage
} from '../../utils/index'
Page({
  $route: 'pages/un-register/un-register',
  /**
   * 页面的初始数据
   */
  data: {
    title: 'un-register'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    // 一进来先判断有没有注册过
    const register = await this.isRegister()
     // forward 是否有进入小程序的权限 is_host  是否是主办方
     const {forward, is_host} = register
     if (!forward) {
       this.$redirectTo('un-register')
       return
     }
    this.isHasUserId()

  },
  async isHasUserId(){
    wx.showLoading({
      title: '加载中'
    })
    const { code} = await wx.$login();
    console.log(code)
    // todo 用户静默登录refresh
    const result = await request.get({
      url: `sso/login?app_id=${config.storeid}&code=${code}`,
      auth: true
    });
    console.log(result)
    const { data, status } = result
    if (status != 200) {
      // storageManage.setLoginStatus(false)
      throw new Error('Token fetch failed');
    }
    const { token, user_info } = data;
    const { user_id} = user_info
    await storageManage.setUserId(user_id);
    await this.set(token);
    return user_id

  },
  async isRegister() {
    // let loginStatus = await storageManage.getLoginStatus()
    // console.log('loginStatus======', loginStatus)
    // if (loginStatus) {
    //   return loginStatus
    // }
    const register = await api.getUserResiInfo()
    const { msg, data, status } = register;
    if (status != '200') return this.$showToast(msg);
    storageManage.setLoginStatus(data)
    return data
  },
  toMiniAPP() {
    wx.navigateToMiniProgram({
      appId: 'wxe27a30ee512b1ab0',
      path: 'page/index/index?id=123',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'develop',
      success(res) {
        // 打开成功
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
