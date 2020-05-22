import request from '../utils/request';
/**
 * 用户活动列表
 * @parentId
 */
const getUserActivities = async (params = {}) => request.post({
  data: params,
  url: 'kpi/getUserActivities'
});

// 获取活动信息
const getActivityInfo = async(params = {}) => request.post({
  data: params,
  url: 'kpi/getActivityInfo'
})
// 扫码核销
const checkOffCode = async(params = {}) => request.post({
  data: params,
  url: 'kpi/checkOffCode'
})


// 获取带单人  签单人信息
const getUserList = async(params = {}) => request.post({
  data: params,
  url: 'kpi/getUserCat'
})

export default {
  getUserActivities,
  getActivityInfo,
  checkOffCode,
  getUserList
};
