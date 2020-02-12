import api from '../../api/index.js'
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';

const fetch = async (options) => {
  try {
    return await api.getProductList({ type: 'POST', options: { isWishFirst: 0 } })
  } catch (err) {
    return {}
  }
}
let productList = [
  {
    productName: 'TECHMERINO™ A-Maze 运动鞋',
    salePrice: '333300'
  },
  {
    productName: 'TECHMERINO™ A-Maze 运动鞋',
    salePrice: '3300'
  },
  {
    productName: 'TECHMERINO™ A-Maze 运动鞋',
    salesPrice: '33300'
  }];

Page({
  $route: 'pages/product-list/product-list',
  /**
   * 页面的初始数据
   */

  data: {
    shareCardShow: true,
    showLoading: true,
    hotWords: ['上衣', '围巾', '下衣', '童装', '帽子'],
    prizeScope: ['0 ~ 5000', '5000 ~ 10000', '10000 ~ 15000', '15000 ~ 20000', '0 ~ 不限']
  },
  onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // this.$Loading.show()
    this.getProductList(options)
    // this.$wLoading.hide()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      focus: false,
      searchKeyWord: '',
      productList
    })
    Toast.loading({
      mask: true,
      duration: 0,
      message: '加载中...'
    });
    Toast.clear();
  },
  async getProductList(options) {
    const result = await this.$getPreload(fetch, options)
    console.log(result)
    // if (res.resultCode == 1) {
    this.setData({
      productList
    })
    // }
    console.log(result)
  },
  foucusEventer(e) {
    this.setData({
      focus: true
    })

    console.log(e)
  },
  // 点击分享
  toEcMiniProgram: function() {
    wx.navigateToMiniProgram({
      appId: 'wxcc92c871c0188fe5',
      path: 'pages/giftlist/giftlist?pathData=666',
      extraData: {
        remoteID: 'abc'
      },
      envVersion: 'develop',
      success(res) {
        // 打开成功
      }
    })
  },
  // input输入关键字
  searchEventer(e) {
    console.log(e)
    const keyword = e.detail.value
    this.searching(keyword)
  },
  // 搜索
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
  inputLowLimit(eve) {
    const { type } = eve.currentTarget.dataset
    const { value } = eve.detail
    this.setData({
      [type]: value
    })
    if (type == 'high') {
      this.searchByPrize()
    }
  },
  searchByPrize() {
    console.log('根据价格搜索')
  },

  // async getProductList() {
  //   const result = await api.test2()
  //   console.log(result)
  // },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
