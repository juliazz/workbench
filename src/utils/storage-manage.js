
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
  // 用户openId
  setOpenId: async (value) => storage.set(`${PREFIX}OPENID`, value, 24 * 7),
  getOpenId: async () => storage.get(`${PREFIX}OPENID`),
  clearOpenId: async () => storage.remove(`${PREFIX}OPENID`),
  // 用户登录注册状态
  setLoginStatus: async (value, timer) => storage.set(`${PREFIX}STATUS`, value, timer),
  getLoginStatus: async () => storage.get(`${PREFIX}STATUS`),
  clearLoginStatus: async () => storage.remove(`${PREFIX}STATUS`),
  // 用户openId
  setUserId: async (value) => storage.set(`${PREFIX}USERID`, value, 24 * 7),
  getUserId: async () => storage.get(`${PREFIX}USERID`),
  clearUserId: async () => storage.remove(`${PREFIX}USERID`),
  // 活动id
  setActivityId: async (value) => storage.set(`${PREFIX}ACTIVITYID`, value, 24 * 30),
  getActivityId: async () => storage.get(`${PREFIX}ACTIVITYID`),
  clearActivityId: async () => storage.remove(`${PREFIX}ACTIVITYID`),
  // 用户信息
  setUserInfo: async (value) => storage.set(`${PREFIX}LOGINSTATUS`, value, 24 * 30),
  getUserInfo: async () => storage.get(`${PREFIX}LOGINSTATUS`),
  clearUserInfo: async () => storage.remove(`${PREFIX}LOGINSTATUS`)

};
