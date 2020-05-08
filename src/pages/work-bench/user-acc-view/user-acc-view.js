
Component({
  behaviors: [],
  properties: {
    type: {
      type: Object,
      value: {
        name: '',
        typeId: null // 身份type 1个人 2部门 3品牌 4战区
      }
    },
    viewData: { // 页面视图数据
      type: Object,
      value: {
        name: '',
        type: null //
      }
    }
  },
  data: {},
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
    popupShow(event) {
      console.log(event)
      this.triggerEvent('emiteventer', event)
    }
  }
})
