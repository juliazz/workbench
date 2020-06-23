import request from '../utils/request';
/**
 * 获取首页查看排行数据
 * @parentId
 */

const getRankDetail = async (params = {}) => request.post({
  url: 'kpi/getRankDetail',
  data: params
});

export default {
  getRankDetail  
};
