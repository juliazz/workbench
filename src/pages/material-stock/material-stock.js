import api from '../../api/index.js'

let materialType = 1 // 1 微信素材  2其他素材
let limit = 3
let currentPage = 1
let totalPage;
let totalData = [];

Page({
  $route: 'pages/material-stock/material-stock',
  /**
   * 页面的初始数据
   */
  data: {
    activeTabIndex: 0,
    popupType: '',
    shareShow: false,
    tabs: ['微信素材', '其他素材'],
    viewMaterialList: [{}, {}, {}] // 用于展示的素材列表
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMaterialList()
  },
  // tab切换
  onTabChange: function(eve) {
    const {index} = eve.detail
    materialType = index + 1
    currentPage = 1
    totalData = []
    this.setData({
      activeTabIndex: index
    })
    this.getMaterialList()
  },
  async getMaterialList() {
    if (currentPage > totalPage) return this.$showToast('没有更多数据啦！');
    const par = {
      page: currentPage,
      type: materialType,
      limit
    }
    this.$showLoading()
    const result = await api.getMaterialList(par)
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    totalPage = data.last_page
    const personDetailList = data.data.map((i) => {
      i.collState = false;
      return i
    })
    totalData = totalData.concat(personDetailList)
    this.setData({personDetailList: totalData})
  },
  // 分享弹窗关闭
  onCancel() {
    this.setData({
      shareShow: false
    })
  },
  popupShow: function(eve) {
    const { popupType } = eve.currentTarget.dataset
    this.setData({
      popupType
    })
  },
  closePopup: function(eve) {
    const { popupType } = eve.currentTarget.dataset
    this.setData({
      popupType: ''
    })
  },
  // 给数组添加展开状态字段 默认折叠
  addCollpaseState({viewMaterialList} = this.data) {
    const list = viewMaterialList.map((i) => { i.collState = false; return i })
    console.log(list)
  },
  // 文字展开折叠
  expandEventer(event) {
    const {index} = event.currentTarget.dataset
    const {personDetailList} = this.data
    this.setData({
      [`personDetailList[${index}].collState`]: !personDetailList[index].collState
    })
  },
  savePhoto: async function (event) {
    const {index} = event.currentTarget.dataset
    const item = this.data.personDetailList[index]
    const copyText = item.content
    wx.setClipboardData({
      data: copyText,
      success (res) {
      }
    })
    if (item.attach_type == 'image') {
      let testlist = item.file_list
      let times = 0;
      testlist = testlist.map(async(i) => {
        const tempFilePath = await this.downloadFileSync(i.url)
        const { errMsg } = await wx.$saveImageToPhotosAlbum({
          filePath: tempFilePath
        })
        console.log(errMsg)
        if (errMsg == 'saveImageToPhotosAlbum:ok') {
          times += 1
          console.log(times)
          if (times == testlist.length) {
            this.setData({
              shareShow: true
            })
            console.log('全部下载完成')
            this.$showToast('图片已保存至本地')
          }
        }
      })
    } else {
      const tempFilePath = await this.downloadFileSync(item.file_list[0].url)
      const { errMsg } = await wx.$saveVideoToPhotosAlbum({
        filePath: tempFilePath
      })
      if (errMsg == 'saveVideoToPhotosAlbum:ok') {
        this.$showToast('视频已保存至本地')
        this.setData({
          shareShow: true
        })
      }
    }
  },
  // 下载小程序码
  downloadFileSync: function (url) {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url,
        success: function (res) {
          resolve(res.tempFilePath)
          console.log(res)
        },
        fail: function (err) {
          console.log(err)
          wx.showToast({
            title: '下载失败,稍后重试！',
            icon: 'none',
            duration: 5000
          });
        }
      });
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
    console.log('onUnloadonUnload==============')
     currentPage = 1
     totalData = [];
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
    console.log('currentPage', currentPage)
    this.getMaterialList()
  }
})
