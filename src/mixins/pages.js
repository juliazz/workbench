import utils from '../utils/utils';
import preload from '../utils/preload';
import tabs from '../custom-tab-bar/config'
import components from '../components/index'

const {
  normalizeUrl,
  debounce,
  isFunction,
  convertQuery,
  isIpx
} = utils;

const routeHooks = [
  '$switchTab', '$navigateTo',
  '$reLaunch', '$redirectTo'
];

// 跳转->防抖
const _debounce = debounce((callback) => {
  callback()
}, 500, true);

// 按钮->防抖
const $debounce = debounce((callback) => {
  callback()
}, 500, true);


export default {
  data: {
    $loading: {},
    $themColor: '#0f8eef',
    $isIpx: isIpx()
  },
  async onLoad() {
    /**
     * 注册组件
     */
    Object.keys(components).forEach(name => {
      this[name] = components[name]()
    })
  },
  async onShow() {
    /**
     * switch tab
     */
    const path = this.route
    const index = tabs.findIndex(item => item.pagePath == path)
    const isTab = index >= 0
    if (isTab && typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        activeIndex: index
      })
    }
  },
  // 非生命周期方法
  showLoading(options = {}) {
    this.setData({
      $loading: { ...options, show: true }
    })
  },
  hideLoading() {
    this.setData({
      $loading: { show: false }
    })
  },
  $showToast(options) {
    let params = {
      title: '',
      icon: 'none',
      image: '',
      duration: 2000,
      mask: false
    }
    if (typeof options == 'string') {
      params.title = options
    } else {
      params = Object.assign(params, options)
    }
    wx.showToast(params)
  },
  // 非生命周期方法
  $showLoading(options = {}) {
    let params = {
      title: '正在加载...',
      mask: true
    }
    if (typeof options == 'string') {
      params.title = options
    } else {
      params = Object.assign(params, options)
    }
    wx.showLoading(params)
  },
  $hideLoading() {
    wx.hideLoading()
  },
  $hideToast() {
    wx.hideToast()
  },
  // 获取预加载数据
  $getPreload(fn, ...args) {
    const {
      options,
      $route
    } = this
    const query = convertQuery(options)
    const route = normalizeUrl($route)
    let path = route
    if (query) path = `${route}?${query}`
    const arr = [path];
    if (isFunction(fn)) {
      arr.push(fn.bind(null, ...args));
    }
    return preload.get(...arr);
  },
  // $switchTab
  $switchTab(path) {
    this.$routeTo(path, '$switchTab');
  },
  // $navigateTo
  $navigateTo(path) {
    this.$routeTo(path, '$navigateTo');
  },
  // $redirectTo
  $redirectTo(path) {
    this.$routeTo(path, '$redirectTo');
  },
  // $reLaunch
  $reLaunch(path) {
    this.$routeTo(path, '$reLaunch');
  },
  // $navigateBack
  $navigateBack(delta) {
    _debounce(() => {
      wx.$navigateBack({
        delta
      })
    })
  },
  // navigateToMiniProgram
  $navigateToMiniProgram() {},
  // navigateBackMiniProgram
  $navigateBackMiniProgram() {},
  // Be used to view
  $routeLink(event) {
    const {
      type,
      path
    } = event.currentTarget.dataset;
    this.$routeTo(path, type);
  },
  // Be used to controller
  $routeTo(path, type = '$navigateTo') {
    // 使手机发生较短时间的振动
    // wx.vibrateShort()
    const routes = getCurrentPages();
    let [route, query] = path.split('?')
    if (query) {
      query = query.replace(/\//g, '%2F')
      query = query.replace(/&amp;/g, '&')
      path = `${route}?${query}`
    }
    if (path.split('/').length == 1) {
      path = `${route}/${route}`
      if (query) path = `${path}?${query}`
    }
    if (type[0] !== '$') {
      type = `$${type}`;
    }
    if (routeHooks.indexOf(type) === -1) {
      throw new Error(`not allowed type ${type}`);
    }
    path = normalizeUrl(path);
    console.log('path==========', path)
    preload.set(path);
    // 页面深度高于10
    if (routes.length >= 10 && type != '$switchTab') type = '$redirectTo';
    _debounce(() => {
      wx[type]({
        url: path
      }).then(() => {
        console.log(`<-------- ${type} to '${path}' success-------->`);
      }).catch(() => {
        console.log(`<-------- ${type} to '${path}' fail-------->`);
      });
    })
  },

  // 防双击
  $debounce,

  // 延时
  $delay: (timer) => new Promise(resolve => setTimeout(resolve, timer))
};
