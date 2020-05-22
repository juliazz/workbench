import api from '../../api/index.js'
import util from '../../utils/utils'
import fileHelper from '../../utils/fileHelper.js'
import storangeMange from '../../utils/storage-manage';
const {base64src} = fileHelper

const fetch = async (options) => {
  try {
    return await api.accountLogin()
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
    posterImgs: [{
      imgUrl: '../../assets/image/poster1.jpg'
    }, {
      imgUrl: '../../assets/image/poster2.jpg'
    }, {
      imgUrl: '../../assets/image/poster2.jpg'
    }, {
      imgUrl: '../../assets/image/poster2.jpg'
    }, {
      imgUrl: '../../assets/image/poster2.jpg'
    }, {
      imgUrl: '../../assets/image/poster2.jpg'
    }, {
      imgUrl: '../../assets/image/poster2.jpg'
    }
    ],
    type: '2d',
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
  // onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    this.$showLoading()
    user_id = 1
    this.getUserActivities()

    // const result = await this.$getPreload(fetch, options)
    // console.log(result)
    // 模拟倒计时 接口来了在接口返回时间处调用
    // let oDate2 = new Date().getTime();// 现在
    // let oDate3 = new Date('2020-5-30 00:00').getTime();// 凌晨就是5月12号
    // console.log(oDate3 - oDate2)
    // this.showTimeDown(1754026643)
    this.$hideLoading()
    // 检查授权
    //  getSetting().then((res) => {
    //   this.setData({
    //     authSaveAlbum: res['scope.writePhotosAlbum']
    //   })
    // })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  async getUserActivities() {
    const result = await api.getUserActivities({user_id, auth: true})
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    const activeId = data[0].activity_id
    // 默认选中第一个活动
    this.getActivityData(activeId)
    this.setData({activeList: data, activeId})
  },
  // 根据活动id查活动数据
  async getActivityData(activeId) {
    this.$showLoading()
    const result = await api.getActivityInfo({activity_id: activeId})
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    await storangeMange.setActivityId(activeId)
    let {info, period, fund, poster ,live_qrcode, activity_reg_qrcode} = data
    info.start_date = util.getMouthDay(info.start_date)
    info.end_date = util.getMouthDay(info.end_date)
    period.start_datetime = util.formatDate2(period.start_datetime)
    period.end_datetime = util.formatDate2(period.end_datetime)
    this.showTimeDown(period.end_time * 1000 - period.current_time * 1000)
    // 海报数据、
    const activeCode = await this.getBase64ImageUrl(activity_reg_qrcode)
    console.log('activeCode======',activeCode)
    this.setData({
      activityData: {info, period, fund},
      poster,
      live_qrcode,
      activeCode,
      showPage: true
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
      console.log(activeEndTime)
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
        console.log(activeEndTime)
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
  //把base64转换成图片
  async getBase64ImageUrl(data) {
    return new Promise((resolve, reject)=>{
      base64src(data,(res)=>{
        resolve(res)
      })
    })
    // return base64ImgUrl
    /// 刷新数据
  //   this.setData({
  //     baseImgUrl:base64ImgUrl
  //   })
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
  bindinput(e) {
    this.setData({
      barCodeNum:e.detail.value
    })
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
  async scanCode(result){
    const getResult = await api.checkOffCode(result)
    const { msg, data, status } = getResult;
    if (status != '200') return this.$showToast(msg);
    getApp().globalData.scanRes = data
    this.$routeTo(`order-type-in`)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '',
      path: '/pages/home/home',
      imageUrl: '../../assets/images/share-img.jpg'
    }
  }
})
