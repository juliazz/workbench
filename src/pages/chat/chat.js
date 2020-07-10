import api from '../../api/index.js'
import {
  storageManage
} from '../../utils/index'

let currentPage = 1;// 个人页数
const fetch = async () => {
  try {
    return await api.userInfo()
  } catch (err) {
    return {}
  }
}
let receive_id; let avatar;
let msgList = []

Page({
  $route: 'pages/chat/chat',
  /**
   * 页面的初始数据
   */
  data: {
    showSend: true
  },
  onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    const {customerName, clientId} = options
    wx.setNavigationBarTitle({
      title: customerName
    })
    receive_id = clientId
    this.getMessageList()
    let userInfo = await storageManage.getUserInfo()
    if (!userInfo) {
      const result = await this.$getPreload(fetch, options)
      const { msg, data, status } = result;
      if (status != '200') return this.$showToast(msg);
      avatar = data.avatar
      await storageManage.setUserInfo(data)
    } else {
      avatar = userInfo.avatar
    }
  },
  async getMessageList() {
    const par = {
      receive_id,
      page: currentPage
    }
    const result = await api.messageMailInfo({...par})
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    if (!result.data.length) { return this.$showToast('没有更多数据啦！'); }
    msgList = msgList.concat(result.data)
    this.setData({msgList})
  },
  /**
   * 发送点击监听
   */
  sendClick: async function(e) {
    const {value } = e.detail
    if (!value.length) { return this.$showToast('留言不能为空！'); }
    const result = await api.clientSendMail({content: value, receive_id})
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    msgList.push({
      avatar,
      is_self: 1,
      content: value
    })
    const inputMessage = '';
    this.setData({
      msgList,
      inputMessage
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
    currentPage = 1;
    msgList = [];
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
    currentPage++
    this.getMessageList()
  }
})
