/* eslint-disable no-unused-vars */
/* eslint-disable  import/order */
import {
  logger,
  tokenManage,
  storageManage
} from './utils/index'

App({
  async onLaunch() {
    // await tokenManage.get()
  },
  async onShow (opts) {
    this.data.from = opts.referrerInfo.extraData && opts.referrerInfo.extraData.from
    this.data.unionId = opts.referrerInfo.extraData && opts.referrerInfo.extraData.unionId
    console.log(opts, 'app.onShow,opts')
    try {
      await wx.$checkSession();
      logger.info('session_key 未过期');
    } catch (error) {
      logger.warn('session_key 已经失效');
      if (storageManage.getAccessToken()) {
        // await tokenManage.clear();
        // await tokenManage.get()
      }
    }
  },
  navigateToMiniProgram_ (path, extraData = {
    recommendedNo: '',
    caCode: '',
    storeCode: '',
    from: ''
  }) {
    console.log(extraData)
    wx.navigateToMiniProgram({
      appId: 'wxcc92c871c0188fe5',
      path: path,
      extraData: extraData,
      envVersion: 'trial', // release
      success(res) {
        // 打开成功
      },
      fail(err) {
        console.log(extraData)
      }
    })
  },
  data: {
    from: '',
    unionId: ''
  }
});
