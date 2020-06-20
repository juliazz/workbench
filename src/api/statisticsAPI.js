
import request from '../utils/request';
/**
 * 统计首页数据
 */
const getStaticHomeData = async (params = {}) => request.post({
  url: 'kpi/getRankList',
  data: params
});
const getStatisics = async (params = {}) => request.post({
  url: 'kpi/statisics',
  data: params
});
const getPeriodList = async (params = {}) => request.post({
  url: 'kpi/getPeriodList',
  data: params
});

export default {
  getStaticHomeData,
  getStatisics,
  getPeriodList
}
