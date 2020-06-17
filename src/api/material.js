import request from '../utils/request';
/**
 * 上传素材接口
 */
const upLoadFile = async (params = {}) => request.post({
  data: params,
  url: 'upload'
});
/**
 * 发布素材接口
 */
const submitMaterial = async (params = {}) => request.post({
  data: params,
  url: 'kpi/submitMaterial'
});
/**
 * 发布素材接口
 */
const getMaterialList = async (params = {}) => request.post({
  data: params,
  url: 'kpi/getMaterialList'
});
/**
 * 更新素材下载次数
 */
const updateMaterialShare = async (params = {}) => request.post({
  data: params,
  url: 'kpi/updateMaterialShare'
});
/**
 * 更新素材下载次数
 */
const getUserMaterialList = async (params = {}) => request.post({
  data: params,
  url: 'kpi/getUserMaterialList'
});


export default {
  upLoadFile,
  submitMaterial,
  getMaterialList,
  updateMaterialShare,
  getUserMaterialList
};
