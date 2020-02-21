
import storage from './storage';

const PREFIX = 'KEY_';

export default {
  // 用户token
  setAccessToken: async (value, timer) => storage.set(`${PREFIX}TOKEN`, value, timer),
  getAccessToken: async () => storage.get(`${PREFIX}TOKEN`),
  clearAccessToken: async () => storage.remove(`${PREFIX}TOKEN`),

  // 用户openId
  setOpenId: async (value) => storage.set(`${PREFIX}OPENID`, value, 24 * 7),
  getOpenId: async () => storage.get(`${PREFIX}OPENID`),
  clearOpenId: async () => storage.remove(`${PREFIX}OPENID`),

  // 用户unionId
  setUnionId: async (value) => storage.set(`${PREFIX}UNIONID`, value, 24 * 7),
  getUnionId: async () => storage.get(`${PREFIX}UNIONID`),
  clearUnionId: async () => storage.remove(`${PREFIX}UNIONID`),

  // 用户sessionKey
  setSessionKey: async (value) => storage.set(`${PREFIX}SESSIONKEY`, value, 24 * 7),
  getSessionKey: async () => storage.get(`${PREFIX}SESSIONKEY`),
  clearSessionKey: async () => storage.remove(`${PREFIX}SESSIONKEY`),

  // 用户phone
  setPhone: async (value) => storage.set(`${PREFIX}PHONE`, value, 24 * 7),
  getPhone: async () => storage.get(`${PREFIX}PHONE`),
  clearPhone: async () => storage.remove(`${PREFIX}PHONE`),

  // 用户会员信息
  setCaName: async (value) => storage.set(`${PREFIX}CANAME`, value, 24 * 7),
  getCaName: async () => storage.get(`${PREFIX}CANAME`),
  clearCaName: async () => storage.remove(`${PREFIX}CANAME`),

  // 推荐单商品数据
  setRemoteoducts: async value => storage.set(`${PREFIX}REMOTEPRODUCTS`, value, 24 * 7),
  getRemoteProducts: async () => storage.get(`${PREFIX}REMOTEPRODUCTS`),
  clearRemoteProducts: async () => storage.remove(`${PREFIX}REMOTEPRODUCTS`)

};
