/* eslint-disable  import/order */
import {
  logger,
  tokenManage,
  storageManage
} from './utils/index'

App({
  async onLaunch() {
    await tokenManage.get()
  },
  async onShow() {
    try {
      await wx.$checkSession();
      logger.info('session_key 未过期');
    } catch (error) {
      logger.warn('session_key 已经失效');
      if (storageManage.getAccessToken()) {
        await tokenManage.clear();
        await tokenManage.get()
      }
    }
  },
  data: {}
});
