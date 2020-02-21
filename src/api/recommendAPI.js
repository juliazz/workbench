import request from '../utils/request';
import config from '../config'

const { wechatId } = config
/**
 * 添加商品到推荐单
 * @productId
 * @productSpecId
 * @quantity
 */
const addRemoteList = async (params = {}) => request.post({
  data: params,
  url: '/recommended/save'
});
/**
 * 根据id或时间查询推荐单
 */
const searchRemoteList = async (params = {}) => request.get({
  data: params,
  url: '/recommended/getList'
});
/**
 * 添加查看推荐单访问详情
 */
const RemoteListViewDetail = async (params = {}) => request.get({
  url: `recommended/visitHistory/${params.id}`
});

/**
 * 添加查看推荐单详情
 */
const RemoteListDetail = async (params = {}) => request.get({
  url: `/recommended/getProductList?ids=${params.ids}`
});

/**
 * 添加查看成单记录
 */
const RemoteOrder = async (params = {}) => request.get({
  // data: params,
  url: `recommended/orderRecord?caCode=${params.caCode},${params.storeCode}&beginDate=${params.beginDate}&endDate=${params.endDate}`
});

export default {
  addRemoteList,
  RemoteListDetail,
  RemoteListViewDetail,
  searchRemoteList,
  RemoteOrder
};
