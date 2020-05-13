
const timeNow = new Date()
import api from '../../api/index.js'

let userListRes = [] // 完整的签单人列表
let multiIndexsignBranch = []; //临时选项id存贮
let order; //
let brandId; let
  brandName;
Page({
  $route: 'pages/order-type-in/order-type-in',
  /**
   * 页面的初始数据
   */
  data: {
    order: {
      date: `${timeNow.getFullYear()}-${timeNow.getMonth() + 1}-${timeNow.getDate()}`
    },
    fileList: [

    ], // 上传文件列表
    multiArray: [0, 0, 0],
    multiIndexsignBranch: [0, 0, 0],
    multiIndexguide: [0, 0, 0],
    calendarConfig: {
      minDate: new Date(2020, 0, 1).getTime(),
      maxDate: new Date(2025, 0, 31).getTime(),
      nowDate: timeNow.getTime(),
      round: true,
      poppable: true
    },
    popupType: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    console.log('options======', options)
    // 选择品牌后带回来的参数
    brandId = options.brandId ? options.brandId : null
    this.setData({
      'order.brand': options.brandName ? options.brandName : null
    })
    this.getUserList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
  },
  getUserList: async function() {
    let { multiArray} = this.data
    let userList = await api.getUserList()
    userListRes = userList // 将完整数据存起来
    const arr1 = userList.map((i) => {
      return {
        name: i.name,
        id: i.id
      }
    })
    multiArray[0] = arr1
    // ，默认选择第一项
    multiArray[1] = this.findArr2List(arr1[0].id)
    multiArray[2] = this.findArr3List(multiArray[1], multiArray[1][0].id)
    this.setData({multiArray})
  },
  // 获取数组第二项内容
  findArr2List(index) {
    const arr2 = userListRes.filter((i) => {
      return i.id == index
    })
    return arr2[0].children
  },
  // 获取数组第三项内容
  findArr3List(list, index) {
    const arr3 = list.filter((i) => {
      return i.id == index
    })
    return arr3[0].children
  },
  // 点击确定时
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    const multiIndex = e.detail.value
    const {type} = e.currentTarget.dataset
    const {name, id} = this.data.multiArray[multiIndex[0]][multiIndex[1]]
    console.log(type, name, id)
    this.setData({
      [`multiIndex${type}`]: multiIndex,
      [`order.${type}`]: name,
      [`order.${type}Id`]: id
    })
  },
  // 滚动选择列时
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    const { column, value} = e.detail
    const {type} = e.currentTarget.dataset
    let { multiArray } = this.data
    if (column == 0) {
      multiArray[column + 1] = this.findArr2List(userListRes[value].id)
      // 第一列动了 第二列 也要跟着一起改，默认选择上一次选择的第二列index
      // multiArray[column + 2] = this.findArr3List(multiArray[1],multiIndexsignBranch[1])
      multiArray[column + 2] = []
    }else if(column == 1){
      multiArray[column + 1] = this.findArr3List(multiArray[1],multiArray[1][value].id)
    }
    const {name,id} = multiArray[column][value]
    console.log(name,id)
    this.setData({multiArray})
  },
  bindblur(event) {
    const { type } = event.currentTarget.dataset;
    const { value } = event.detail;
    this.setData({ [`order.${type}`]: value || '' });
    console.log('event', value, this.data.order);
  },
  afterRead(event) {
    const { file } = event.detail;
    const {fileList} = this.data
    this.setData({ fileList: fileList.concat(file) });
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新 fileList
        console.log(res)
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res.data });
        this.setData({ fileList });
      }
    });
  },
  bindsubmit(event) {
    const { value } = event.detail;
    let options = { ...value };
    console.log('value', value);
    // const component = this.selectComponent('#field-group');
    // component.validateEventer(rules, options, async valid => {
    //   if (!valid) return this.$showToast('请完善订单信息');
    // this.createOrder(value);
    // });
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
  formatDate(date) {
    date = new Date(date);
    console.log(date.getFullYear())
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  onClose() {
    this.setData({ popupType: '' });
  },
  onConfirm(event) {
    console.log(event.detail)
    this.setData({
      popupType: '',
      ['order.date']: this.formatDate(event.detail)
    });
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
