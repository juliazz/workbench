/* eslint-disable no-bitwise */
/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
import utils from '../../utils/utils';
import api from '../../api/index.js';
import storageManage from '../../utils/storage-manage';

let nickInPutvalue;
let caCode; let storeCode;
let caName;
Page({
  $route: 'pages/person/person',
  /**
   * 页面的初始数据
   */
  data: {
    setNickNameShow: false, // 设定昵称弹框
    outLoginShow: false, // 重新登录弹框
    closeOnClickOverlay: true,
    time: {
      from: '2020-02-01',
      to: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    const caInfo = await storageManage.getCaInFo()
    console.log(caInfo)
    caCode = caInfo.cacode
    storeCode = caInfo.storeCode
    const endDate = utils.getNowFormatDate() // 日期改成 yyyy-mm-dd
    this.setData({
      'time.to': endDate,
      isPhoneX: utils.isIpx
    })
    console.log(endDate)
    this.getRemoteOrder(this.data.time.from, endDate, 'enter')
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function(options) {
    this.getNickName()
  },
  expandEventer(e) {
    const { index} = e.currentTarget.dataset
    let shareHistoryList = this.data.shareHistoryList
    shareHistoryList[index].expand = !shareHistoryList[index].expand
    this.setData({
      shareHistoryList
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },
  // 推荐单列表
  async getRemoteOrder(beginDate, endDate, type) {
    let par = {
      caCode,
      beginDate,
      storeCode,
      endDate
    }
    const result = await api.RemoteOrder(par)
    const { msg, resultCode, data} = result
    if (resultCode != 1) return this.$showToast(msg);
    if (!data.length && !type) return this.$showToast('未找到该时间段的成单记录');
    let data_ = data.map((item) => {
      // 商品详情
      item.listOrderProduct.forEach(listItem => {
        if (listItem.extAttr && listItem.extAttr.indexOf('part":') > -1) {
          listItem.image = getProductImg(JSON.parse(listItem.extAttr))
        } else if (listItem.productResult.listProductImage.length) {
          listItem.image = listItem.productResult.listProductImage.find(itemC => itemC.type == 0).sourceUrl
        }
      })
      // 个人信息马赛克
      return Object.assign(item, {
        deliveryName: item.deliveryName.slice(0, 1) + '*****',
        deliveryPhone: utils.hidePhoneNumber(item.deliveryPhone),
        createAt: utils.myTime2(item.createAt)
      })
    })
    this.setData({
      shareHistoryList: data_
    })
  },
  resetPassword() {
    // this.clearLoginInfo()
    this.$routeTo('reset-passworld')
  },
  async bindDateChange(eve) {
    const {type } = eve.currentTarget.dataset
    const {value } = eve.detail
    const { from, to} = this.data.time
    switch (type) {
    case 'from':
      this.setData({
        'time.from': value
      })
      break;
    case 'to':
      if (!from) return this.$showToast('请先选择开始时间');
      const fromUnix = utils.getUnixTime(from);
      const toUnix = utils.getUnixTime(value)
      if (fromUnix > toUnix) return this.$showToast('开始时间不能大于结束时间');
      this.setData({
        'time.to': value
      })
      console.log(from, to)
      this.getRemoteOrder(from, value)
      break;
    }
  },
  async getNickName() {
    const userInfo = await storageManage.getCaInFo()
    this.setData({
      caName: userInfo.caname
    })
  },
  nickNameInput(eve) {
    nickInPutvalue = eve.detail.value
    // this.setData({
    //   nickname: value
    // })
  },
  async setNickName() {
    if (!nickInPutvalue) return this.$showToast('昵称为空！');
    if (nickInPutvalue == caName) return this.$showToast('新昵称与旧昵称不能相同！');
    wx.showLoading()
    const result = await api.salesAssistant({
      name: nickInPutvalue,
      number: caCode
    })
    wx.hideLoading()
    const { msg, resultCode, data} = result
    if (resultCode != 1) return this.$showToast(msg);
    const {name } = data
    let caInfo = await storageManage.getCaInFo()
    caInfo.caname = name
    await storageManage.setCaInFo(caInfo)
    this.$showToast('修改成功');
    setTimeout(() => {
      this.setData({
        caName: name,
        setNickNameShow: false
      })
    }, 2000)
  },
  closePopup: function(eve) {
    const { type } = eve.currentTarget.dataset
    this.setData({
      [type]: false
    })
  },
  openPopup: function(eve) {
    const { type } = eve.currentTarget.dataset
    this.setData({
      [type]: true
    })
  },
  // 退出登录
  outLogin: function() {
    this.clearLoginInfo()
    this.setData({
      outLoginShow: false
    })
    this.$routeTo('login', 'reLaunch')
  },
  async clearLoginInfo () {
    await storageManage.setLoginStatus(false)
    const caInfo = {
      caname: '',
      cacode: '',
      storeCode: ''
    }
    // setCaInFo
    await storageManage.setCaInFo(caInfo)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
