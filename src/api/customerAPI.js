
import request from '../utils/request';
/**
 * 客户接口
 */
const getClientList = async (params = {}) => request.post({
  url: 'kpi/getClientList',
  data: params
});
/**
 * 发送客户留言接口
 */
const clientSendMail = async (params = {}) => request.post({
  url: 'sendMail',
  data: params
});
/**
 * 获取留言头像接口
 */
const userInfo = async (params = {}) => request.post({
  url: 'userInfo',
  data: params
});
/**
 * 聊天框接口
 */
const messageMailInfo = async (params = {}) => request.post({
  url: 'mailInfo',
  data: params
});
/**
 * 站内信列表接口
 */
const messageMailList = async (params = {}) => request.post({
  url: 'mailList',
  data: params
});


export default {
  getClientList,
  userInfo,
  clientSendMail,
  messageMailList,
  messageMailInfo
}
