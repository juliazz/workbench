import api from '../../api/index.js'

const fetch = async (options) => {
  try {
    return await api.getStaticHomeData()
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
    activeTabIndex: null,
    activeNumViewTab: 0, // 数据总览切换
    activeRankItemIndex: null,
    numViewTabs: ['品牌', '主办方']
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
    const {brand_rank, host_rank, menu_list} = data

    this.setData({
      brand_rank,
      host_rank,
      menu_list,
      activeTabIndex: menu_list[0].id
    })
    setTimeout(() => {
      this.setData({
        isPageReady: true
      })
      this.$hideLoading()
    }, 1000)
    console.log(result)
  },
  onChange(event) {
    this.setData({
      activeTabIndex: this.data.menu_list[event.detail.index].id
    })
  },
  rankItemClick(eve) {
    const {rankName, rankId, rankIndex} = eve.currentTarget.dataset
    const {activeTabIndex, menu_list } = this.data
    console.log(menu_list, activeTabIndex)
    // const rankTitle = menu_list[activeTabIndex].name + `${rankName}`
    // console.log(rankTitle)
    this.setData({
      activeRankItemIndex: rankIndex
    })
    this.$routeTo(`statistics-rank?tabIndex=${activeTabIndex}&rankItemIndex=${rankId}`)
    // this.$routeTo(`statistics-rank?tabIndex=${activeTabIndex}&rankItemIndex=${rankId}&rankTitle=${rankTitle}`)
  },
  onNumViewChange(event) {
    this.setData({
      activeNumViewTab: event.detail.index
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
