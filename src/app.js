import {
  logger,
  tokenManage,
  storageManage
} from './utils/index'
import api from './api/index'

App({
  async onLaunch() {
    await tokenManage.get()
    const getSystemInfo = wx.getSystemInfoSync();
    console.log('getSystemInfo===', getSystemInfo);
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
        await tokenManage.clear();
        // await tokenManage.get()
      }
    }
  },
  async getStepList() {
    const {stepList} = this.data
    if (stepList) { return stepList }
    const result = await api.getPeriodList()
    const { msg, data, status } = result;
    if (status != '200') return this.$showToast(msg);
    this.data.stepList = data
    return data
  },

  data: {
  },
  globalData: {
    scanRes: {},
    coinRule: {},
    orderInType: null
  }
});
