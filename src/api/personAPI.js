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


export default {
  salesAssistant,
  updateUserInfo
};
