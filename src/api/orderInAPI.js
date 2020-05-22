import request from '../utils/request';

/**
 *品牌列表
 */
const brandList = async (params = {}) => request.post({
  data: params,
  url: 'kpi/getBrandList'
});
// 手工录单
const submitOrder = async(params = {}) => request.post({
  data: params,
  url: 'kpi/submitOrder'
})
export default {
  submitOrder,
  brandList
};
