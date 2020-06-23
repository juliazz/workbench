import request from '../utils/request';

/**
 *获取签单人列表
 */
const getTopUserList = async (params = {}) => request.post({
  data: params,
  url: 'kpi/getTopUserList'
});
/**
 *获取带单人列表
 */
const getServiceUserList = async (params = {}) => request.post({
  data: params,
  url: 'kpi/getServiceCatList'
});

/**
 *品牌列表
 */
const brandList = async (params = {}) => request.post({
  data: params,
  url: 'kpi/getOrderBrandList'
});
// 手工录单
const submitOrder = async(params = {}) => request.post({
  data: params,
  url: 'kpi/submitOrder'
})
export default {
  getTopUserList,
  submitOrder,
  getServiceUserList,
  brandList
};
