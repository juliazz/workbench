import api from '../../api/index.js'
import util from '../../utils/utils'
import fileHelper from '../../utils/fileHelper.js'
import storangeMange from '../../utils/storage-manage';

const {base64src} = fileHelper
const app = getApp()
const fetch = async (options) => {
  try {
    return await api.getUserActivities(options)
  } catch (err) {
    return {}
  }
}
let Timer; let user_id;
const dpr = wx.getSystemInfoSync().pixelRatio // 获取设备的像素比，未来整体画布根据像素比扩大
Page({
  $route: 'pages/work-bench/work-bench',
  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    popupType: '',
    postCurrent: 0,
    liveCurrent: 0,
    activeId: null,
    unfoldStateList: [{
      state: false
    }, {
      state: false
    }, {
      state: false
    }
    ], // 展开状态数组
    userAreaData: { // 个人区域数据
    },
    // 数据区，从服务端拿到的数据
    // 设置区，针对部件的数据设置
    qrcodeDiam: 80, // 小程序码直径
    infoSpace: 13, // 底部信息的间距
    saveImageWidth: 500, // 保存的图像宽度
    bottomInfoHeight: 0, // 底部信息区高度
    // 缓冲区，无需手动设定
    canvasWidth: 0, // 画布宽
    canvasHeight: 0, // 画布高
    canvasDom: null, // 画布dom对象
    canvas: null, // 画布的节点
    ctx: null, // 画布的上下文
    posterHeight: 0 // 海报高
  },
  onPreLoad: fetch,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    // this.setData({is_host, showPage: true})
    this.setData({showPage: true})
    // 再判断有没有授权过
    // const userInfo = await storangeMange.getUserInfo()
    // if(!userInfo){this.setData({popupType:'getUserInfo'})}
    this.$showLoading()
    const result = await this.$getPreload(fetch, {user_id, auth: true})
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    // 默认选中第一个活动
    const activeId = data[0].activity_id
    await storangeMange.setActivityId(activeId)
    this.getActivityData(activeId)
    this.setData({activeList: data, activeId})
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getRankInfo()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },
  // 查询节点信息，并准备绘制图像
  drawContent() {
    return new Promise((reslove) => {
      const query = wx.createSelectorQuery() // 创建一个dom元素节点查询器
      query.select('#canvasDomPoster') // 选择我们的canvas节点
        .fields({ // 需要获取的节点相关信息
          node: true, // 是否返回节点对应的 Node 实例
          size: true // 是否返回节点尺寸（width height）
        }).exec((res) => { // 执行针对这个节点的所有请求，exec((res) => {alpiny})  这里是一个回调函数
          const dom = res[0] // 因为页面只存在一个画布，所以我们要的dom数据就是 res数组的第一个元素
          const canvas = dom.node // canvas就是我们要操作的画布节点
          const ctx = canvas.getContext('2d') // 以2d模式，获取一个画布节点的上下文对象
          this.setData({
            canvasDom: dom, // 把canvas的dom对象放到全局
            canvas, // 把canvas的节点放到全局
            ctx // 把canvas 2d的上下文放到全局
          })
          reslove()
        })
    })
  },
  // 计算画布尺寸
  computeCanvasSize(imgWidth, imgHeight) {
    return new Promise(((resolve) => {
      let canvasWidth = 250 // 获取画布宽度(canvasDom宽度)
      let canvasHeight = canvasWidth * (imgHeight / imgWidth) // 计算海报高度
      this.setData({
        canvasWidth, // 设置画布容器宽
        canvasHeight // 设置画布容器高
      }, () => { // 设置成功后再返回
        console.log(dpr, 'dpr')
        this.data.canvas.width = canvasWidth * dpr// 设置画布宽
        this.data.canvas.height = canvasHeight * dpr // 设置画布高
        this.data.ctx.scale(dpr, dpr) // 根据像素比放大
        resolve()
      })
    }))
  },
  // 绘制画面
  drawing(listItem) {
    wx.showLoading({title: '海报生成中'}) // 显示loading
    this.drawPoster(listItem)
    // 绘制海报
      .then(async () => { // 这里用同步阻塞一下，因为需要先拿到海报的高度计算整体画布的高度
        await this.drawQrcode(listItem) // 绘制小程序码
        await this.canvasToTempFilePath()
        wx.hideLoading() // 隐藏loading
      })
  },
  // 绘制海报
  drawPoster(listItem) {
    return new Promise(((resolve) => {
      let poster = this.data.canvas.createImage(); // 创建一个图片对象
      poster.src = listItem.poster // 图片对象地址赋值
      poster.onload = () => {
        const {canvasWidth, canvasHeight} = this.data
        this.data.ctx.drawImage(poster, 0, 0, poster.width, poster.height, 0, 0, canvasWidth, canvasHeight);
        resolve()
      }
    }))
  },
  // 绘制小程序码&文字
  drawQrcode(listItem) {
    return new Promise((reslove) => {
      const {infoSpace, canvasHeight, rights, ctx} = this.data
      let diam = this.data.qrcodeDiam // 小程序码直径
      let qrcode = this.data.canvas.createImage(); // 创建一个图片对象
      qrcode.src = listItem.qrcode // 图片对象地址赋值
      qrcode.onload = () => {
        let x = 20 // 左上角相对X轴的距离：画布宽 - 间隔 - 直径
        let y = canvasHeight - 30 - diam // 左上角相对Y轴的距离 ：画布高 - 间隔 - 直径 + 微调
        ctx.drawImage(qrcode, 0, 0, qrcode.width, qrcode.height, x, y, diam, diam) // 详见 drawImage 用法
        // 提示语（距左：间距 ）（距下：总高 - 间距 ）
        this.data.ctx.fillStyle = "#ffffff";           // 设置文字颜色
        ctx.fillText(`我是${rights.name}邀请您参加活动~`, infoSpace, canvasHeight - infoSpace);
        ctx.restore();
        reslove()
      }
    })
  },
  // 根据活动id查活动数据
  async getActivityData(activeId) {
    this.$showLoading()
    await storangeMange.setActivityId(activeId)
    const result = await api.getActivityInfo({activity_id: activeId})
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    let {info, period, rights, fund, poster, live_qrcode, activity_reg_qrcode, view_shop} = data
    info.start_date = util.getMouthDay(info.start_date)
    info.end_date = util.getMouthDay(info.end_date)
    period.start_datetime = util.formatDate2(period.start_datetime)
    period.end_datetime = util.formatDate2(period.end_datetime)
    this.showTimeDown(period.end_time * 1000 - period.current_time * 1000)
    // 成员注册码、
    const activeCode = await this.getBase64ImageUrl(activity_reg_qrcode)
    // 用户等级 及等级信息（订单录入）
    getApp().globalData.orderInType = rights
    this.setData({
      info,
      period,
      fund,
      rights,
      poster,
      smallPosterList: poster,
      live_qrcode,
      activeCode,
      view_shop
    })
    wx.setStorageSync('accountMoney', fund.money);
    setTimeout(async() => {
      await this.drawContent() // 初始化画布上下文
      await this.computeCanvasSize(750, 1080) // 计算画布大小
    }, 1000)
  },
  toMiniAPP() {
    wx.navigateToMiniProgram({
      appId: '',
      path: 'page/index/index?id=123',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'develop',
      success(res) {
        // 打开成功
      }
    })
  },
  async getRankInfo() {
    this.$showLoading()
    const result = await api.getRankInfo()
    this.$hideLoading()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    // app.globalData.coinRule = rule
    this.setData({
      person: data[0],
      apartment: data[1], // 部门
      brand: data[2],
      zone: data[3]// 战区
    })
  },
  // 点击列表更改选中activeId
  changeActive: function(eve) {
    const { activeId } = eve.currentTarget.dataset
    this.setData({
      activeId
    })
  },
  // 点击确认后请求对应活动数据
  sureChangeActive: function() {
    const { activeId } = this.data
    console.log('activeId=======', activeId)
    this.getActivityData(activeId)
    this.getRankInfo()
    this.setData({popupType: ''})
  },
  // 倒计时
  showTimeDown(time) {
    if (time > 0) {
      const activeEndTime = util.formatDuring(time)
      this.setData({ activeEndTime })
    }
    if (time < 0) {
      clearInterval(Timer)
      return
    }
    Timer = setInterval(() => {
      time = time - 1000
      if (time > 0) {
        const activeEndTime = util.formatDuring(time)
        this.setData({ activeEndTime })
      }
      if (time < 0) {
        clearInterval(Timer)
        this.setData({ activeEndTime: 0 })
      }
    }, 1000)
  },

  popupShow: function(eve) {
    const { popupType, dataType } = eve.currentTarget.dataset
    if (popupType == 'canvasDomPoster') {
      this.getTabBar().hideTabBar();
      if (dataType == 'poster') {
        setTimeout(async () => {
          this.drawing(this.data.poster[0]) // 开始绘图
        }, 1000)
        this.setData({
          smallPosterList: this.data.poster
        })
      } else {
        setTimeout(async () => {
          this.drawing(this.data.live_qrcode[0]) // 开始绘图
        }, 1000)
        this.setData({
          smallPosterList: this.data.live_qrcode
        })
      }
    }
    this.setData({
      popupType
    })
  },
  closePopup: function(eve) {
    const { popupType } = eve.currentTarget.dataset
    if (popupType == ('canvasDomPoster')) { this.getTabBar().showTabBar(); }
    this.setData({
      popupType: ''
    })
  },
  // 选择海报 或 直播邀请
  choosePost(eve) {
    const {item, type} = eve.currentTarget.dataset
    this.drawing(item)
  },
  // 点击开始的时间
  timestart: function(e) {
    this.setData({ timestart: e.timeStamp });
  },
  // 点击结束的时间
  timeend: function(e) {
    this.setData({ timeend: e.timeStamp });
    let times = this.data.timeend - this.data.timestart;
    if (times > 1000) {
      this.saveImageToPhotosAlbum()
    }
  },
  canvasToTempFilePath() {
    const {canvasWidth, canvasHeight} = this.data
    return new Promise((reslove) => {
      wx.canvasToTempFilePath({
        fileType: 'jpg',
        x: 0,
        y: 0,
        width: canvasWidth,
        height: canvasHeight,
        destWidth: canvasWidth * dpr,
        destHeight: canvasHeight * dpr,
        canvas: this.data.canvasDom.node, // 使用2D 需要传递的参数
        success: async (res) => {
          console.log(res)
          this.setData({
            posterDrawUrl: res.tempFilePath
          })
          reslove()
        },
        fail: (err) => {
          console.log(err)
        }
      })
    })
  },
  async saveImageToPhotosAlbum(path) {
    const { posterDrawUrl} = this.data
    const { errMsg } = await wx.$saveImageToPhotosAlbum({
      filePath: posterDrawUrl
    })
    if (errMsg == 'saveImageToPhotosAlbum:ok') {
      this.$showToast('图片已保存至本地')
    }
  },
  // 把base64转换成图片
  async getBase64ImageUrl(data) {
    return new Promise((resolve) => {
      base64src(data, (res) => {
        resolve(res)
      })
    })
  },
  // 核销码输入
  bindblur(e) {
    const {value } = e.detail
    this.setData({
      barCodeNum: value
    })
    const par = {
      hx_code: value,
      type: 'order'
    }
    this.scanCode(par)
  },
  openScan() {
    wx.scanCode({
      onlyFromCamera: true,
      success: (ev) => {
        console.log('scanCode->', ev)
        let { errMsg, result } = ev
        if (errMsg != 'scanCode:ok') {
          return this.$showToast('扫码失败')
        }
        result = JSON.parse(result)
        this.scanCode(result)
      }
    })
  },
  // 获取码信息
  async scanCode(result) {
    console.log(result)
    const getResult = await api.checkOffCode(result)
    const { msg, data, status } = getResult;
    if (status != '200') return this.$showToast(msg);
    app.globalData.scanRes = data
    console.log('app.globalData.scanRes', app.globalData.scanRes)
    if (result.type == 'order') {
      this.$routeTo('order-type-in?type=bar')
    } else {
      this.$showToast('扫码成功！');
    }
    this.setData({
      popupType: ''
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    if (Timer) clearInterval(Timer)
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    if (Timer) clearInterval(Timer)
  }
})
