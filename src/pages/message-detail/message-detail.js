import api from '../../api/index.js'
import util from '../../utils/utils'

const fetch = async () => {
  try {
    return await api.pklist()
  } catch (err) {
    return {}
  }
}
Page({
  $route: 'pages/message-detail/message-detail',
  /**
   * 页面的初始数据
   */
  data: {
  },
  onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    const id = options.id ? options.id : null
    const isRead = options.isRead ? options.isRead : null
    this.getMessageDetail()
    if (!isRead) {
      this.changeRead(id)
    }
  },
  async getMessageDetail(options) {
    this.$showLoading()
    const result = await this.$getPreload(fetch, options)
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    let data_ = data.list.map((i) => {
      return Object.assign(i, {time: util.formatDate2(i.time)})
    })
    console.log(data_)
    this.setData({
      messageList: data_
    })
  },
  async changeRead(id) {
    const result = await api.readmessage({message_id: id})
  },
  async acceptEventer(eve) {
    const {id, action} = eve.currentTarget.dataset
    const result = await api.editpk({id, action})
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    this.getMessageDetail()
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
