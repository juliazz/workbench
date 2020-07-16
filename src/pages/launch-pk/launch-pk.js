import api from '../../api/index.js'

let identity; // 身份 0是个人 1是部门
let accountMoney; // 账户余额
let userListRes = [] // 完整的员工列表
const fetch = async (options) => {
  try {
    return await api.launchPK(options)
  } catch (err) {
    return {}
  }
}

Page({
  $route: 'pages/launch-pk/launch-pk',
  /**
   * 页面的初始数据
   */
  data: {
    popupType: '',
    stepValue: {
      name: '请选择PK阶段'
    },
    projectValue: {
      name: '请选择PK项目'
    },
    endChoiceValue: {
      name: '请选择PK对象'
    },
    pkPrice: null,
    endChoiceList: [], // pk 个人选中数组
    activeIndex: { // 页面选中展示
      step: 0,
      project: 0,
      people: [1, 4]
    },
    multiArray: [], // 三级联动数据======
    multiIndex: [0, 0, 0],
    areaValue: {
      name: '选择pk对象上级' // 三级联动数据=======
    },
    multiArraySecond: [], // 二级联动数据======
    multiIndexSecond: [0, 0],
    arrayOne: [], // 一级联动数据=======
    indexOne: 0
  },
  activeIndex: {
    step: null,
    project: null,
    people: []
  },
  onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const {pkType } = options
    identity = options.identity
    console.log(options, 'options=========')
    console.log(pkType, 'pktype=========')
    this.$showLoading()
    const result = await this.$getPreload(fetch, options)
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    const {pk_period, pk_project, cat_user_list, level} = data // level 数据深度
    accountMoney = wx.getStorageSync('accountMoney') || ''
    // identity = '0' // 0 是个人 1是部门  就两种情况
    this.setData({
      pkCellTitle: `pk${pkType}:`, // 根据对象进来cell文案
      'endChoiceValue.name': `选择${pkType}`, // input框占位文案
      stepList: pk_period || [],
      projectList: pk_project || [],
      pickerLevel: level
    })
    if (level == '2') {
      this.getUserListThree(cat_user_list)
    } else if (level == '1') {
      this.getUserListSecond(cat_user_list)
    } else if (level == '0') {
      this.getUserListOne(cat_user_list)
    }
  },
  // =========================== 三级联动 ============================
  // 获取pk对象数组
  getUserListThree: async function(data) {
    let { multiArray} = this.data
    userListRes = data // 将完整数据存起来
    const arr1 = data.map((i) => {
      return {
        name: i.name,
        id: i.id
      }
    })
    multiArray[0] = arr1
    // 默认选择第一项
    multiArray[1] = this.findArr2List(arr1[0].id)
    multiArray[2] = this.findArr3List(multiArray[1], multiArray[1][0].id)
    this.setData({
      multiArray
    })
  },
  // 获取数组第二项内容
  findArr2List(index) {
    const arr2 = userListRes.filter((i) => {
      return i.id == index
    })
    return arr2[0].cat_list
  },
  // 获取数组第三项内容
  findArr3List(list, index) {
    const arr3 = list.filter((i) => {
      return i.id == index
    })
    return arr3[0].cat_list
  },
  // 级联选择确定
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    const multiIndex = e.detail.value
    // const level =
    let { multiArray} = this.data
    const {name, id} = multiArray[2][multiIndex[2]]
    this.getuserbycatid(id)
    this.setData({
      multiIndex,
      areaValue: {
        name,
        id
      }
    })
  },
  // 级联滚动时
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    const { column, value} = e.detail
    let { multiArray, multiIndex } = this.data
    multiIndex[column] = value;
    switch (column) {
    // 第0列
    case 0:
      multiArray[column + 1] = this.findArr2List(userListRes[value].id)
      multiArray[column + 2] = []
      multiIndex[1] = 0;
      multiIndex[2] = 0;
      break;
    case 1:
      multiArray[column + 1] = this.findArr3List(multiArray[1], multiArray[1][value].id)
      multiIndex[2] = 0;
      break;
    }
    this.setData({
      multiArray,
      multiIndex
    });
  },
  // ==========================  二级联动区域  ===========================
  getUserListSecond: async function(userList) {
    let { multiArraySecond} = this.data
    userListRes = userList // 将完整数据存起来
    const arr1 = userList.map((i) => {
      return {
        name: i.name,
        id: i.id
      }
    })
    multiArraySecond[0] = arr1
    // ，默认选择第一项
    multiArraySecond[1] = this.findArr2List(arr1[0].id)
    this.setData({multiArraySecond})
  },
  secondPickerColumnChange(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    const { column, value} = e.detail
    let { multiArraySecond, multiIndexSecond } = this.data
    multiIndexSecond[column] = value
    multiArraySecond[1] = this.findArr2List(userListRes[value].id)
    this.setData({multiArraySecond})
  },
  // 点击确定时
  bindSecondPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    const multiIndexSecond = e.detail.value
    const {name, id} = this.data.multiArraySecond[1][multiIndexSecond[1]]
    this.getuserbycatid(id)
    this.setData({
      multiIndexSecond,
      areaValue: {
        name,
        id
      }
    })
  },
  // ==========================  一级联动区域  ===========================
  getUserListOne: async function(userList) {
    // 临时  模拟获取到的一维数组
    // let { multiArraySecond} = this.data
    // let userList = await api.getUserList()
    // userListRes = userList // 将完整数据存起来
    const arr1 = userList.map((i) => {
      return {
        name: i.name,
        id: i.id
      }
    })
    // multiArraySecond[0] = arr1
    // 默认选择第一项
    // const arrayOne = this.findArr2List(arr1[0].id)
    this.setData({arrayOne: arr1})
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    const indexOne = e.detail.value
    const {name, id} = this.data.arrayOne[indexOne]
    this.getuserbycatid(id)
    this.setData({
      indexOne,
      areaValue: {
        name,
        id
      }
    })
  },
  onConfirm(event) {
    const { type } = event.currentTarget.dataset
    const {activeIndex, endChoice = []} = this.data
    // 假设获取到的阶段数组是 multiArray[2]
    let listName = type + 'List'
    const list = this.data[listName]
    // const list = this.data.multiArray[2]
    const currenIndex = activeIndex[`${type}`]
    let value = list[currenIndex]
    if (type == 'endChoice') {
      if (endChoice.length) {
        // value
        let str = ''; let ids = '';
        list.filter(v => {
          // if (endChoiceList.find((z) => { return v.id == z })) { return v }
          return endChoice.find((z) => { return v.id == z })
        }).map(x => {
          str += x.name + ','
          ids += x.id + ','
        })
        value = {
          name: str.substr(0, str.length - 1),
          id: ids.substr(0, ids.length - 1)
        }
      } else {
        this.setData({popupType: ''})
        return
      }
    }
    console.log(value)
    this.setData({
      [`${type}Value`]: {
        ...value
      },
      popupType: ''
    })
  },
  async getuserbycatid(id) {
    const result = await api.getUserListByCatId({cat_id: id})
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    this.setData({endChoiceList: data})
  },
  onChange(eve) {
    const { index, type } = eve.currentTarget.dataset
    if (type == 'end') return
    this.setData({[`activeIndex.${type}`]: index })
  },
  onCancel(eve) {
    const { type} = eve.currentTarget.dataset
    this.setData({
      popupType: ''
    })
  },
  // 多选框事件================================
  onChangeEnd(event) {
    this.setData({
      endChoice: event.detail
    });
  },
  toggle(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },
  // 点击邀请
  async inviteEventer (eve) {
    const {stepValue, projectValue, areaValue, endChoiceValue, pkPrice} = this.data
    // check Input
    console.log(stepValue, projectValue, areaValue, endChoiceValue, pkPrice)
    const par = {
      bid: endChoiceValue.id,
      period_id: stepValue.id,
      pk_project: projectValue.id,
      type: identity,
      amount: pkPrice
    }
    console.log(par)
    for (let key in par) {
      console.log(par[key])
      if (!par[key]) {
        return this.$showToast('请填写完整信息！')
      }
    }
    this.$showLoading()
    const result = await api.addPK({...par})
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    // 去掉接口 接口成功后弹窗
    this.popupShow(eve)
  },
  comfirmInvite() {
    this.setData({
      popupType: ''
    })
    this.$navigateBack()
  },
  priceInputEventer(e) {
    if( e.detail>accountMoney){
      return this.$showToast('挑战金额不能大于账户余额！');
    }
    this.setData({pkPrice: e.detail})
  },
  popupShow: function(eve) {
    const { popupType } = eve.currentTarget.dataset
    this.setData({
      popupType
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


  noop() {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  }
})
