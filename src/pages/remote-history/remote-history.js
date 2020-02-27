/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
/* eslint-disable default-case */
import api from '../../api/index.js'
import utils from '../../utils/utils'
import storageManage from '../../utils/storage-manage';

let pageNumber = 1;
let caCode = '';
let productList = []
let shareHistoryList = []; // 用于存储数据

Page({
  $route: 'pages/remote-history/remote-history',
  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    listHeight: 360,
    inputValue: '',
    time: {
      from: '2020-02-01',
      to: ''
    },
    popupShow: false, // 弹窗显示
    title: 'remote-history',
    hotWords: ['上衣', '围巾', '下衣', '童装', '帽子'],
    prizeScope: ['0 ~ 5000', '5000 ~ 10000', '10000 ~ 15000', '15000 ~ 20000', '0 ~ 不限']
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const caInfo = await storageManage.getCaInFo()
    // caCode = wx.getStorageSync('cacode') || ''
    caCode = caInfo.cacode
    console.log(caCode)
    this.setData({
      searchKeyWord: ''
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const endDate = utils.getNowFormatDate()
    this.getRemoteHistory()
    this.setData({
      'time.to': endDate
    })
  },
  // 搜s索
  confirmEventer(e) {
    const keyword = e.detail.value
    if (!keyword) {
      return
    }
    this.setData({
      inputValue: keyword
    })
    const res = this.filterBySearch(shareHistoryList, keyword)
    if (res.length) {
      this.setData({
        shareHistoryList: res
      })
      // this.$routeTo('product-list')
    } else {
      wx.showToast({
        title: '未搜索到匹配推荐单！',
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
      v.recommendedNo += ''
      if (v.recommendedNo.indexOf(keyWord) > -1) {
        return v
      }
    })
    console.log(filterRes)
    return filterRes
  },

  tabEventer(e) {
    const {index} = e.currentTarget.dataset
    console.log(e)
    this.setData({
      tabIndex: index
    })
  },

  async bindDateChange(eve) {
    const {type } = eve.currentTarget.dataset
    const {value } = eve.detail
    const { from, to} = this.data.time
    switch (type) {
    case 'from':
      this.setData({
        'time.from': value,
        inputValue: ''
      })

      break;
    case 'to':
      if (!from) return this.$showToast('请先选择开始时间');
      const fromUnix = utils.getUnixTime(from);
      const toUnix = utils.getUnixTime(value)
      if (fromUnix > toUnix) return this.$showToast('开始时间不能大于结束时间');
      this.setData({
        'time.to': value,
        inputValue: ''
      })
      // 根据时间查推荐单
      this.getRemoteHistory(this.data.time.from, value)
      break;
    }
  },
  // 查询推荐历史
  async getRemoteHistory (from, to) {
    wx.showLoading()
    const caInfo = await storageManage.getCaInFo()
    // caCode = wx.getStorageSync('cacode') || ''
    const caCode = caInfo.cacode
    console.log(from, to, caCode)
    let par = {}
    if (from && to) {
      par = {
        beginDate: from || '',
        endDate: to || '',
        caCode,
        pageSize: 0,
        pageNumber
      }
    } else {
      par = {
        caCode,
        pageSize: 0,
        pageNumber
      }
    }
    const result = await api.searchRemoteList(par)
    wx.hideLoading()
    const { msg, resultCode, data} = result
    if (resultCode != 1) return this.$showToast(msg);
    if (!data.length && par.beginDate && par.endDate) return this.$showToast('未找到该时间段的推荐历史！');
    let data_ = data.map((item) => {
      return Object.assign(item, {
        createdDate: utils.myTime(item.createdDate), // 格式化时间
        expand: false
      })
    })
    shareHistoryList = data_
    this.setData({
      shareHistoryList: data_
    })
  },
  // 展开列表
  expandEventer(e) {
    const { index, productIds, expand} = e.currentTarget.dataset
    console.log(productIds)
    let shareHistoryList = this.data.shareHistoryList
    shareHistoryList[index].expand = !expand
    this.setData({
      shareHistoryList
    })
    if (!expand) {
      // 根据id查分享单详情
      this.getRemoteListDetail({ids: productIds})
    }
  },
  async getRemoteListDetail(par) {
    wx.showLoading()
    const result = await api.RemoteListDetail(par)
    wx.hideLoading()
    const {resultCode, data, msg} = result
    if (resultCode != 1) return this.$showToast(msg);
    this.setData({
      productList: data
    })
  },
  onClose() {
    this.setData({
      popupShow: false
    })
  },
  // 分享阅读详情
  async viewShareDetail(eve) {
    wx.showLoading()
    const {orderNum} = eve.currentTarget.dataset
    console.log(orderNum)
    const result = await api.RemoteListViewDetail({
      id: orderNum
      // id: '1581653312909'测试
    })
    wx.hideLoading()
    console.log(result)
    const {resultCode, data, msg} = result
    if (resultCode === '11009') return this.$showToast('该分享单暂无浏览记录~');
    if (resultCode != 1) return this.$showToast(msg);
    let data_ = data

    data_ = data_.map((item) => {
      return Object.assign(item, {
        visitDate: utils.myTime(item.visitDate)
      });
    })
    console.log(data_)
    this.setData({
      popupShow: true,
      viewList: data_

    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log('----------触底了-------')
    pageNumber++;
    // this.getRemoteHistory()
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
    pageIndex = 1
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  }


})
