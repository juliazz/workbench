module.exports = options => {
  // 普通页面
  let string = `
w-loading(id="w-loading")
w-page(
  class="w-page ${options.type}-${options.name}"
)
  view(slot="header" class="header")
  view(slot="content" class="content")
    text {{title}}
  view(slot="footer" class="footer")
`
  // 功能组件 | 业务组件
  if (options.type == 'components' || options.type == 'module') {
    string = `
view(class="${options.type}-${options.name}")
    `
  }
  return string
}
