
Page({
  $route: 'pages/add-material/add-material',
  /**
   * 页面的初始数据
   */
  data: {
    recomReason: '',
    imageList: [],
    videoList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    console.log('details')
  },
  // 文件上传后
  afterRead(event) {
    const { file, name} = event.detail;
    const fileList = this.data[`${name}List`];
    console.log('fileList===', fileList)
    console.log('file===', file)
    this.setData({ [`${name}List`]: fileList.concat(file) });
    console.log(fileList)
  },
  // 图片删除
  delete(event) {
    const { index, name} = event.detail;
    const fileList = this.data[`${name}List`];
    fileList.splice(index, 1);
    this.setData({ [`${name}List`]: fileList });
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
