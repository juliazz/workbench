import logger from './logger.js';
import config from '../config';
import storageManage from './storage-manage';

let request;

const store = {
  async getter() {
    return storageManage.getAccessToken();
  },
  async setter(val) {
    await storageManage.setAccessToken(val, 2);
  },
  async cleaner() {
    await storageManage.clearAccessToken();
  }
};

const token = {
  count: 0,
  maxCount: 3,
  limitTime: 10,
  status: false,
  queueCallbacks: [],
  config(options) {
    request = options.request;
  },
  async get() {
    const _token = await store.getter();
    if (_token) return _token;
    if (this.status) {
      const result = await new Promise((resolve, reject) => {
        this.queueCallbacks.push({
          resolve,
          reject
        });
      });
      return result;
    }
    this.status = true;
    try {
      const result = await this.refresh();
      const { data } = result
      this.complete('success', result);
      return data.token;
    } catch (err) {
      logger.warn(`failed to get token: ${err}`);
      this.complete('fail', err);
      if (err.message == 'Token retrieval failed') {
        wx.showToast({
          title: '网络不稳定，请检查网络设置',
          icon: 'none'
        });
        throw err
      }
      return null;
    }
  },
  async set(val) {
    await store.setter(val);
  },
  async refresh() {
    if (this.count > this.maxCount) {
      throw new Error('Token retrieval failed');
    } else if (this.count === 0) {
      setTimeout(() => {
        this.count = 0;
      }, this.limitTime * 1000);
    }
    // 累计次数
    this.count += 1;
    const { code} = await wx.$login();
    console.log(code)
    // todo 用户静默登录
    // const result = await request.get({
    //   url: `/member/caOnLogin/${code}/${config.wechatId}/${config.shopWechatId}`,
    //   auth: true
    // });
    const result = await request.get({
      url: 'test',
      auth: true
    });
    const { data, resultCode } = result
    console.log(result)
    if (resultCode != 1) throw new Error('Token fetch failed');
    const { token } = data;
    console.log(token)
    await this.set(token);
    return result;
  },
  complete(type, result) {
    this.status = false;
    while (this.queueCallbacks.length) {
      const {
        resolve,
        reject
      } = this.queueCallbacks.shift();
      if (type === 'success') {
        resolve(result.data.token);
      }
      if (type === 'fail') {
        reject(result);
      }
    }
  },
  async clear() {
    await store.cleaner();
  }
};

export default token;
