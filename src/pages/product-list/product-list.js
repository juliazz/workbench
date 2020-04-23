/* eslint-disable no-undef */
import api from '../../api/index.js'
import storageManage from '../../utils/storage-manage'
import orderMessage from '../../utils/orderMessage.js'

let filterListALL;// 用于存储整体列表数据
let filterList;// 用于存储单次搜索结果
let filterRepeat;
const app = getApp()
let isConfirm = false;
const fetch = async (options) => {
  try {
    return await api.getRemoteList({ isWishFirst: 0 })
  } catch (err) {
    return {err}
  }
}
Page({
  $route: 'pages/product-list/product-list',
  /**
   * 页面的初始数据
   */
  data: {
    shareCardShow: true,
    showLoading: true,
    focus: false,
    isSearchingShow: false, // 展示搜索后列表
    historyWords: [],
    filterList: [],
    categoryList: [],
    prizeScope: [{
      low: 0,
      high: 3000,
      action: false // 选中状态
    }, {
      low: 3001,
      high: 5000,
      action: false
    }, {
      low: 5001,
      high: 10000,
      action: false
    }, {
      low: 15000,
      high: 20000,
      action: false
    }, {
      high: '及以上',
      type: 'infinty',
      low: 20000,
      action: false
    }]

  },
  onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.getProductList(options)// 商品库
    this.getProductRemoteList(options) // 推荐商品列表
    this.getCategoryList()// 分类列表
    this.getCatelogList() // 类目列表
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
      searchKeyWord: ''
    })
  },
  async getProductRemoteList(options) {
    wx.showLoading()
    const result = await this.$getPreload(fetch, options)
    wx.hideLoading()
    const { data, msg, resultCode} = result
    if (resultCode != 1) return this.$showToast(msg);
    this.setData({
      productList: data
    })
  },
  async getProductList() {
    wx.showLoading()
    const result = await api.getSearchList()
    wx.hideLoading()
    const { data, msg, resultCode} = result
    if (resultCode != 1) return this.$showToast(msg);
    filterListALL = data
  },
  foucusEventer(e) {
    // 一进来的时候就把搜索列表恢复成完整列表
    filterList = filterListALL
    this.setData({
      focus: true,
      isSearchingShow: true
    })
  },
  confirmEventer() {
    this.setData({
      focus: false
    })
  },
  resetEventer () {
    // 一进来的时候就把搜索列表恢复成完整列表
    filterList = filterListALL
    this.setData({
      searchKeyWord: '',
      filterList
    })
  },
  // 全部类目
  allCategoryEventer () {
    // 搜索列表恢复成完整列表
    filterList = filterListALL
    this.setData({
      filterList,
      isSearchingShow: true
    })
  },

  // input输入关键字
  searchEventer(e) {
    const keyword = e.detail.value
    const { type } = e.currentTarget.dataset
    this.searching(keyword, type)
  },
  // 点击类目筛选
  async searchCategoryAction(e) {
    const { keyword, type, index} = e.currentTarget.dataset
    wx.showLoading()
    filterRepeat = await this.filterBySearch(keyword, type, index)
    filterList = filterRepeat
    if (filterRepeat.length) {
      wx.hideLoading()
      this.setData({
        filterList: filterRepeat,
        isSearchingShow: true
      })
    } else {
      wx.hideLoading()
      wx.showToast({
        title: '未搜索到匹配商品',
        icon: 'none',
        duration: 1500,
        success: (result) => {
          this.resetEventer()
        },
        fail: () => { },
        complete: () => { }
      });
    }
  },

  // 搜索
  async searching(keyword, type) {
    if (!keyword) {
      this.setData({
        focus: false
      })
      return
    }
    wx.showLoading()
    const filterRes = await this.filterBySearch(keyword, type)
    wx.hideLoading()
    if (filterRes.length) {
      this.setData({
        filterList: filterRes,
        isSearchingShow: true,
        focus: false
      })
    } else {
      wx.showToast({
        title: '未搜索到匹配商品',
        icon: 'none',
        duration: 1500,
        success: (result) => {
          this.resetEventer()
        },
        fail: () => { },
        complete: () => { }
      });
    }
  },
  // 搜索框搜索
  filterBySearch(keyWord, type, index) {
    let filterRes;
    let { prizeScope } = this.data
    return new Promise((resolve, reject) => {
      switch (type) {
      case 'prize':
        // 先把其余类目选中清空
        // prizeScope = prizeScope.map((i) => {
        //   return Object.assign(i, {
        //     action: false
        //   })
        // })
        // prizeScope[index].action = 'true'
        // this.setData({prizeScope})
        filterRes = filterList.filter((v) => {
          const { low, high} = keyWord
          let result = this.isRangeIn(v.marketPrice, high, low)
          console.log(result)
          if (result) return v
        })
        break;
      case 'catelog':
        filterRes = filterList.filter((v) => {
          console.log(v.catalogs[0].name, keyWord)
          if (v.catalogs[0].name && v.catalogs[0].name.indexOf(keyWord) > -1) {
            return v
          }
        })
        break;
      case 'category':
        filterRes = filterList.filter((v) => {
          console.log(v.categories[0].name, keyWord)
          if (v.categories[0].name && v.categories[0].name.indexOf(keyWord) > -1) {
            return v
          }
        })
        break;
      default:
        filterRes = filterList.filter((v) => {
          console.log(v.subTitle, v.productCode, keyWord)
          if (v.productName.indexOf(keyWord) > -1 || v.subTitle.indexOf(keyWord) > -1) {
            return v
          }
        })
        break;
      }
      console.log(filterRes)
      resolve(filterRes)
    })
  },
  //  分类列表
  async getCategoryList () {
    wx.showLoading()
    const result = await api.getChildCategory()
    wx.hideLoading()
    const { msg, resultCode, data} = result
    if (resultCode != 1) return this.$showToast(msg);
    let categoryList = data.map(i => {
      let obj = {
        name: i.name,
        filter: i.filter
      }
      return obj
    })
    this.setData({
      categoryList
    })
  },
  // 类目列表
  async getCatelogList () {
    wx.showLoading()
    const result = await api.getChildCatelog()
    wx.hideLoading()
    const { msg, resultCode, data} = result
    if (resultCode != 1) return this.$showToast(msg);
    let catelogList = data.map(i => {
      return i.name
    })
    this.setData({
      catelogList
    })
  },
  // 参数str判断的字符串 m最小值 n最大值
  isRangeIn(str, maxnum, minnum) {
    let num = parseFloat(str);
    switch (maxnum) {
    case '及以上':
      if (num >= minnum) {
        return true;
      }
      return false
    default:
      if (num <= maxnum && num >= minnum) {
        return true;
      }
      return false;
    }
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
  // 添加推荐单
  async addToRemoteList(e) {
    const {index, productCode } = e.currentTarget.dataset
    const {productList, isSearchingShow, filterList} = this.data
    let recommendListParams = await storageManage.getRemoteProducts() || []
    let isInRemoteList = recommendListParams.some((i) => {
      console.log(productCode, i.productCode)
      return i.productCode == productCode
    })
    if (isInRemoteList) return this.$showToast('此商品已存在推荐列表中!');
    console.log(isInRemoteList)
    let item = isSearchingShow ? filterList.slice(index, index + 1)[0] : productList.slice(index, index + 1)[0]
    recommendListParams.push(item)
    // 缓存结算参数
    await storageManage.setRemoteoducts(recommendListParams)
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 2000
    })
  },
  // 订阅消息
  orderMessageShare(eve) {
    const {tempId, productId} = eve.currentTarget.dataset
    orderMessage.orderMessage(tempId, () => {
      this.toEcMiniProgram(productId)
    })
  },
  // 单个商品生成分享单 去微商城
  async toEcMiniProgram(productId) {
    wx.showLoading()
    const caInfo = await storageManage.getCaInFo()
    // const caCode = wx.getStorageSync('cacode')
    const par = {
      productId,
      caCode: caInfo.cacode,
      type: 0
    }
    const result = await api.addRemoteList(par)
    wx.hideLoading()
    const { msg, resultCode, data} = result
    if (resultCode != 1) return this.$showToast(msg);
    const { recommendedNo} = data
    app.navigateToMiniProgram_('pages/giftlist-ca/giftlist-ca', {recommendedNo})
  },
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
