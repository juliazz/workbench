Page({
  $route: 'pages/launch-pk/launch-pk',
  /**
   * 页面的初始数据
   */
  data: {
    popupType: '',
    stepValue: '选择战区',
    areaValue: '某品牌,某部门',
    projectValue: '选择项目',
    endChoiceValue: '',
    pkPrice: null,
    list: ['a', 'b', 'c'],
    result: ['a', 'b'],
    activeIndex: {
      step: 0,
      project: 0,
      people: [1, 4]
    }, // 页面选中展示
    multiArray: [['无脊柱动物名字很长很长', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],
    multiIndex: [0, 0, 0]
  },
  activeIndex: {
    step: null,
    project: null,
    people: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {pkType } = options
    this.setData({
      pkCellTitle: `pk${pkType}:`,
      endChoiceValue: `选择${pkType}`
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
  popupShow: function(eve) {
    const { popupType } = eve.currentTarget.dataset
    this.setData({
      popupType
    })
  },
  onConfirm(event) {
    const { type } = event.currentTarget.dataset
    const {activeIndex, result = []} = this.data
    let value = activeIndex[type]
    if (type == 'endChoice' && result.length) {
      // value
      let str = ''
      result.map((i) => {
        str += i + ','
      })
      value = str
    }
    this.setData({
      [`${type}Value`]: value,
      popupType: ''
    })
    console.log(`当前索引：${activeIndex}`, type);
  },
  onChange(eve) {
    const { index, type} = eve.currentTarget.dataset
    if (type != 'end') { this.setData({[`activeIndex.${type}`]: index }) }
    console.log(`当前索引：${index}`);
  },
  onCancel(eve) {
    const { type} = eve.currentTarget.dataset
    this.setData({
      [`activeIndex.${type}`]: null,
      popupType: ''
    })
  },
  // 多选
  onChangeEnd(event) {
    this.setData({
      result: event.detail
    });
  },
  toggle(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },
  // 点击邀请
  inviteEventer(eve) {
    // 去掉接口 接口成功后弹窗
    this.popupShow(eve)
  },

  comfirmInvite() {
    this.setData({
      popupType: ''
    })
  },
  // 级联选择
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(e)
    const multiIndex = e.detail.value
    this.setData({
      multiIndex,
      'order.signing': this.data.multiArray[2][multiIndex[2]]
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log(e)
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    let data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
    case 0:
      switch (data.multiIndex[0]) {
      case 0:
        data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
        data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
        break;
      case 1:
        data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
        data.multiArray[2] = ['鲫鱼', '带鱼'];
        break;
      }
      data.multiIndex[1] = 0;
      data.multiIndex[2] = 0;
      break;
    case 1:
      switch (data.multiIndex[0]) {
      case 0:
        switch (data.multiIndex[1]) {
        case 0:
          data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
          break;
        case 1:
          data.multiArray[2] = ['蛔虫'];
          break;
        case 2:
          data.multiArray[2] = ['蚂蚁', '蚂蟥'];
          break;
        case 3:
          data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
          break;
        case 4:
          data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
          break;
        }
        break;
      case 1:
        switch (data.multiIndex[1]) {
        case 0:
          data.multiArray[2] = ['鲫鱼', '带鱼'];
          break;
        case 1:
          data.multiArray[2] = ['青蛙', '娃娃鱼'];
          break;
        case 2:
          data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
          break;
        }
        break;
      }

      data.multiIndex[2] = 0;
      console.log(data.multiIndex);
      break;
    }
    this.setData(data);
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
