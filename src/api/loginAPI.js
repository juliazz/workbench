import request from '../utils/request';
import config from '../config';
/**
 * 登录接口
 */
const accountLogin = async (params = {}) => request.post({
  url: '/salesAssistant/salesAssistantLogin',
  data: params
});


export default {
  accountLogin
}