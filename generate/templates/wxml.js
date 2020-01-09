module.exports = options => {
  // 普通页面
  let string = `
<w-loading id="w-loading"></w-loading>
<w-page class="w-page ${options.type}-${options.name}">
  <view class="header" slot="header"></view>
  <view class="content" slot="content">
    <text>{{title}}</text>
    <view class="icon-accessory"></view>
  </view>
  <view class="footer" slot="footer"></view>
</w-page>
`
 
  // 功能组件 | 业务组件
  if(options.type == 'components' || options.type == 'module') {
    string =  `
<view class="${options.type}-${options.name}">
`
  }
  return string
}



