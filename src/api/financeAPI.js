import request from '../utils/request';
/**
 * 品牌个人账户首页数据
 */
const getFinanceInfo = async (params = {}) => request.post({
  url: 'kpi/getFinanceInfo',
  data: params
});

/**
 * 个人余额明细
 */
const getPersonalCashLog = async (params = {}) => request.post({
  url: 'kpi/getPersonalCashLog',
  data: params
});
/**
 * 个人账户详情
 */
const getPersonalFundInfo = async (params = {}) => request.post({
  url: 'kpi/getPersonalFundInfo',
  data: params
});
/**
 * 品牌直播签单明细收入
 */
const getLiveOrderList = async (params = {}) => request.post({
  url: 'kpi/getLiveOrderList',
  data: params
});
/**
 * 线上报名明细收入
 */
const getSignList = async (params = {}) => request.post({
  url: 'kpi/getSignList',
  data: params
});
/**
 * 线上报名明细收入
 */
const getBrandCashList = async (params = {}) => request.post({
  url: 'kpi/getBrandCashList',
  data: params
});
/**
 * 金币兑换明细
 */
const getPointExchangeList = async (params = {}) => request.post({
  url: 'kpi/getPointExchangeList',
  data: params
});
/**
 * 提现
 */
const submitWithdrawApply = async (params = {}) => request.post({
  url: 'kpi/submitWithdrawApply',
  data: params
});
/**
 * 充值
 */
const submitRecharge = async (params = {}) => request.post({
  url: 'kpi/submitRecharge',
  data: params
});


export default {
  getPersonalCashLog,
  getFinanceInfo,
  getPersonalFundInfo,
  getLiveOrderList,
  getSignList,
  getBrandCashList,
  getPointExchangeList,
  submitWithdrawApply,
  submitRecharge
}
