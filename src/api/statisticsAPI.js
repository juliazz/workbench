
import request from '../utils/request';
/**
 * 统计数据
 */
const getStatisics = async (params = {}) => request.post({
  url: 'kpi/statisics',
  data: params
});
const getPeriodList = async (params = {}) => request.post({
  url: 'kpi/getPeriodList',
  data: params
});

export default {
  getStatisics,
  getPeriodList
}
