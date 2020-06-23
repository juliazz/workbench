
import request from '../utils/request';
/**
 * 统计首页数据
 */
const getStaticHomeData = async (params = {}) => request.post({
  url: 'kpi/getRankList',
  data: params
});

// 获取阶段数据
const getPeriodList = async (params = {}) => request.post({
  url: 'kpi/getPeriodList',
  data: params
});
/**
 * 获取排行数据
 * @parentId
 */
const getRankList= async (params = {}) => request.post({
  data: params,
  url: `kpi/getRankListByTag`
});
export default {
  getStaticHomeData,
  getRankList,
  getPeriodList
}
