import config from '../../config';
import api from '../../api/index.js'
import request from '../../utils/request';
import tokenManage from '../../utils/token-manage';
// const fetch = async (options) => {
//   try {
//     return await Promise.resolve({code: 0})
//   } catch (err) {
//     return {}
//   }
// }

Page({
  $route: 'pages/login/login',
  /**
   * 页面的初始数据
   */
  data: {
    title: 'login',
    ca: {
    }
  },
  // onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    // this.$wLoading.show()
    // const result = await this.$getPreload(fetch, options)
    // console.log(result)
    // this.$wLoading.hide()
  },
  codeInput(e) {
    const { value } = e.detail
    this.setData({
      'ca.code': value
    })
  },
  passworldInput(e) {
    const { value } = e.detail
    this.setData({
      'ca.passworld': value
    })
  },
  async submitEventer(e) {
    const token = await tokenManage.get()
    if(token){

    }else{
      this.toEcMiniProgram()
    }
     // 用户登录失效或者缓存失效的时候
    this.$routeTo(`person`,'switchTab')
  },
  toEcMiniProgram: function() {
    console.log('00000')
    wx.navigateToMiniProgram({
      appId: 'wxcc92c871c0188fe5',
      path: 'page/giftlist-ca/giftlist-ca',
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
    this.isHasToken()
  },
  async isHasToken() {
    const { code} = await wx.$login();
    console.log(code)
    // todo 用户静默登录
    const result = await request.get({
      url: `/member/onLogin/${code}/${config.wechatId}`,
      auth: true
    });
    const { data, resultCode } = result
    if (resultCode != '1') throw new Error('Token fetch failed');
    const { token } = data;
    await tokenManage.set(token);
    console.log(result)
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
