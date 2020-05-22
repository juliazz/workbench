import request from '../utils/request';
/**
 * 用户活动列表
 * @parentId
 */
const upLoadFile = async (params = {}) => request.post({
  data: params,
  url: 'upload'
});


export default {
  upLoadFile
};
