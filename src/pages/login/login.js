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
    this.getLoginStatus()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(option) {
  },
  async getLoginStatus() {
    this.$showLoading()
    this.$hideLoading()
    const { code} = await wx.$login();
    console.log(code)
    // const result = await request.get({
    //   url: 'getopenid',
    //   auth: true
    // });
    wx.request({
      url: `${config.baseUrl}getopenid`,
      data: {
        code
      },
      method: 'POST',
      success: (res) => {
        const response = res.data
        console.log(response)
        // const { token, openId } = response.data
        // if (response.resultCode == 1) {
        // 缓存token两小时
        // localStorage.set('token', token, 120)
        // // 用于跟踪用户行为
        // wx.setStorageSync('openId', openId)
        // // ca推荐单浏览数据
        // wx.setStorageSync('nickName', nickName)
        // // 缓存用户手机号
        // wx.setStorageSync('phone', phone);
        // cb && cb();
        // wx.setOpenid(openId)
        // wx.init()
        // }
      },
      fail: (err) => {
      },
      complete: (res) => {
        // callBackQueue.forEach(cb => cb && typeof(cb) === 'function' && cb())
        // callBackQueue = []
      }
    })
    // wx.hideLoading()
    // const { data, resultCode } = result
    // if (resultCode != '1') throw new Error('Token fetch failed');
    // const { token, unionid } = data;
    // await tokenManage.set(token);
    // console.log(unionid, 'unionid')
    // if (unionid) {
    // await storageManage.setUnionId(unionid);
    // const loginStatus = await storageManage.getLoginStatus();
    // if (loginStatus) {
    //   this.$routeTo('product-list', 'switchTab')
    // }
    // }
  },
  getUserInfoEventer(eve) {
    console.log(eve)
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
