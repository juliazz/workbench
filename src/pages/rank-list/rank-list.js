import ruleList from './rule'
import api from '../../api/index.js'
import util from '../../utils/utils'

let cat_type_id
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
    cat_type_id = options.cat_type_id
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
    const stepResult = await this.$getPreload(fetch)
    const stepList = stepResult.map((i) => Object.assign({}, {
      text: i.name,
      value: i.id,
      start_datetime: util.formatDate2(i.start_datetime),
      end_datetime: util.formatDate2(i.end_datetime)
    }))
    const firstStep = stepList[0]
    this.getRankDetail(firstStep.value)
    this.setData({
      rankType,
      stepList,
      ruleList: rule
    })
  },
  async getRankDetail(id) {
    const par = {
      type,
      cat_type_id,
      period_id: id
    }
    this.$showLoading()
    const result = await api.getRankDetail(par)
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    const {total_point, per_point,total_reward} = data
    filterList = data.data
    // 查找标题
    const timeTitle = this.data.stepList.find((i) => {
      return i.value == id
    })
    this.setData({
      timeTitle,
      total_point,
      per_point,
      total_reward,
      list: filterList
    })
  
  },
  bindImgLoad(){
    this.$hideLoading()
  },
  timeChangeEventer(eve) {
    const index = eve.detail
    this.getRankDetail(index)
  },

  filterBySearch(eve) {
    const keyWord = eve.detail
    console.log(keyWord)
    let filterRes = filterList.filter((v) => {
      if (v.name.indexOf(keyWord) > -1 || v.cat_name.indexOf(keyWord) > -1) {
        return v
      }
    })
    if(!keyWord){
      filterRes= filterList
    }
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

  }
})
