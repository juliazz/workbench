import ruleList from './rule'
import api from '../../api/index.js'
import util from '../../utils/utils'

const fetch = () => {
  try {
    return getApp().getStepList()
  } catch (err) {
    return {}
  }
}
let type;
let filterList = [];
Page({
  $route: 'pages/rank-list/rank-list',
  /**
   * 页面的初始数据
   */
  data: {
    popupType: '',
    expandIndex: null, // 查看数据展开的index
    stepValue: 0, // 活动阶段
    ruleList: []
  },
  onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    const {rankType, ruleId } = options
    const rule = ruleList[Number(ruleId) - 1]
    switch (Number(ruleId)) {
    case 1:
      type = 'person'
      console.log('type', type)
      break;
    case 2:
      type = 'brand'
      break;
    case 3:
      type = 'department'
      break;
    case 4:
      type = 'zone'
      break;
    }
    this.$showLoading()
    const stepResult = await this.$getPreload(fetch)
    this.$hideLoading()
    const stepList = stepResult.map((i) => Object.assign({}, {
      text: i.period_name,
      value: i.id,
      start_datetime: util.formatDate2(i.start_datetime),
      end_datetime: util.formatDate2(i.end_datetime)
    }))
    const firstStep = stepList[0]
    this.getRankList(firstStep.value)
    this.setData({
      rankType,
      stepList,
      ruleList: rule
    })
  },
  async getRankList(id) {
    const par = {
      type,
      period_id: id
    }
    this.$showLoading()
    const result = await api.getRankList(par)
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    const {current_data, info, list} = data
    filterList = list
    const timeTitle = this.data.stepList.find((i) => {
      return i.value == id
    })
    this.setData({
      timeTitle,
      current_data,
      info,
      list: filterList
    })
  },
  timeChangeEventer(eve) {
    const index = eve.detail
    this.getRankList(index)
  },
  filterBySearch(eve) {
    console.log(eve)
    const keyWord = eve.detail
    console.log(keyWord)
    let filterRes = filterList.filter((v) => {
      if (v.name.indexOf(keyWord) > -1 || v.brand.indexOf(keyWord) > -1) {
        return v
      }
    })
    this.setData({list: filterRes})
  },
  popupShow: function(eve) {
    const { popupType } = eve.currentTarget.dataset
    this.setData({
      popupType
    })
  },
  closePopup: function(eve) {
    this.setData({
      popupType: ''
    })
  },
  collapseEventer(eve) {
    const {expandIndex} = this.data
    let {index} = eve.currentTarget.dataset
    index = expandIndex == index ? null : index
    this.setData({
      expandIndex: index
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

  }
})
