module.exports = options => {
  // 普通页面
  let string =  `
{
  "navigationBarTitleText": "",
  "usingComponents": {}
}
  `

  // 功能组件 | 业务组件
  if(options.type == 'components' || options.type == 'module') {
    string =  `
  {
    "usingComponents": {}
  }
      `
  }
  return string
}