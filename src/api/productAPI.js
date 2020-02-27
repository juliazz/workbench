import request from '../utils/request';
import config from '../config'
import tokenManage from '../utils/token-manage';

const { shopWechatId } = config


/**
 * 获取分类列表
 * @parentId
 */
const getChildCategory = async (params = {}) => request.get({
  data: params,
  url: `/category/getAll/${0}/${config.shopWechatId}`
});
/**
 * 获取类目列表
 * @parentId
 */
const getChildCatelog = async (params = {}) => request.get({
  data: params,
  url: `/catalog/getAll/${0}/${config.shopWechatId}`
});


/**
 * 获取分类数据
 * @id      ID
 * @name    名称
 * @status  状态 0 | 1
 * @type    0 web首页 | 1 小程序首页 | 2 二级页 | 3 分类页 | 4 开屏
 */
const getCategory = async (params = {}) => request.post({
  data: { type: 2, status: 1 },
  url: 'index/select'
});


/**
 * 获取商品列表
 * @categoryIds array
 */
const getSearchList = async (params = {}) => request.post({
  data: params,
  url: '/product/search'
});

/**
 * 获取商品推荐列表
 * @categoryIds array
 */
const getRemoteList = async (params = {}) => request.get({
  // data: params,
  url: `product/getRelatedProductByConfig/${shopWechatId}/BRAND_RECOMMEND_CART_PAGE`
});

/**
 * 生成分享二维码
 * @spu
 */
const getSharePicture = async (params = {}) => {
  const token = await tokenManage.get()
  try {
    return await wx.$downloadFile({
      header: { token },
      url: `${config.baseUrl}estore/share/picture/product?code=${params.spu}`
    })
  } catch (err) {
    return err
  }
}


export default {
  getChildCategory,
  getChildCatelog,
  getSearchList,
  getRemoteList,
  getSharePicture,
  getCategory
};
