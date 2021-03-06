/* eslint-disable */
import utils from './utils'
import PageMixins from '../mixins/pages'
import ComponentMixins from '../mixins/behavior'
import preload from './preload'

const {
  normalizeUrl
} = utils


/**
 * Rewrite Page
 */
const lifecycleHooks = [
  'onLoad', 'onReady', 'onShow',
  'onHide', 'onUnload', 'onPullDownRefresh',
  'onReachBottom', 'onShareAppMessage',
  'onPageScroll', 'onTabItemTap'
]
/**
 * 扩展数值类型
 */
Object.defineProperty(Number.prototype, '$currency', {
  writable: false,
  enumerable: false,
  configurable: true,
  value: function() {
      return utils.currency(this)
  }
})
/**
 * 扩展对象类型
 */
Object.defineProperty(String.prototype, '$currency', {
  writable: false,
  enumerable: false,
  configurable: true,
  value: function() {
      return utils.currency(this)
  }
})
const _Page = Page
Page = function (options) {
  const opts = {mixins: [], ...options}

  // mixnis
  if (!~opts.mixins.indexOf(PageMixins)) {
    opts.mixins.unshift(PageMixins)
  }

  //
  for (const mixin of opts.mixins) {
    if (!mixin || typeof (mixin) !== 'object') continue

    // data
    if (mixin.data && typeof (mixin.data) === 'object') {
      opts.data = {
        ...mixin.data,
        ...opts.data
      }
    }

    for (const key in mixin) {
      // custom property/function
      if (!~lifecycleHooks.indexOf(key)) {
        opts[key] = opts[key] || mixin[key]
        continue
      }
      // life cycle hooks
      const originHook = opts[key] || function () {}
      opts[key] = function () {
        if (typeof mixin[key] !== 'function') {
          console.warn(`page hook '${key}' must be a function.`)
        } else {
          mixin[key].apply(this, arguments)
          originHook.apply(this, arguments)
        }
      }
    }
  }
  delete opts.mixins

  // add preload lifecycle
  opts.$route = normalizeUrl(opts.$route)
  preload.init(opts.$route, opts.onPreLoad)
  return _Page(opts)
}


/**
 * Rewrite Component
 */
const _Component = Component
Component = function (options) {
  const opts = {
    behaviors: [],
    ...options
  }
  // mixnis
  if (!~opts.behaviors.indexOf(ComponentMixins)) {
    opts.behaviors.unshift(ComponentMixins)
  }
  return _Component(opts)
}
