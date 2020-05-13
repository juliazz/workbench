import request from '../utils/request';

/**
 *品牌列表
 */
const brandList = async (params = {}) => request.post({
  data: params,
  url: 'brandlist'
});

export default {
  brandList
};
