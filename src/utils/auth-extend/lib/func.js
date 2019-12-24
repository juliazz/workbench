// 授权信息
const message = {
  'scope.record': '您暂未开启录音权限的授权，是否开启',
  'scope.writePhotosAlbum': '您暂未开启保存媒体资源至相册的授权，是否开启',
  'scope.userLocation': '您暂未开启地理位置信息的授权，是否开启',
  'scope.invoiceTitle': '您暂未开启发票信息的授权，是否开启',
  'scope.address': '您暂未开启收货地址的授权，是否开启'
}

const to = (promise) => {
  return promise
    .then(result => [null, result])
    .catch(err => [err, null])
}


const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })
}

const authorize = (options) => {
  return new Promise((resolve, reject) => {
    wx.authorize({
      ...options,
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })
}


// 检查用户是否授权
const isCheckAuthApiSetting = async function (type, callback) {
  if (!type && typeof type !== 'string') return

  let error; let
    result
  // 做一层缓存，检查缓存的状态，如果已授权可以不必再次走下面的流程，直接return出去即可
  [error, result] = await to(getSetting())
  if (error) {
    return callback('fail')
  }

  if (result.authSetting[type]) {
    return callback('success')
  }

  [error, result] = await to(authorize({
    scope: type,
    $callee: 'isCheckAuthApiSetting'
  }))
  if (!error) {
    return callback('success')
  }

  wx.showModal({
    content: message[type] || '您暂未开启权限，是否开启',
    confirmColor: '#000',
    success: res => {
      if (res.confirm) {
        wx.openSetting({
          success(res) {
            res.authSetting[type] ? callback('success') : callback('fail')
          }
        })
      } else {
        callback('fail')
      }
    }
  })
}

export default {
  isCheckAuthApiSetting
}
