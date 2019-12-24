/**
 * 判断是否是Android
 */
const checkAndroid = () => {
  const systemInfo = wx.getSystemInfoSync()
  const {
    platform,
    system
  } = systemInfo
  return !!~platform.indexOf('android') || !!~system.indexOf('Android')
};

export default {
  checkAndroid
}
