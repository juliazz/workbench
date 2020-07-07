import api from '../../api/index.js'

let currentPage = 1;
let totalPage;
let limit = 3;
let status_ = 0;
let totalData = [];

Page({
  $route: 'pages/my-material/my-material',
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['微信素材', '其他素材'],
    activeList: '0',
    myMaterialList: [{}, {}],
    auditList: [{}, {}],
    wattingList: [{}],
    failLitst: [{}, {}, {}]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    console.log('=============onLoad=================')
    this.$showLoading()
    const result = await this.getMaterialList()
    this.$hideLoading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function() {
    console.log('=============onShow=================')
  },
  async getMaterialList() {
    if (currentPage > totalPage) return this.$showToast('没有更多数据啦！');
    const par = {
      page: currentPage,
      status: status_,
      limit
    }
    this.$showLoading()
    const result = await api.getUserMaterialList(par)
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    const {status_list, last_page, per_page} = data
    totalPage = last_page
    const myMaterialList = data.data.map((i) => {
      i.collState = false;
      return i
    })
    totalData = totalData.concat(myMaterialList)
    this.setData({
      myMaterialList: totalData,
      status_list
    })
    console.log(this.data.myMaterialList)
  },
  changeEventer(event) {
    totalData = []
    currentPage = 1
    const {type } = event.currentTarget.dataset
    status_ = type
    this.setData({
      activeList: type
    })
    this.getMaterialList()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
    currentPage = 1
    totalData = [];
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    currentPage++
    this.getMaterialList()
  }
})
