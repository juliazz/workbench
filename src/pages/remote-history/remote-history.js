let shareHistoryList = [{
  date: '2020/01/03',
  orderNum: '1234378775',
  expand: false,
  shareList: [
    {
      productName: 'TECHMERINO™ A-Maze 运动鞋',
      salesPrice: '333300'
    },
    {
      productName: 'TECHMERINO™ A-Maze 运动鞋',
      salesPrice: '3300'
    },
    {
      productName: 'TECHMERINO™ A-Maze 运动鞋',
      salesPrice: '33300'
    }
  ]
}];

Page({
  $route: 'pages/remote-history/remote-history',
  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    listHeight: 360,
    popupShow: false, // 弹窗显示
    title: 'remote-history',
    hotWords: ['上衣', '围巾', '下衣', '童装', '帽子'],
    prizeScope: ['0 ~ 5000', '5000 ~ 10000', '10000 ~ 15000', '15000 ~ 20000', '0 ~ 不限']
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(this)
    // this.$wLoading.show()
    this.setData({
      focus: false,
      searchKeyWord: '',
      shareHistoryList
    })
  },
  foucusEventer(e) {
    this.setData({
      focus: true
    })

    console.log(e)
  },
  // input输入关键字
  searchEventer(e) {
    console.log(e)
    const keyword = e.detail.value
    this.searching(keyword)
  },
  tabEventer(e) {
    const {index} = e.currentTarget.dataset
    console.log(e)
    this.setData({
      tabIndex: index
    })
  },
  // 搜s索
  searching(keyword) {
    if (!keyword) {
      this.setData({
        focus: false
      })
      return
    }
    const res = this.filterBySearch(this.data.list, keyword)
    if (res.length) {
      let historyWords = this.data.historyWords
      // 从前面加入历史搜索词
      historyWords.unshift(keyword)
      console.log(historyWords)
      // this.handleHistoryWords(historyWords)
      // 去重
      let newArr = Array.from(new Set(historyWords));
      // 截取前8个
      newArr = newArr.slice(0, 8)
      wx.setStorageSync('historyWords', newArr)
      this.setData({
        historyWords: newArr
      })
      console.log(this.data.historyWords)

      wx.setStorageSync('searchList', res)
      this.$to(`search/search?keyword=${keyword}`)
    } else {
      wx.showToast({
        title: '未搜索到匹配商品',
        icon: 'none',
        duration: 1500,
        success: (result) => {
          this.setData({
            focus: false,
            searchKeyWord: ''
          })
        },
        fail: () => { },
        complete: () => { }
      });
    }
  },
  filterBySearch(list, keyWord) {
    const filterRes = list.filter((v) => {
      if (v.productName.indexOf(keyWord) > -1) {
        return v
      }
    })
    console.log(filterRes)
    return filterRes
  },
  // 点击关键字
  searchKeyWord(e) {
    console.log(e)
    const { keyword } = e.currentTarget.dataset
    this.searching(keyword)
  },
  delHistoryWords() {
    this.setData({
      historyWords: []
    })
    wx.setStorageSync('historyWords', [])
  },
  expandEventer(e) {
    const { index} = e.currentTarget.dataset
    console.log(index)
    let shareHistoryList = this.data.shareHistoryList
    shareHistoryList[index].expand = !shareHistoryList[index].expand
    this.setData({
      shareHistoryList
    })
  },
  onClose() {
    this.setData({
      popupShow: false
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
