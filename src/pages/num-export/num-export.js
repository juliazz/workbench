import utils from '../../utils/utils';
import api from '../../api/index.js'

const { isEmail } = utils;
const fetch = async () => {
  try {
    return await api.getExportList()
  } catch (err) {
    return {}
  }
}
let allResult;
Page({
  $route: 'pages/num-export/num-export',
  /**
   * 页面的初始数据
   */
  data: {
    popupShow: false,
    email: '',
    allChecked: false,
    result: [],
    list: [
      {
        title: '报名客户明细',
        type: 'order'
      },
      {
        title: '现金券客户明细',
        type: 'money'
      },
      {
        title: '爆款秒杀订单明细',
        type: 'order'
      },
      {
        title: '签单明细',
        type: 'order'
      },
      {
        title: '账户收支明细',
        type: 'order'
      },
      {
        title: '积分排名明细',
        type: 'order'
      },
      {
        title: '奖金池兑换',
        type: 'order'
      }
    ]
  },
  onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function() {
    this.$showLoading()
    const result = await this.$getPreload(fetch)
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    allResult = data.map((i) => {
      return i.item_id
    })
    this.setData({
      typeCellList: data
    })
    console.log(result)
    this.$hideLoading()
  },
  onChangeAll(event) {
    const {detail} = event
    console.log(event)
    console.log(detail)
    // 当all选择时
    if (detail) {
      this.setData({
        result: allResult, // 所有选项
        allChecked: true
      });
      return
    }
    this.setData({
      result: [],
      allChecked: false
    });
  },
  onChange(event) {
    const {detail} = event
    const length = detail.length
    this.setData({
      result: detail
    });
  },
  async comfirmExport() {
    const {result, email} = this.data
    if (!email) { return }
    const par = {
      item_ids:result,
      email: email
    }
    this.$showLoading()
    const exportResult = await api.exportData(par)
    this.$hideLoading()
    const { msg } = exportResult;
    this.$showToast(msg);
    this.setData({
      popupShow: false
    })
    setTimeout(() => {
      this.$navigateBack()
    }, 2000)
  },
  bindblur(event) {
    const { value } = event.detail;
    console.log('event', value);
    this.ruleEmail(value)
  },
  ruleEmail(value) {
    let result = !!isEmail(value)
    if (!result) { this.$showToast('请填写正确的邮箱地址！') }
    this.setData({
      email:value
    })
  },

  popupShow: function(eve) {
    if(!this.data.result.length){return this.$showToast("请勾选至少一项报表项！")}
    this.setData({
      popupShow: true
    })
  },
  closePopup: function(eve) {
    this.setData({
      popupShow: false
    })
  },
  noop() {},
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

  }
})
