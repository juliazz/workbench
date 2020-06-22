import api from '../../api/index.js'
import util from '../../utils/utils'
import fileHelper from '../../utils/fileHelper.js'
import storangeMange from '../../utils/storage-manage';

const {base64src} = fileHelper
const app = getApp()
const fetch = async (options) => {
  try {
    return await api.getUserActivities(options)
  } catch (err) {
    return {}
  }
}
let Timer; let user_id;
Page({
  $route: 'pages/work-bench/work-bench',
  /**
   * 页面的初始数据
   */
  data: {
    showPage: true,
    popupType: '',
    postCurrent: 0,
    liveCurrent: 0,
    activeId: null,
    unfoldStateList: [{
      state: false
    }, {
      state: false
    }, {
      state: false
    }
    ], // 展开状态数组
    userAreaData: { // 个人区域数据

    }
  },
  onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    // 一进来先判断有没有注册过
    await this.isRegister()
    console.log('work-bench---------------onLoad')
    user_id = await storangeMange.getUserId()
    console.log(user_id)
    // if (!user_id) { this.$routeTo('webview') }
    // 在判断有没有授权过
    const userInfo = await storangeMange.getUserInfo()
    // if(!userInfo){this.setData({popupType:'getUserInfo'})}
    this.$showLoading()
    const result = await this.$getPreload(fetch, {user_id, auth: true})
    this.getRankInfo()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    // const activeId = data[0].activity_id
    const activeId = 1
    await storangeMange.setActivityId(activeId)
    // await storangeMange.setActivityId(1)
    // 默认选中第一个活动
    this.getActivityData(activeId)
    this.setData({activeList: data, activeId, showPage: true})
    this.$hideLoading()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  async isRegister() {
    const loginStatus = await storangeMange.getLoginStatus()
    console.log('loginStatus======', loginStatus)
    if (loginStatus) {
      return
    }
    const register = await api.getUserResiInfo()
    const { msg, data, status } = register;
    if (status != '200') return this.$showToast(msg);
    // 是否有进入小程序的权限
    console.log(data)
    console.log('!data.forward', !data.forward)
    if (!data.forward) {
      this.$routeTo('widthdraw')
      return
    }
    //  是否是主办方
    storangeMange.setLoginStatus(data)
  },
  // 根据活动id查活动数据
  async getActivityData(activeId) {
    this.$showLoading()
    const result = await api.getActivityInfo({activity_id: activeId})
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    await storangeMange.setActivityId(activeId)
    let {info, period, rights, fund, poster, live_qrcode, activity_reg_qrcode, view_shop} = data
    info.start_date = util.getMouthDay(info.start_date)
    info.end_date = util.getMouthDay(info.end_date)
    period.start_datetime = util.formatDate2(period.start_datetime)
    period.end_datetime = util.formatDate2(period.end_datetime)
    this.showTimeDown(period.end_time * 1000 - period.current_time * 1000)
    // 成员注册码、
    const activeCode = await this.getBase64ImageUrl(activity_reg_qrcode)
    // 用户等级 及等级信息（订单录入）
    getApp().globalData.orderInType = rights
    this.setData({
      info,
      period,
      fund,
      rights,
      poster,
      live_qrcode,
      activeCode,
      view_shop
    })
  },
  async getRankInfo() {
    const result = await api.getRankInfo()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    // const {list, rule} = data
    // const {apartment, brand, person, zone} = list
    // app.globalData.coinRule = rule
    this.setData({
      person:data[0],
      apartment:data[1], // 部门
      brand:data[2],
      zone:data[3]// 战区
    })
  },
  // 点击列表更改选中activeId
  changeActive: function(eve) {
    const { activeId } = eve.currentTarget.dataset
    this.setData({
      activeId
    })
  },
  // 点击确认后请求对应活动数据
  sureChangeActive: function() {
    const { activeId } = this.data
    this.getActivityData(activeId)
    this.setData({popupType: ''})
  },
  // 倒计时
  showTimeDown(time) {
    console.log(time)
    if (time > 0) {
      let activeEndTime = util.formatDuring(time)
      this.setData({ activeEndTime })
    }
    if (time < 0) {
      clearInterval(Timer)
      return
    }
    Timer = setInterval(() => {
      time = time - 60000
      if (time > 0) {
        let activeEndTime = util.formatDuring(time)
        this.setData({ activeEndTime })
      }
      if (time < 0) {
        clearInterval(Timer)
        this.setData({ activeEndTime: 0 })
      }
    }, 60000)
  },

  popupShow: function(eve) {
    const { popupType } = eve.currentTarget.dataset
    if (popupType == 'choosePoster' || popupType == 'liveInvite') { this.getTabBar().hideTabBar(); }
    this.setData({
      popupType
    })
  },
  closePopup: function(eve) {
    const { popupType } = eve.currentTarget.dataset
    if (popupType == ('choosePoster' || 'liveInvite')) { this.getTabBar().showTabBar(); console.log('showTabBarshowTabBar') }
    this.setData({
      popupType: ''
    })
  },
  // 选择海报 或 直播邀请
  choosePost(eve) {
    const {index, type} = eve.currentTarget.dataset
    console.log(index, type)
    this.setData({
      [`${type}`]: index
    })
  },
  // 点击开始的时间
  timestart: function(e) {
    this.setData({ timestart: e.timeStamp });
  },
  // 点击结束的时间
  timeend: function(e) {
    const {url} = e.currentTarget.dataset
    this.setData({ timeend: e.timeStamp });
    this.savePhoto(url)
  },
  // 把base64转换成图片
  async getBase64ImageUrl(data) {
    return new Promise((resolve, reject) => {
      base64src(data, (res) => {
        resolve(res)
      })
    })
  },
  savePhoto(url) {
    let times = this.data.timeend - this.data.timestart;
    if (times > 1000) {
      wx.downloadFile({
        url,
        success: async(res) => {
          this.setData({
            tempFilePath: res.tempFilePath
          })
          const { errMsg } = await wx.$saveImageToPhotosAlbum({
            filePath: res.tempFilePath
          })
          if (errMsg == 'saveImageToPhotosAlbum:ok') {
            this.$showToast('图片已保存至本地')
          }
        },
        fail: (params) => {
          console.log(params)
        }
      });
    }
  },
  // 核销码输入
  bindblur(e) {
    const {value } = e.detail
    this.setData({
      barCodeNum: value
    })
    const par = {
      hx_code: value,
      type: 'order'
    }
    this.scanCode(par)
  },

  openScan() {
    wx.scanCode({
      onlyFromCamera: true,
      success: (ev) => {
        console.log('scanCode->', ev)
        let { errMsg, result } = ev
        if (errMsg != 'scanCode:ok') {
          return this.$showToast('扫码失败')
        }
        result = JSON.parse(result)
        this.scanCode(result)
      }
    })
  },
  // 获取马信息
  async scanCode(result) {
    const getResult = await api.checkOffCode(result)
    const { msg, data, status } = getResult;
    if (status != '200') return this.$showToast(msg);
    app.globalData.scanRes = data
    console.log('app.globalData.scanRes', app.globalData.scanRes)
    this.setData({
      popupType: ''
    })
    this.$routeTo('order-type-in?type=bar')
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
    if (Timer) clearInterval(Timer)
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    if (Timer) clearInterval(Timer)
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
