import request from '../utils/request';
import config from '../config';
/**
 * 登录接口
 */
const accountLogin = async (params = {}) => request.post({
  url: `/member/onLogin/${params.code}/${config.wechatId}`,
  data: params,
  auth: true
});


const test2 = async (params = {}) => request.post({
  data: params,
  url: '/test2'
});


export default {
  accountLogin,
  test2
}
