
import request from '../utils/request';
/**
 * 发起pk接口
 */
const addPK = async (params = {}) => request.post({
  url: 'kpi/addpk',
  data: params
});
/**
 * 获取最后一层列表数据接口
 */
const getuserbycatid = async (params = {}) => request.post({
  url: 'kpi/getuserbycatid',
  data: params
});
/**
 * 消息列表接口
 */
const pklist = async (params = {}) => request.post({
  url: 'kpi/pklist',
  data: params
});
/**
 * 消息列表接口
 */
const messagelist = async (params = {}) => request.post({
  url: 'kpi/messagelist',
  data: params
});
/**
 * 消息列表阅读状态接口
 */
const readmessage = async (params = {}) => request.post({
  url: 'kpi/readmessage',
  data: params
});
/**
 * 编辑PK消息接口
 */
const editpk = async (params = {}) => request.post({
  url: 'kpi/editpk',
  data: params
});


export default {
  addPK,
  messagelist,
  readmessage,
  getuserbycatid,
  pklist,
  editpk
}
