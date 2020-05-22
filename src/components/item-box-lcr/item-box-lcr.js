
Component({
  behaviors: [],
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true // 页面影响组件样式
  },
  properties: {
    centerWidth: {
      type: String,
      value: 400 // 中间内容宽度
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
  methods: {}
})
