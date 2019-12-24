import apiExtend from './lib/api-extend'
import utils from './lib/utils'
/**
 * 扩展
 * wx.userLocation
 * wx.invoiceTitle
 * wx.address
 * wx.writePhotosAlbum
 */
for (let key in wx) {
  !!apiExtend[key] && (() => {
    const func = wx[key];
    const _func = (...args) => apiExtend[key](...args, func);
    wx[`$${key}`] = (options, ...params) => new Promise((resolve, reject) => {
      _func(Object.assign({}, options, {
        success: resolve,
        fail: reject
      }), ...params)
    })
  })()
}

/**
 * 特殊定制扩展
 * wx.pageScrollTo 、、、解决安卓滑动抖动问题、、、
 */
const { checkAndroid } = utils
wx.$pageScrollTo = (options, ...params) => new Promise((resolve, reject) => {
  if (checkAndroid()) options.duration = 0
  wx.pageScrollTo(Object.assign({}, options, {
    success: resolve,
    fail: reject
  }), ...params)
})
