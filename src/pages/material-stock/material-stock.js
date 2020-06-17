import api from '../../api/index.js'

let materialType = 1 // 1 微信素材  2其他素材
let limit = 10
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
  onLoad: async function(options) {
    // this.$wLoading.show()
    const result = await this.getMaterialList()
    console.log(result)

    // this.$wLoading.hide()
  },
  // tab切换
  onTabChange: function(eve) {
    const {index} = eve.detail
    materialType = index + 1
    currentPage = 1
    this.setData({
      activeTabIndex: index
    })
  },
  async getMaterialList() {
    if (currentPage > totalPage) return this.$showToast('没有更多数据啦！');
    const par = {
      page: currentPage,
      type: materialType,
      limit
    }
    const result = await api.getMaterialList(par)
    const { msg, data, status } = result;
    // if (status != '200') return this.$showToast(msg);
    // totalPage = data.last_page
    // const personDetailList = data.data.map((i) => {
    //   i.time = util.myTime(i.time)
    //   return i
    // })
    // totalData = totalData.concat(personDetailList)
    // this.setData({personDetailList: totalData})
    this.addCollpaseState()
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
    const {viewMaterialList} = this.data
    this.setData({
      [`viewMaterialList[${index}].collState`]: !viewMaterialList[index].collState
    })
  },
  savePhoto: async function (event) {
    let _that = this;
    const {type} = event.currentTarget.dataset
    // if (type == 'image') {
    const copyText = '这里是剪贴板的内容z,这里是剪贴板的内容z,这里是剪贴板的内容z'
    wx.setClipboardData({
      data: copyText,
      success (res) {
        // wx.getClipboardData({
        //   success (res) {
        //     console.log(res.data) // data
        //   }
        // })
      }
    })
    let testlist = ['https://api.fmlesson.cn/upload/20200421/8dc1e6a77a1f8245ad999265b2413c64.jpg', 'https://api.fmlesson.cn/upload/20200421/8dc1e6a77a1f8245ad999265b2413c64.jpg', 'https://api.fmlesson.cn/upload/20200421/8dc1e6a77a1f8245ad999265b2413c64.jpg', 'https://api.fmlesson.cn/upload/20200421/8dc1e6a77a1f8245ad999265b2413c64.jpg', 'https://api.fmlesson.cn/upload/20200421/8dc1e6a77a1f8245ad999265b2413c64.jpg', 'https://api.fmlesson.cn/upload/20200421/8dc1e6a77a1f8245ad999265b2413c64.jpg', 'https://api.fmlesson.cn/upload/20200421/8dc1e6a77a1f8245ad999265b2413c64.jpg', 'https://api.fmlesson.cn/upload/20200421/8dc1e6a77a1f8245ad999265b2413c64.jpg']
    // let testlist = ['https://stream7.iqilu.com/10339/article/202002/18/2fca1c77730e54c7b500573c2437003f.mp4']
    let times = 0;
    testlist = testlist.map(async(i) => {
      const tempFilePath = await this.downloadFileSync(i)
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
      if (errMsg == 'saveVideoToPhotosAlbum:ok') {
        this.$showToast('视频已保存至本地')
      }
    })
    // } else {
    //   let url = 'https://stream7.iqilu.com/10339/article/202002/18/2fca1c77730e54c7b500573c2437003f.mp4'
    //   const tempFilePath = await this.downloadFileSync(url)

    // }
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
    this.getPersonalFinaceDetail()
  }
})
