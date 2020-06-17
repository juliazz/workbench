import api from '../../api/index.js'

const fetch = () => {
  try {
    return getApp().getStepList()
  } catch (err) {
    return {}
  }
}
let tabIndex; let rankItemIndex;
let statisicPar = {}

Page({
  $route: 'pages/statistics-rank/statistics-rank',
  /**
   * 页面的初始数据
   */
  data: {
    stepValue: 0,
    isFirstStep: null,
    timeTitle: '总排行'

  },
  onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    if (!options.tabIndex || !options.rankItemIndex) { return this.$showToast('非法进入！') }
    tabIndex = options.tabIndex
    rankItemIndex = options.rankItemIndex
    // 是否还有下一级
    // if (isFirstStep) this.setData({isFirstStep})
    // if(rankTitle) wx.setNavigationBarTitle({title: rankTitle })
    // if(tabIndex){}
    //
    this.$showLoading()
    const stepResult = await this.$getPreload(fetch)
    console.log(stepResult)
    this.$hideLoading()
    console.log(stepResult)
    const stepList = stepResult.map((i) => Object.assign({}, {
      text: i.period_name,
      value: i.id
    }))
    const firstStep = stepList[0]
    this.getStatisicsList(firstStep.id)
    this.setData({timeTitle: firstStep.text, stepList})
  },
  async getStatisicsList(id) {
    let par = {
      search_content: rankItemIndex,
      search_range: Number(tabIndex) + 1,
      period_id: id
    }
    this.$showLoading()
    const result = await api.getStatisics(par)
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    const { title, total, list, unit} = data
    const fullProgressNum = list[0].value
    this.setData({
      statisticsList: list,
      title,
      total,
      fullProgressNum,
      unit
    })
  },
  timeChangeEventer(eve) {
    const index = eve.detail
    console.log(index)
    const timeTitle = this.data.stepList.find((i) => {
      return i.value == index
    })
    console.log(timeTitle)
    this.getStatisicsList(timeTitle.value)
    this.setData({timeTitle: timeTitle.text})
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
