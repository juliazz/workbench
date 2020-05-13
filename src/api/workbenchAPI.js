import request from '../utils/request';
/**
 * 更新用户信息
 * @parentId
 */
const salesAssistant = async (params = {}) => request.post({
  data: params,
  url: 'salesAssistant/update'
});
const updateUserInfo = async(params = {}) => request.post({
  data: params,
  url: '/member/update'
})
// 获取带单人  签单人信息
const getUserList = async(params = {}) => request.post({
  data: params,
  url: 'getusercat'
})


export default {
  salesAssistant,
  updateUserInfo,
  getUserList
};
