/* eslint-disable no-undef */
import config from '../../config';
import api from '../../api/index.js'
import request from '../../utils/request';
import tokenManage from '../../utils/token-manage';
import storageManage from '../../utils/storage-manage';
import { Base64} from '../../utils/base64';

const app = getApp()
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    console.log('login页面参数onLoad', options)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(option) {
    console.log('login页面参数onshow1', option)
    this.isHasToken()
  },
  async isHasToken() {
    wx.showLoading({
      title: '加载中'
    })
    const { code} = await wx.$login();
    console.log(code)
    // todo 用户静默登录
    let unionId_ = app.data.unionId || '' // 从微商城带来的unionId
    console.log('url', `/member/caOnLogin/${code}/${config.wechatId}/${config.shopWechatId}?unionId=${unionId_}`)
    const result = await request.get({
      url: `/member/caOnLogin/${code}/${config.wechatId}/${config.shopWechatId}?unionId=${unionId_}`,
      auth: true
    });
    wx.hideLoading()
    const { data, resultCode } = result
    if (resultCode != '1') throw new Error('Token fetch failed');
    const { token, unionid } = data;
    await tokenManage.set(token);
    console.log(unionid, 'unionid')
    if (unionid) {
      await storageManage.setUnionId(unionid);
      const loginStatus = await storageManage.getLoginStatus();
      if (loginStatus) {
        this.$routeTo('product-list', 'switchTab')
      }
      // 如果是EC跳转回来,就去密码登录passWordLogin
      const {from} = app.data
      if (from == 'ECback') {
        console.log('from', from)
        this.passWordLogin()
      }
    }
  },
  accountInput(e) {
    const { value } = e.detail
    this.setData({
      'ca.account': value
    })
  },
  passwordInput(e) {
    const { value } = e.detail
    this.setData({
      'ca.password': value
    })
  },
  async submitEventer(e) {
    const { ca} = this.data
    console.log(ca)
    if (!ca.password || !ca.account) {
      wx.showToast({
        title: '账号或密码不能为空\r\n .......',
        icon: 'none',
        duration: 2000
      })
      return
    }
    const unionid = await storageManage.getUnionId();
    if (!unionid) {
      wx.showToast({
        title: '因您没有登录过微商城，现在将跳转至杰尼亚微商城进行授权',
        icon: 'none',
        duration: 2000
      })
      setTimeout(() => {
        let data = {
          path: 'pages/auth-user-info/auth-user-info',
          extraData: {
            from: 'CAlogin'
          }
        }
        app.navigateToMiniProgram_(data.path, data.extraData)
      }, 1500)
    } else {
      this.passWordLogin()
    }
  },
  // 密码登录
  async passWordLogin() {
    const {ca } = this.data
    let { account, password } = ca
    if (!password || !account) {
      wx.showToast({
        title: '账号或密码不能为空\r\n .......',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let encode = Base64.encode(password)
    // 对编码的字符串转化base64
    const par = {
      number: account,
      password: encode
    }
    if (password && account) {
      // 调用账号密码登录接口
      const result = await api.accountLogin(par)
      const { msg, resultCode, data} = result
      console.log(resultCode)
      if (resultCode == 11006) return this.$showToast('密码错误，请重新输入\r\n ......');
      if (resultCode != 1) return this.$showToast(msg);
      const { name, number, storeCode} = data
      // await storageManage.setLoginStatus(true);//77天有效
      // wx.setStorageSync('loginStatus', true);
      await storageManage.setLoginStatus(true)
      const caInfo = {
        caname: name,
        cacode: number,
        storeCode
      }
      // setCaInFo
      await storageManage.setCaInFo(caInfo)
      // wx.setStorageSync('caname', name);
      // wx.setStorageSync('cacode', number);
      // wx.setStorageSync('storeCode', storeCode);
      this.$routeTo('product-list', 'switchTab')
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
