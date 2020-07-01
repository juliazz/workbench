import fileHelper from '../../utils/fileHelper.js'
import api from '../../api/index.js'

const {upLoadFile} = fileHelper
let isUpLoading = false; // 图片是否上传中
let photoFileList = []; // 后台返回的接口照片id

Page({
  $route: 'pages/add-material/add-material',
  /**
   * 页面的初始数据
   */
  data: {
    recomReason: '',
    maxImgCount: 9, // 图片数量限制
    imageList: [],
    videoList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  bindblur(e) {
    this.setData({recomReason: e.detail.value})
  },
  // 上传前验证上一张是否上传完毕
  beforeRead(event) {
    const { file, callback } = event.detail;
    callback(isUpLoading === false);
    isUpLoading && this.$showToast('图片上传中请稍后');
  },
  // 图片读取上传后
  async afterRead(event) {
    const { file, name } = event.detail;
    console.log(name)
    isUpLoading = true
    this.setData({isUpLoading})
    if (file instanceof Array) {
      file.map(async(i) => {
        await this.changeReadLoadAfterData(i, name)
      })
      return
    }
    await this.changeReadLoadAfterData(file, name,)
  },
  async changeReadLoadAfterData(file, name) {
    const res = await upLoadFile(file.path, name)
    let result = JSON.parse(res)
    const { msg, data, status } = result
    if (status != '200') return this.$showToast(msg);
    const listName = `${name}List`
    const list = this.data[listName];
    photoFileList.push(data.resource_id)
    list.push({ ...file});
    isUpLoading = false
    console.log(photoFileList, 'photoFileList=========uoload后==')
    this.setData({ [`${listName}`]: list });
  },
  // 图片删除
  delete(event) {
    const { index, name} = event.detail;
    const fileList = this.data[`${name}List`];
    fileList.splice(index, 1);
    photoFileList.splice(index, 1)
    console.log(photoFileList, 'photoFileList=========delete后==')
    this.setData({ [`${name}List`]: fileList });
  },
  // 确认发布
  async comfirmUpLoad() {
    const {recomReason} = this.data
    console.log(recomReason.length)
    if (recomReason.length < 3) { return this.$showToast('请输入不少于3字描述'); }
    const result = await api.submitMaterial({
      resource_ids: photoFileList,
      content: this.data.recomReason
    })
    const { msg, data, status } = result
    console.log(msg, data, status)
    if (status != '200') return this.$showToast(msg);
    this.$showToast('上传成功，请等待审核！')
    setTimeout(() => {
      this.$navigateBack()
    }, 1500)
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

  }
})
