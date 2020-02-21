const env = `${process.env.NODE_ENV || 'dev'}`
const config = require(`./${env}.env.js`)
const version = '2.10.1'
const wechatId = 202
const shopWechatId = 87
module.exports = {
  ...config,
  env,
  version,
  wechatId,
  shopWechatId
}


