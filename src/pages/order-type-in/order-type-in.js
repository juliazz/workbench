const timeNow = new Date()

import api from '../../api/index.js'
import fileHelper from '../../utils/fileHelper.js'
import rules from './helper';

let currentPage = 1;
let totalData = [];
let level,startTime,endTime,searchName; //搜索开始时间  搜索结束时间  搜索姓名
const {upLoadFile} = fileHelper
let userListRes = []; // 完整的签单人列表 未分类
let photoFileList = []; // 后台返回的接口照片id
let isUpLoading = false; // 图片是否上传中
let isFrombar = false; // 是否通过条码进来
const app = getApp()

Page({
  $route: 'pages/order-type-in/order-type-in',
  /**
   * 页面的初始数据
   */
  data: {
    expandIndex: null, // 查看数据展开的index
    activeTabIndex: 0,
    orderDateRange: '', // 选择的时间
    defaultDateRange:[new Date(timeNow.getFullYear(), timeNow.getMonth()+1, timeNow.getDate()-1).getTime(),
      new Date(timeNow.getFullYear(), timeNow.getMonth()+1,timeNow.getDate()+1).getTime()],//默认选择时间
    minDate: new Date(timeNow.getFullYear(), timeNow.getMonth()-1, 1).getTime(),
    maxDate: new Date(timeNow.getFullYear(), timeNow.getMonth()+1, 31).getTime(),
    maxImgCount: 9, // 图片数量限制
    order: {
      date: `${timeNow.getFullYear()}-${timeNow.getMonth() + 1}-${timeNow.getDate()}`,
      guide: {}
    },
    fileList: [], // 上传文件列表
    arrayOne: [], // 签单人列表
    indexOne: 0, // 签单人选中序列
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
    const rights = getApp().globalData.orderInType
    console.log('rights', rights)
    // 获取签单人列表
    // 0 代表当前员工  1代表身份是主管
    if (rights.type == 0) {
      this.setData({
        'order.sign': {
          name: rights.name,
          id: rights.id
        }
      })
    } else if (rights.type == 1) {
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
  onChange: function(eve) {
    const {index} = eve.detail
    this.setData({
      activeTabIndex: index
    })
    if(index==1){
      totalData=[]
      currentPage=1
      startTime=endTime=searchName=''
      this.getOrderList()
    } 

  },
  async getSignUserList() {
    this.$showLoading()
    const result = await api.getTopUserList()
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    this.setData({arrayOne: data[0].child})
  },
  //   =========     带单人选择  ============
  getLeaderUserList: async function() {
    this.$showLoading()
    const result = await api.getServiceUserList()
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    level = data.level
    userListRes = data.list // 将完整数据存起来
    // if (level == 3) {
    // 带单人数据  模拟此处获取  后面替换 *****getStepList ---》 getCurrentStepList 顺序不能换
    this.getStepList() // 获取每个步骤列表
    this.getCurrentStepList() // 获取当前步骤列表
    // }
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
    let Step4List = [];
    // 遍历第四层 获取四个层级列表
    //    遍历战区
    Step1List = userListRes.map((i) => {
      let res2;
      let res3;
      let res4;
      //  遍历品牌
      console.log('level========', level)
      console.log(i)
      if (!i.child) { return }
      i.child.map((v) => {
        console.log(v)
        if (level == 1 && !v.child) { return }
        // 遍历部门
        v.child.map((x) => {
          if (level == 2) { return }
          // 遍历员工
          // res4 = x.user_arr.map((z) => {
          //   res4 = {name: z.name, id: z.id, parent_id: z.parent_id }
          //   Step4List.push(res4)
          // })
          res3 = {name: x.name, id: x.id, parent_id: x.pid }
          Step3List.push(res3)
        })
        res2 = {name: v.name, id: v.id, parent_id: v.pid}
        Step2List.push(res2)
      })
      return {name: i.name, id: i.id}
    })
    const {steps} = this.data
    if (level == 3) {
      stepList.push(Step1List, Step2List, Step3List)
    } else if (level == 2) {
      this.setData({
        steps: steps.slice(0, 2)
      })
      stepList.push(Step1List, Step2List)
    } else {
      this.setData({
        steps: steps.slice(0, 1)
      })
      stepList.push(Step1List)
    }
    this.setData({stepList})
  },
  getCurrentStepList(id) {
    const { active, stepList} = this.data // 第几步 ,所有步骤的列表
    console.log(active, stepList)
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
    console.log('steps', steps)
    steps[active].desc = obj.name
    this.setData({
      activeIndex: index,
      steps
    })
    if (active == level - 1) {
      this.getuserbycatid(obj.id)
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
        active: ++this.data.active % level
      });
      this.getCurrentStepList(id)
    }, 500)
  },
  // 带单人最后一层
  async getuserbycatid(id) {
    const result = await api.getUserListByCatId({cat_id: id})
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    this.setData({guideEndList: data})
  },
  closeGuidePop() {
    const {active} = this.data
    if (active != level - 1) {
      return this.$showToast('未选中到人')
    }
  },
  bindblur(event) {
    const { type } = event.currentTarget.dataset;
    const { value } = event.detail;
    this.setData({ [`order.${type}`]: value || '' });
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
    file.map(async(i) => {
      await this.changeReadLoadAfterData(i)
    })
  },
  async changeReadLoadAfterData(file) {
    this.$showLoading()
    const res = await upLoadFile(file.path)
    this.$hideLoading()
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
  // 图片删除
  delete(event) {
    const { index} = event.detail;
    const {fileList} = this.data;
    fileList.splice(index, 1);
    photoFileList.splice(index, 1)
    console.log(photoFileList, 'photoFileList=========delete后==')
    this.setData({ fileList });
  },
  bindsubmit(event) {
    const { value } = event.detail;
    const {order } = this.data
    const guide = order.guideend? order.guideend.id:order.guide.id
    let options = Object.assign({...value,
      sign: order.sign.id || '',
      brand: order.brand.brandId,
      guide: guide || '', // 写死9
      cert: photoFileList,
      hx_code: order.hx_code || ''
    })
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
     
    });
  },
  async orderBrandIn(options) {
    this.$showLoading()
    const result = await api.submitOrder(options)
    this.$hideLoading()
    const { msg, data, status } = result
    if (status != '200') return this.$showToast(msg);
     // 清除订单信息
    wx.setStorageSync('brandInfo', '')
    this.setData({order:{},fileList:[]})
    photoFileList = []
    this.$showToast('录单成功！');
    setTimeout(() => {
      this.$navigateBack()
    }, 1500)
  },
  popupShow: function(eve) {
    const { popupType } = eve.currentTarget.dataset
    // 如果是扫码进来的带单人不可选
    if (isFrombar && popupType == 'guide') return
    if (popupType == 'guide') {
      this.setData({active: 0})
      this.getCurrentStepList()
    }
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
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  onClose() {
    this.setData({ popupType: '' });
  },
  onGuideEndChange(eve) {
    const { index } = eve.currentTarget.dataset
    this.setData({guideLeaderIndex:index})
  },
  // 带单人确定
  onGuideConfirm(){
    this.onClose()
    const {guideLeaderIndex} =this.data
    const obj= this.data.guideEndList[guideLeaderIndex]
    this.setData({
      ['order.guideend']:obj
    })
  },
  onConfirm(event) {
    let [start, end] = event.detail;
    startTime = this.formatDate(start)
    endTime=this.formatDate(end)
    this.setData({
      popupType: '',
      orderDateRange: `${startTime} - ${endTime}`
    });
    //上次筛选条件数据清零
    currentPage=1
    totalData=[]
    searchName=''
    this.getOrderList()
  },
  // 订单打开折叠
  collapseEventer(eve) {
    const {expandIndex} = this.data
    let {index} = eve.currentTarget.dataset
    index = expandIndex == index ? null : index
    this.setData({
      expandIndex: index
    })
  },
  // ============================ 订单列表 =========================
  async getOrderList() {
    const par = {
      page: currentPage,
      start_time :startTime||'',
      end_time:endTime||'',
      client_name:searchName||''
    }
    this.$showLoading()
    const result = await api.submitOrderList({...par})
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    if(!data.length){return this.$showToast('没有更多数据啦！');}
    totalData = totalData.concat(data)
    this.setData({orderList: totalData})
  },
  //
  getAllOrderList(eve){
    console.log(eve)
    const {value} =eve.detail
    startTime=''
    endTime=''
    searchName=value
    currentPage=1
    totalData=[]
    this.getOrderList()
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    const { activeTabIndex} = this.data
    if (activeTabIndex==0) { return }
    console.log('onReachBottomactiveTabIndex',activeTabIndex)
    currentPage++
    this.getOrderList()
  }
})
