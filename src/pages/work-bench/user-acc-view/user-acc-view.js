
Component({
  behaviors: [],
  properties: {
    type: {
      type: Number,
      value: 1 // 身份type 1个人 2部门 3品牌 4战区
    },
    name: {
      type: String,
      value: {
        name: '个人'
      }
    },
    expandState: { // 展开状态
      type: Boolean,
      value: false
    },
    viewData: { // 页面视图数据
      type: Object,
      value: {
        name: '',
        type: null //
      }
    }
  },
  data: {
    popupType:''
  },
  lifetimes: {
    attached: function () { },
    moved: function () { },
    detached: function () { }
  },
  attached: function () { },
  ready: function() { },
  pageLifetimes: {
    show: function () { },
    hide: function () { },
    resize: function () { }
  },
  methods: {
    popupShow: function(eve) {
      const { popupType } = eve.currentTarget.dataset
      this.setData({
        popupType
      })
    },
    closePopup: function(eve) {
      this.setData({
        popupType: ''
      })
    },
    viewMore: function(eve) {
      let { expandState } = this.data
      this.setData({
        expandState: !expandState
      })
    }
  }
})
