/**
 * wx对象下的所有非同步方法promise化
 * wx.request == > wx.$request
 */
for (const key in wx) {
  const _fun = wx[key]
  if (key.indexOf('Sync') < 0 && typeof _fun === 'function' && Object.prototype.toString.call(_fun) === '[object Function]') {
    wx['$' + key] = (options, ...params) => new Promise((resolve, reject) => {
      _fun(Object.assign({}, options, {
        success: resolve,
        fail: reject
      }), ...params)
    })
  }
}

/**
 * wx.qy对象下的所有非同步方法promise化
 * wx.qy.login == > wx.qy.$login
 * 兼容企业微信方法
 */
wx.qy = wx.qy || {}
for (const key in wx.qy) {
  const _fun = wx.qy[key]
  if (key.indexOf('Sync') < 0 && typeof _fun === 'function' && Object.prototype.toString.call(_fun) === '[object Function]') {
    wx.qy['$' + key] = (options, ...params) => new Promise((resolve, reject) => {
      _fun(Object.assign({}, options, {
        success: resolve,
        fail: reject
      }), ...params)
    })
  }
}
