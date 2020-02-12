import request from '../utils/request';
import config from '../config'
import tokenManage from '../utils/token-manage';

const { wechatId } = config


/**
 * 获取商品列表
 * @parentId
 */
const getChildCategory = async (params = {}) => request.get({
  data: params,
  url: `/estore/category/getAll/${0}/${config.wechatId}`
});


/**
 * 获取商品列表
 * @categoryIds array
 */
const getSearchList = async (params = {}) => request.post({
  data: params,
  url: '/estore/product/search'
});


/**
 * 获取搜索列表
 * @categoryIds array
 */
const getProductList = async (params = {}) => request.post({
  data: params,
  url: '/estore/product/search'
});


/**
 * 获取商品详情
 * @spu
 */
const getProductDetail = async (params = {}) => request.get({
  url: `/estore/product/getBySpu/${params.spu}?isAll=1`
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

/**
 * 获取推荐商品
 * @spu
 */

const getEgcRelatedGoods = async () => request.get({
  url: `/estore/product/getRelatedProductByConfig/${wechatId}/EGC_INVALIDGOODS`
})

/**
 * 添加购物车商品
 * @productId
 * @productSpecId
 * @quantity
 */
const addCart = async (params = {}) => request.post({
  data: params,
  url: '/estore/cart/add'
});

export default {
  getChildCategory,
  getSearchList,
  getProductList,
  getProductDetail,
  getSharePicture,
  addCart,
  getEgcRelatedGoods
};
