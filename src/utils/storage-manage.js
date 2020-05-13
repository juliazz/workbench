
import storage from './storage';

const PREFIX = 'KEY_';

export default {
  // 用户token
  setAccessToken: async (value, timer) => storage.set(`${PREFIX}TOKEN`, value, timer),
  getAccessToken: async () => storage.get(`${PREFIX}TOKEN`),
  clearAccessToken: async () => storage.remove(`${PREFIX}TOKEN`),

  // 用户unionId
  setUnionId: async (value) => storage.set(`${PREFIX}UNIONID`, value, 24 * 7),
  getUnionId: async () => storage.get(`${PREFIX}UNIONID`),
  clearUnionId: async () => storage.remove(`${PREFIX}UNIONID`),
  // 用户登录态
  setLoginStatus: async (value) => storage.set(`${PREFIX}LOGINSTATUS`, value, 24 * 30),
  getLoginStatus: async () => storage.get(`${PREFIX}LOGINSTATUS`),
  clearLoginStatus: async () => storage.remove(`${PREFIX}LOGINSTATUS`),

  // 活动id
  setActivityId: async (value) => storage.set(`${PREFIX}ACTIVITYID`, value, 24 * 30),
  getActivityId: async () => storage.get(`${PREFIX}ACTIVITYID`),
  clearActivityId: async () => storage.remove(`${PREFIX}ACTIVITYID`),

  // 推荐单商品数据
  setRemoteoducts: async value => storage.set(`${PREFIX}REMOTEPRODUCTS`, value, 24 * 7),
  getRemoteProducts: async () => storage.get(`${PREFIX}REMOTEPRODUCTS`),
  clearRemoteProducts: async () => storage.remove(`${PREFIX}REMOTEPRODUCTS`)

};
