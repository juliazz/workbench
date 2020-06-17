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
// 发起pk
const launchPK = async(params = {}) => request.post({
  data: params,
  url: 'kpi/openpk'
})
// 获取pk总数据
const getRankInfo = async(params = {}) => request.post({
  data: params,
  url: 'kpi/getRankInfo'
})

// 获取带单人  签单人信息
const getUserList = async(params = {}) => request.post({
  data: params,
  url: 'kpi/getUserCat'
})
// 获取排行榜列表
const getRankList = async(params = {}) => request.post({
  data: params,
  url: 'kpi/getRankList'
})
// 导出数据
const exportData = async(params = {}) => request.post({
  data: params,
  url: 'kpi/export'
})


export default {
  getUserActivities,
  getActivityInfo,
  checkOffCode,
  getUserList,
  getRankInfo,
  getRankList,
  launchPK,
  exportData
};
