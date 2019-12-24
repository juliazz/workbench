import helper from './helper'
import normalizeStyle from '../utils/normalizeStyle'
import logger from '../utils/logger'
import createSelectorQuery from '../utils/selectQuery'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 页面标题
    title: {
      type: String,
      value: ''
    },
    navStyle: {
      type: Object,
      value: {}
    },
    navTitleStyle: {
      type: Object,
      value: {}
    },
    // 返回页数
    delta: {
      type: Number,
      value: 1
    },
    // 是否可以返回
    enable: {
      type: Boolean,
      value: true
    },
    slot: {
      type: Boolean,
      value: false
    },
    // 显示loading
    showLoading: {
      type: Boolean,
      value: false
    },
    // 是否显示返回
    showBack: {
      type: Boolean,
      value: true
    },
    forceShowBack: {
      type: Boolean,
      value: false
    },
    // 是否显示客服
    showServ: {
      type: Boolean,
      value: false
    },
    // 是否显示首页
    showHome: {
      type: Boolean,
      value: false
    },
    // 是否显示占位
    showPlaceholder: {
      type: Boolean,
      value: true
    }
  },
  pageLifetimes: {
    show: function () {},
    hide: function () {},
    resize: function () {}
  },
  lifetimes: {
    attached: async function () {
      // 是否显示返回按钮
      const pages = getCurrentPages()
      if (pages.length == 1) {
        this.setData({
          showBack: false
        })
      }
      const { forceShowBack } = this.data
      if (forceShowBack) {
        this.setData({
          showBack: true // 强制显示返回按钮
        })
      }

      // 是否显示成胶囊
      const { showHome, showServ, showBack } = this.data
      this.setData({
        _showCaps: (showHome && showBack) || (showServ && showBack)
      })

      console.log(this.data)

      // 设置navgation样式
      const {
        navigationBarBackgroundColor,
        navigationBarTextStyle,
        navigationBarTitleText
      } = helper.getWindowStyle()
      const { statusBarHeight, system } = wx.getSystemInfoSync()
      const { title, navStyle, navTitleStyle } = this.data
      const reg = /ios/i
      if (!title) {
        logger.info('<<<<<<注意:请设置页面标题>>>>>>')
        logger.info('<<<<<<注意:请设置页面标题>>>>>>')
        logger.info('<<<<<<注意:请设置页面标题>>>>>>')
        this.setData({ title: navigationBarTitleText})
      }
      // 导航状态栏高度
      // 导航状态栏上内边距
      let height = 44
      const paddingTop = statusBarHeight || 44
      if (!reg.test(system)) height = 48

      const _navStyle = {
        background: navigationBarBackgroundColor,
        color: navigationBarTextStyle,
        paddingTop: `${paddingTop}px`,
        height: `${height}px`
      }
      this.setData({
        _navStyle: normalizeStyle({
          ..._navStyle,
          ...navStyle
        }),
        _navTitleStyle: normalizeStyle(navTitleStyle)
      })

      // 获取nav高度
      setTimeout(async () => {
        const rect = await createSelectorQuery.call(this, '#nav-bar')
        this.triggerEvent('callback', {
          type: 'rect',
          data: rect
        })
      }, 50)
    },
    ready: function () {},
    moved: function () {},
    detached: function () {}
  },
  /**
   * 组件的初始数据
   */
  data: {
    _navStyle: '',
    _navTitleStyle: '',
    _showCaps: false
  },
  methods: {
    // navback监听函数
    _back() {
      const { enable, delta } = this.data
      if (enable) {
        this.$navigateBack({
          delta
        })
      }
      this.triggerEvent('callback', {
        type: 'back',
        data: this.data
      })
    }
  }
})
