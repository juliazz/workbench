import './wx-promise'
import './extend'
import './auth-extend/index'
import './update-manager'
import tokenManage from './token-manage'
import request from './request'
import utils from './utils'
import logger from './logger'
import preload from './preload'
import storageManage from './storage-manage'

tokenManage.config({ request });

export {
  tokenManage,
  request,
  utils,
  logger,
  preload,
  storageManage
};
