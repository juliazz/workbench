import {
  logger,
  tokenManage,
  storageManage
} from './utils/index'

App({
  async onLaunch() {
    await tokenManage.set('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImp0aSI6InN4cy00ZjFnMjNhMTJhYSJ9.eyJqdGkiOiJzeHMtNGYxZzIzYTEyYWEiLCJpYXQiOjE1ODk5NjUxMjksImV4cCI6MTYyMTUwMTEyOSwidWlkIjoxfQ.hIi8L2jJ4nq_AUctfKQv0qlv6UYOtrWILAKz0HVDdrg');
    // await tokenManage.get()
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
        await tokenManage.get()
      }
    }
  },
  data: {
  }
});
