import api from '../../api/index.js'
import util from '../../utils/utils'

const fetch = async () => {
  try {
    return await api.messagelist()
  } catch (err) {
    return {}
  }
}

Page({
  $route: 'pages/messgae/messgae',
  /**
   * 页面的初始数据
   */
  data: {
  },
  onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function() {
    const result = await this.$getPreload(fetch)
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    let data_ = data.map((i) => {
      return Object.assign(i, {time: util.getMouthDay(i.time)})
    })
    this.setData({
      messageList: data_
    })
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
