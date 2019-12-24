import request from '../utils/request';

/**
 * 获取测试数据
 */
const test1 = async (params = {}) => request.get({
  data: params,
  url: `/test1/${params.id}`
});


const test2 = async (params = {}) => request.post({
  data: params,
  url: '/test2'
});


export default {
  test1,
  test2
}
