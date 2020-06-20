import api from '../../api/index.js'
const fetch = async (options) => {
  try {
    return await  api.getStaticHomeData()
  } catch (err) {
    return {}
  }
}

Page({
  $route: 'pages/statistics/statistics',
  /**
   * 页面的初始数据
   */
  data: {
    activeTabIndex: 1,
    activeNumViewTab: 1, // 数据总览切换
    activeRankItemIndex: null,
    numViewTabs: ['主办方', '品牌']
  },
  onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    this.$showLoading()
    const result = await this.$getPreload(fetch, options)
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    const {brand_rank,host_rank, menu_list} = data
    this.setData({
      brand_rank,
      host_rank,
      menu_list
    })
    console.log(result)
    this.$hideLoading()
  },
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.index + 1}`,
      icon: 'none'
    });
    this.setData({
      activeTabIndex: event.detail.index
    })
  },
  rankItemClick(eve) {
    const {rankName, rankId, rankIndex} = eve.currentTarget.dataset
    const {activeTabIndex, tabs } = this.data
    const rankTitle = tabs[activeTabIndex].name + `${rankName}`
    console.log(rankTitle)
    this.setData({
      activeRankItemIndex: rankIndex
    })
    let isFirstStep = activeTabIndex == 0 ? 1 : 0
    // this.$routeTo(`statistics-rank?tabIndex=${activeTabIndex}&rankItemIndex=${rankId}&isFirstStep=${isFirstStep}&rankTitle=${rankTitle}`)
  },
  onNumViewChange(event) {
    this.setData({
      activeNumViewTab:event.detail.index
    })
    wx.showToast({
      title: `切换到数据总览 ${event.detail.index + 1}`,
      icon: 'none'
    });
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
