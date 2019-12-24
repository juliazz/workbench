const env = `${process.env.NODE_ENV || 'dev'}`
const config = require(`./${env}.env.js`)
const version = '2.6.0'
module.exports = {
  ...config,
  env,
  version
}


