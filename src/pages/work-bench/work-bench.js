import api from '../../api/index.js'
import util from '../../utils/utils'
import storangeMange from '../../utils/storage-manage';
// import { getSetting } from '../../utils/getSetting.js'
const fetch = async (options) => {
  try {
    return await api.accountLogin()
  } catch (err) {
    return {}
  }
}
let Timer
Page({
  $route: 'pages/work-bench/work-bench',
  /**
   * 页面的初始数据
   */
  data: {
    popupType: '',
    activeList: [
      {
        name: '5.1-5.5 [欧派]全国直播',
        id: 1
      },
      {
        name: '5.6-5.10 [欧派]全国直播',
        id: 2
      },
      {name: '5.10-5.15 [欧派]全国直播',
        id: 3
      }
    ],
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
    activeId: 1,
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
    await storangeMange.setActivityId(1)
    // const result = await this.$getPreload(fetch, options)
    // console.log(result)
    // 模拟倒计时 接口来了在接口返回时间处调用
    let oDate2 = new Date().getTime();// 现在
    let oDate3 = new Date('2020-5-30 00:00').getTime();// 凌晨就是5月12号
    console.log(oDate3 - oDate2)
    this.showTimeDown(1754026643)
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
    }, 6000)
  },
  changeActive: function(eve) {
    const { activeId } = eve.currentTarget.dataset
    this.setData({
      activeId
    })
  },
  // 点击确认后请求对应活动数据
  sureChangeActive: function() {
    const { activeId } = this.data
    this.$showLoading()
    this.$hideLoading()
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
  $onOpenSetting(e) {
    const { authSetting } = e.detail
    if (authSetting['scope.writePhotosAlbum'] === true) {
      this.setData({
        authSaveAlbum: true
      })
    } else {
      this.setData({
        authSaveAlbum: false
      })
      wx.showModal({
        title: '提示',
        content: '获取权限失败，将无法保存到相册哦~',
        showCancel: false
      })
    }
  },
  // 选择海报 或 直播邀请
  choosePost(eve) {
    const {index, type} = eve.currentTarget.dataset
    console.log(index, type)
    this.setData({
      [`${type}`]: index
    })
  },
  // viewMore: function(eve) {
  //   const { index } = eve.currentTarget.dataset
  //   let { unfoldStateList } = this.data
  //   this.setData({
  //     [`unfoldStateList[${index}].state`]: !unfoldStateList[index].state
  //   })
  // },
  // 点击开始的时间
  timestart: function(e) {
    this.setData({ timestart: e.timeStamp });
  },
  // 点击结束的时间
  timeend: function(e) {
    this.setData({ timeend: e.timeStamp });
    this.savePhoto()
  },
  savePhoto() {
    let times = this.data.timeend - this.data.timestart;
    let _that = this;
    if (times > 1000) {
      console.log('this.data.tempFilePath===', this.data.tempFilePath)
      wx.downloadFile({
        url: 'https://api.fmlesson.cn/upload/20200421/8dc1e6a77a1f8245ad999265b2413c64.jpg',
        success: async(res) => {
          console.log('res===', res)
          console.log(res.tempFilePath)
          this.setData({
            tempFilePath: res.tempFilePath
          })
          const { errMsg } = await wx.$saveImageToPhotosAlbum({
            filePath: res.tempFilePath
          })
          if (errMsg == 'saveImageToPhotosAlbum:ok') {
            this.$showToast('图片已保存至本地')
          }
          // 图片保存到本地
          // wx.saveImageToPhotosAlbum({
          //   filePath: this.data.tempFilePath,
          //   success: function(data) {
          //     _that.setData({ savePopupShow: true, saveSucess: true });
          //   },
          //   fail: function(err) {
          //     console.log(err);
          //     _that.setData({ savePopupShow: true, saveSucess: false });
          //     // if (err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
          //     // }
          //   },
          //   complete(res) {
          //     console.log(res);
          //   }
          // });
        },
        fail: (params) => {
        }
      });
    }
  },
  // 核销码输入
  bindinput(e) {
    console.log(e)
  },
  openScan() {
    wx.scanCode({
      onlyFromCamera: true,
      success: (ev) => {
        console.log('scanCode->', ev)
        // this.scanCode(ev)
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  onPageScroll: function(event) {
    const { scrollTop } = event
    console.log(event)
    console.log(scrollTop)
    if (scrollTop <= 0) {
      this.setData({_fixed: true})
      return
    }
    this.setData({
      _fixed: false
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
