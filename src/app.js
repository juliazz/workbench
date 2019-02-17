import {
  logger,
  tokenManage,
  utils
} from './utils/index';
import storageManage from './utils/storage-manage'
import config from './config'

const {
  compareVersion
} = utils

App({
  onLaunch() {
    // 注意: 须告知PM小程序公众号后台要配置相应版本控制
    // 具体提示文案或者提示逻辑根据PM定
    const v1 = wx.getSystemInfoSync().SDKVersion
    const v2 = config.version
    if (compareVersion(v1, v2) < 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        confirmColor: '#000',
        content: '当前微信版本过低，可能无法使用改小程序部分功能，请升级到最新微信版本后重试。',
        success: function () {}
      })
    }
  },
  async onShow() {
    // session验证
    try {
      await wx.$checkSession();
      logger.info('session_key 未过期，并且在本生命周期一直有效');
    } catch (error) {
      logger.warn('session_key 已经失效，需要重新执行登录流程');
      if (storageManage.getAccessToken()) {
        await tokenManage.clear();
        tokenManage.get()
      }
    }
  },
  data: {
    checkoutParams: []
  }
});
