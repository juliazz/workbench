
import request from '../utils/request';
/**
 * 客户接口
 */
const getClientList = async (params = {}) => request.post({
  url: 'kpi/getClientList',
  data: params
});


export default {
    getClientList
}
