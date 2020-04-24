const fetch = async (options) => {
  try {
    return await Promise.resolve({code: 0})
  } catch (err) {
    return {}
  }
}

Page({
  $route: 'pages/work-bench/work-bench',
  /**
   * 页面的初始数据
   */
  data: {
    popupType: 'pop-changeActive',
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
    ]// 展开状态数组


  },
  onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    this.$showLoading()
    // this.getTabBar().hideTabBar();
    const result = await this.$getPreload(fetch, options)
    console.log(result)
    this.$hideLoading()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
  // 选择海报 或 直播邀请
  choosePost(eve) {
    const {index, type} = eve.currentTarget.dataset
    console.log(index, type)
    this.setData({
      [`${type}`]: index
    })
  },
  viewMore: function(eve) {
    const { index } = eve.currentTarget.dataset
    let { unfoldStateList } = this.data
    this.setData({
      [`unfoldStateList[${index}].state`]: !unfoldStateList[index].state
    })
  },
  // 核销码输入
  bindinput(e) {
    console.log(e)
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
