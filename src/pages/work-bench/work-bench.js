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
    showPage: false,
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
    // this.setData({is_host, showPage: true})
    this.setData({showPage: true})
    // 再判断有没有授权过
    // const userInfo = await storangeMange.getUserInfo()
    // if(!userInfo){this.setData({popupType:'getUserInfo'})}
    this.$showLoading()
    const result = await this.$getPreload(fetch, {user_id, auth: true})
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    // 默认选中第一个活动
    const activeId = data[0].activity_id
    await storangeMange.setActivityId(activeId)
    this.getActivityData(activeId)
    this.setData({activeList: data, activeId})
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getRankInfo()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },

  // 根据活动id查活动数据
  async getActivityData(activeId) {
    this.$showLoading()
    await storangeMange.setActivityId(activeId)
    const result = await api.getActivityInfo({activity_id: activeId})
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    let {info, period, rights, fund, poster, live_qrcode, activity_reg_qrcode, view_shop} = data
    info.start_date = util.getMouthDay(info.start_date)
    info.end_date = util.getMouthDay(info.end_date)
    period.start_datetime = util.formatDate2(period.start_datetime)
    period.end_datetime = util.formatDate2(period.end_datetime)
    this.showTimeDown(period.end_time * 1000 - period.current_time * 1000)
    // 成员注册码、
    const activeCode = await this.getBase64ImageUrl(activity_reg_qrcode)
    // rights = rights.find((i) => {
    //   console.log(i, activeId)
    //   return i.id == activeId
    // })
    // console.log('rights==========', rights)
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
  toMiniAPP() {
    wx.navigateToMiniProgram({
      appId: '',
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
  async getRankInfo() {
    this.$showLoading()
    const result = await api.getRankInfo()
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    // const {list, rule} = data
    // const {apartment, brand, person, zone} = list
    // app.globalData.coinRule = rule
    this.setData({
      person: data[0],
      apartment: data[1], // 部门
      brand: data[2],
      zone: data[3]// 战区
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
    console.log('activeId=======', activeId)
    this.getActivityData(activeId)
    this.getRankInfo()
    this.setData({popupType: ''})
  },
  // 倒计时
  showTimeDown(time) {
    if (time > 0) {
      const activeEndTime = util.formatDuring(time)
      this.setData({ activeEndTime })
    }
    if (time < 0) {
      clearInterval(Timer)
      return
    }
    Timer = setInterval(() => {
      time = time - 1000
      if (time > 0) {
        const activeEndTime = util.formatDuring(time)
        this.setData({ activeEndTime })
      }
      if (time < 0) {
        clearInterval(Timer)
        this.setData({ activeEndTime: 0 })
      }
    }, 1000)
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
    console.log(url)
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
  // 获取码信息
  async scanCode(result) {
    console.log(result)
    const getResult = await api.checkOffCode(result)
    const { msg, data, status } = getResult;
    if (status != '200') return this.$showToast(msg);
    app.globalData.scanRes = data
    console.log('app.globalData.scanRes', app.globalData.scanRes)
    if (result.type == 'order') {
      this.$routeTo('order-type-in?type=bar')
    } else {
      this.$showToast('扫码成功！');
    }
    this.setData({
      popupType: ''
    })
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
  }
})
