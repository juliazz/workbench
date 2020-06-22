const timeNow = new Date()

import api from '../../api/index.js'
import fileHelper from '../../utils/fileHelper.js'
import rules from './helper';

const {upLoadFile} = fileHelper
let userListRes = []; // 完整的签单人列表 未分类
let photoFileList = []; // 后台返回的接口照片id
let isUpLoading = false; // 图片是否上传中
let isFrombar = false; // 是否通过条码进来
let brandId; let brandName;
const app = getApp()
Page({
  $route: 'pages/order-type-in/order-type-in',
  /**
   * 页面的初始数据
   */
  data: {
    order: {
      date: `${timeNow.getFullYear()}-${timeNow.getMonth() + 1}-${timeNow.getDate()}`,
      guide: {}
    },
    fileList: [
    ], // 上传文件列表
    arrayOne: [],
    indexOne: 0,
    multiArraySecond: [], // 模拟取到的完整签单人列表
    active: 0, // 步骤条进度 第几步
    steps: [ // 步骤条步骤
      {
        text: '战区',
        desc: '请选择战区'
      },
      {
        text: '品牌',
        desc: '请选择品牌'
      },
      {
        text: '部门',
        desc: '请选择部门'
      },
      {
        text: '员工',
        desc: '请选择员工'
      }
    ],
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
    const rights = getApp().globalData.orderInType[0]
    console.log('rights', rights)
    // 获取签单人列表
    // 0 代表当前员工  1代表身份是主管
    if (rights.type == 0) {
      this.setData({
        'order.sign': {
          name: rights,
          id: rights.id
        }
      })
    } else if (rights.type == 1) {
      console.log('rights', rights)
      this.getSignUserList() // 获取签单人列表
    }
    // 获取带单人列表
    this.getLeaderUserList()
    // 选择品牌后带回来的参数
    isFrombar = options.type == 'bar' && !!app.globalData.scanRes
    console.log('isFrombar=====', isFrombar)
    if (isFrombar) {
      this.setData({
        'order.guide': app.globalData.scanRes.top_info[0],
        'order.hx_code': app.globalData.scanRes.code_info.hx_code
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const brandInfo = wx.getStorageSync('brandInfo') || {}
    this.setData({
      'order.brand': brandInfo
    })
  },
  async getSignUserList() {
    const result = await api.getTopUserList()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    console.log('data.user_list=====', data.user_list)
    this.setData({arrayOne: data[0].user_list})
  },
  //   =========     签单人选择  ============
  getLeaderUserList: async function() {
    // 临时  模拟获取到的一维数组
    // let { multiArraySecond} = this.data
    // const result = await api.getUserList({})
    // const { msg, data, status } = result;
    // if (status != '200') return this.$showToast(msg);
    // userListRes = data // 将完整数据存起来
    // const arr1 = userListRes.map((i) => {
    //   return {
    //     name: i.name,
    //     id: i.id
    //   }
    // })
    // multiArraySecond[0] = arr1
    // // 默认选择第一项
    // const arrayOne = this.findArr2List(arr1[0].id)
    // this.setData({arrayOne})
    const result = await api.getServiceUserList()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    userListRes = data // 将完整数据存起来
    // 带单人数据  模拟此处获取  后面替换 *****getStepList ---》 getCurrentStepList 顺序不能换
    this.getStepList() // 获取每个步骤列表
    this.getCurrentStepList() // 获取当前步骤列表

    // ===============================================
  },
  findArr2List(index) {
    const arr2 = userListRes.filter((i) => {
      return i.id == index
    })
    return arr2[0].children
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    const indexOne = e.detail.value
    const {name, id} = this.data.arrayOne[indexOne]
    this.setData({
      indexOne,
      'order.sign': {
        name,
        id
      }
    })
  },
  //  =================== 带单人步骤条交互 ==================
  // 获取每个步骤的列表
  getStepList() {
    let stepList = []
    let Step1List;
    let Step2List = [];
    let Step3List = [];
    let Step4List = []; // 品牌列表
    // 遍历第四层 获取四个层级列表
    //    遍历战区
    Step1List = userListRes.map((i) => {
      let res2;
      let res3;
      let res4;
      //  遍历品牌
      i.children.map((v) => {
        // 遍历部门
        v.children.map((x) => {
          // 遍历员工
          res4 = x.user_arr.map((z) => {
            res4 = {name: z.name, id: z.id, parent_id: z.parent_id }
            Step4List.push(res4)
          })
          res3 = {name: x.name, id: x.id, parent_id: x.parent_id }
          Step3List.push(res3)
        })
        res2 = {name: v.name, id: v.id, parent_id: v.parent_id}
        Step2List.push(res2)
      })
      return {name: i.name, id: i.id}
    })
    stepList.push(Step1List, Step2List, Step3List, Step4List)
    this.setData({stepList})
  },
  getCurrentStepList(id) {
    const { active, stepList} = this.data // 第几步 ,所有步骤的列表
    let currentStepList = stepList[active] // 当前步骤所有品牌列表
    let currentStepChoiceList = [] // 根据上一步选择id寻找相同的parent_id的子项列表
    switch (active) {
    // 第1步不用选 就是所有战区
    case 0:
      currentStepChoiceList = currentStepList
      break;
    default:
      currentStepChoiceList = currentStepList.filter((i) => i.parent_id == id)
      break;
    }
    this.setData({currentStepList: currentStepChoiceList, activeIndex: null})
  },
  nextStep(e) {
    const {id, index} = e.currentTarget.dataset
    const { active, stepList, steps, currentStepList} = this.data
    // 如果已经选到人就没必要往下走了
    const obj = {
      name: currentStepList[index].name,
      id: currentStepList[index].id
    }
    steps[active].desc = obj.name
    this.setData({
      activeIndex: index,
      steps
    })
    if (active == 3) {
      setTimeout(() => {
        this.setData({
          'order.guide': obj,
          popupType: '',
          active: 0,
          currentStepList: [],
          activeIndex: null
        })
      }, 700)
      return
    }
    setTimeout(() => {
      this.setData({
        active: ++this.data.active % 4
      });
      this.getCurrentStepList(id)
    }, 500)
  },
  closeGuidePop() {
    const {active} = this.data
    if (active != 3) return this.$showToast('未选中到人')
  },
  //  ===================================================
  bindblur(event) {
    const { type } = event.currentTarget.dataset;
    const { value } = event.detail;
    this.setData({ [`order.${type}`]: value || '' });
    console.log('event', value, this.data.order);
  },
  // 上传前验证上一张是否上传完毕
  beforeRead(event) {
    const { file, callback } = event.detail;
    console.log('isUpLoading=========', isUpLoading)
    callback(isUpLoading === false);
    isUpLoading && this.$showToast('图片上传中请稍后');
  },
  // 图片读取后
  async afterRead(event) {
    const { file } = event.detail;
    isUpLoading = true
    this.setData({isUpLoading})
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    const res = await upLoadFile(file.path)
    let result = JSON.parse(res)
    const { msg, data, status } = result
    if (status != '200') return this.$showToast(msg);
    const { fileList = [] } = this.data;
    photoFileList.push(data.resource_id)
    console.log(photoFileList, 'photoFileList===========')
    fileList.push({ ...file});
    isUpLoading = false
    this.setData({ fileList });
  },
  bindsubmit(event) {
    const { value } = event.detail;
    const {order } = this.data
    console.log(value)
    let options = Object.assign({...value,
      sign: 9, // 写死
      brand: order.brand.brandId,
      guide: order.guide.id || '',
      cert: photoFileList,
      hx_code: order.hx_code || ''
    })
    console.log(options)
    const component = this.selectComponent('#field-group');
    component.validateEventer(rules, options, async valid => {
      if (!valid) return this.$showToast('请完善订单信息');
      if (!options.cert.length) return this.$showToast('请上传凭证!')
      const par = {
        client_name: options.othername,
        client_phone: options.othertel,
        client_address: options.otheradress,
        brand: order.brand.brandId,
        amount: value.price.$currency(),
        cert: photoFileList,
        hx_code: options.hx_code,
        top_id: options.guide,
        service_id: options.sign,
        remark: value.remark
      }
      this.orderBrandIn(par);

      // 清除订单信息
      wx.setStorageSync('brandInfo', '')
    });
  },
  async orderBrandIn(options) {
    const res = await api.submitOrder(options)
  },
  popupShow: function(eve) {
    const { popupType } = eve.currentTarget.dataset
    // 如果是扫码进来的带单人不可选
    if (isFrombar && popupType == 'guide') return
    if (popupType == 'guide') this.getCurrentStepList()
    this.setData({
      popupType
    })
  },
  closePopup: function(eve) {
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

  }
})
