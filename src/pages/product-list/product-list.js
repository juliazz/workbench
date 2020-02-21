import api from '../../api/index.js'
import storageManage from '../../utils/storage-manage'

let productList;// 用于存储整体列表数据
const fetch = async (options) => {
  try {
    return await api.getSearchList({ isWishFirst: 0 })
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
    historyWords: [],
    categoryList: [],
    prizeScope: [{
      low: 0,
      high: 3000
    }, {
      low: 3001,
      high: 5000
    }, {
      low: 5001,
      high: 10000
    }, {
      low: 15000,
      high: 20000
    }, {
      high: '及以上',
      type: 'infinty',
      low: 20000
    }]

  },
  onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // this.$Loading.show()
    this.getProductList(options)
    this.getCategoryList()
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
      searchKeyWord: ''
    })
  },

  async getProductList(options) {
    wx.showLoading()
    const result = await this.$getPreload(fetch, options)
    wx.hideLoading()
    console.log(result)
    const { data, msg, resultCode} = result
    if (resultCode != 1) return this.$showToast(msg);
    productList = data
    this.setData({
      productList: data
    })
  },
  foucusEventer(e) {
    this.setData({
      focus: true
    })
  },
  // 品类列表 暂未使用
  async getCategoryList () {
    wx.showLoading()
    const result = await api.getChildCategory()
    const { msg, resultCode, data} = result
    if (resultCode != 1) return this.$showToast(msg);
    let categoryList = data.map(i => { return i.name })
    this.setData({
      categoryList
    })
    wx.hideLoading()
  },
  async toEcMiniProgram(e) {
    wx.showLoading()
    const caCode = wx.getStorageSync('cacode')
    const { productId } = e.currentTarget.dataset
    const par = {
      productId,
      caCode: caCode,
      type: 0
    }
    const result = await api.addRemoteList(par)
    wx.hideLoading()
    const { msg, resultCode, data} = result
    if (resultCode != 1) return this.$showToast(msg);
    const { recommendedNo} = data
    wx.navigateToMiniProgram({
      appId: 'wxcc92c871c0188fe5',
      path: 'pages/giftlist-ca/giftlist-ca',
      extraData: {
        recommendedNo
      },
      envVersion: 'trial',
      success(res) {
        // 打开成功
      }
    })
  },
  // input输入关键字
  searchEventer(e) {
    const keyword = e.detail.value
    const { type } = e.currentTarget.dataset
    this.searching(keyword, type)
  },

  // 搜索
  searching(keyword, type) {
    if (!keyword) {
      this.setData({
        focus: false
      })
      return
    }
    console.log(keyword)
    const filterRes = this.filterBySearch(keyword, type)
    console.log(filterRes)
    if (filterRes.length) {
      this.setData({
        productList: filterRes,
        focus: false
      })
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
  // 点击类目筛选
  searchCategoryAction(e) {
    console.log(e)
    const { keyword, type} = e.currentTarget.dataset
    this.searching(keyword, type)
  },
  // 搜索框搜索
  filterBySearch(keyWord, type) {
    let filterRes;
    switch (type) {
    case 'prize':
      filterRes = productList.filter((v) => {
        const { low, high} = keyWord
        let result = this.isRangeIn(v.marketPrice, high, low)
        console.log(result)
        if (result) return v
      })

      break;
    case 'category':
      console.log('filtertype', type)
      filterRes = productList.filter((v) => {
        console.log(v.catalogs[0].name.indexOf(keyWord) > -1)
        if (v.catalogs[0].name.indexOf(keyWord) > -1) {
          return v
        }
      })
      break;
    default:
      console.log('filtertype', type)
      filterRes = productList.filter((v) => {
        if (v.productName.indexOf(keyWord) > -1 || v.productCode == keyWord) {
          return v
        }
      })
      break;
    }
    console.log(filterRes)
    return filterRes
  },
  // 参数str判断的字符串 m最小值 n最大值
  isRangeIn(str, maxnum, minnum) {
    let num = parseFloat(str);
    console.log(num, maxnum, minnum)
    switch (maxnum) {
    case '及以上':
      if (num >= minnum) {
        return true;
      }
      return false
    default:
      if (num <= maxnum && num >= minnum) {
        console.log(num, maxnum, minnum)
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
    const {index } = e.currentTarget.dataset
    const productList = this.data.productList
    let recommendListParams = await storageManage.getRemoteProducts() || []
    recommendListParams.push(productList.slice(index, index + 1)[0])
    // 缓存结算参数
    await storageManage.setRemoteoducts(recommendListParams)
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 2000
    })
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
