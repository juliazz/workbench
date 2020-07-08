import api from '../../api/index.js'
import util from '../../utils/utils'

const fetch = async () => {
  try {
    return await api.getFinanceInfo()
  } catch (err) {
    return {}
  }
}
let personIndex = 1;// 个人页数
let totalPage;
let totalData = [];
Page({
  $route: 'pages/finance/finance',
  /**
   * 页面的初始数据
   */
  data: {
    activeTabIndex: 0,
    personDetailShow: false,
    popupType: '',
    tabs: ['品牌财务', '个人财务'],
    tabs1: [ '个人财务'],
    explainRule: [{
      title: '1.推广费用余额',
      content: ' 阅读红包、浏览红包、金币兑换指出等费用由所有品牌平摊'
    }, {
      title: '2.推广费用均摊支出',
      content: ' 推广总费用／品牌数'
    }],
    personDetailList: []
  },
  onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function() {
    this.$showLoading()
    const result = await this.$getPreload(fetch)
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    const { brand, personal, is_charge} = data
    this.setData({brand, personal, is_charge})
  },
  // 个人查看详情
  showPersonDetail: function() {
    this.setData({personDetailShow: true})
    this.getPersonalFinaceDetail()
    this.getPersonalFundInfo()
  },
  hidePersonDetail() {
    this.setData({
      personDetailShow: false
    })
  },
  // 个人详情头部信息
  async getPersonalFundInfo() {
    this.$showLoading()
    const result = await api.getPersonalFundInfo()
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    this.setData({personCount: data})
  },
  async getPersonalFinaceDetail() {
    if (personIndex > totalPage) return this.$showToast('没有更多数据啦！');
    const par = {
      page: personIndex,
      limit: 10
    }
    const result = await api.getPersonalCashLog(par)
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    totalPage = data.last_page
    const personDetailList = data.data.map((i) => {
      i.time = util.myTime(i.time)
      return i
    })
    totalData = totalData.concat(personDetailList)
    this.setData({personDetailList: totalData})
  },

  onChange: function(eve) {
    const {index} = eve.detail
    this.setData({
      activeTabIndex: index
    })
  },
  toWidthDraw() {
    this.$routeTo(`widthdraw?value=${this.data.personal.money}`)
  },
  toRecharge() {
    this.$routeTo('recharge')
  },
  popupShow: function(eve) {
    this.setData({
      popupType: 'pop-explain'
    })
  },
  closePopup: function(eve) {
    this.setData({
      popupType: ''
    })
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

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.personDetailShow) { return }
    personIndex++
    console.log('personIndex', personIndex)
    this.getPersonalFinaceDetail()
  }
})
