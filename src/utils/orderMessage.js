// 订阅消息
const orderMessage = (tempId, fn) => {
//   const {tempId} = eve.currentTarget.dataset
  if (!wx.requestSubscribeMessage) {
    wx.showToast({
      icon: 'none',
      title: '您的微信版本过低，请更新到最新版本',
      duration: 4000
    });
    return
  }
  wx.requestSubscribeMessage({
    tmplIds: [tempId],
    success: (res) => {
      console.log(res)
      if (res[tempId] === 'accept') {
        wx.showToast({
          title: '订阅成功',
          duration: 3000
        })
        setTimeout(() => {
          fn && fn()
        }, 2000)
      }
      if (res[tempId] === 'reject') {
        wx.showToast({
          title: '订阅失败',
          icon: 'none',
          duration: 3000
        })
        setTimeout(() => {
          // fn && fn()
        }, 2000)
      }
    },
    fail(err) {
      // 失败
      if (err.errCode == 20004) {
        wx.showToast({
          icon: 'none',
          title: '您关闭了小程序订阅消息开关, \r\n 请在小程序设置中打开',
          duration: 4000
        });
        setTimeout(() => {
          // fn && fn()
        }, 2000)
      } else {
        // fn && fn()
      }
      console.error(err);
    }
  })
}
export default {
  orderMessage
}
