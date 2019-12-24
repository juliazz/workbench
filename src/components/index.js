/**
 * 使用选择器选择组件实例节点，返回匹配到的第一个组件实例对象
 * @param {String} selector 节点选择器
 * @param {Object} ctx 页面栈或组件的实例，默认为当前页面栈实例
 */
const getCtx = (selector, ctx) => {
  const pages = getCurrentPages()
  if (!ctx) {
    ctx = pages[pages.length - 1]
  }
  const componentCtx = ctx.selectComponent(selector)
  if (!componentCtx) {
    console.log(`${ctx.route}: 没有引入${selector}组件`)
    return;
  }
  return componentCtx
}


const $wLoading = (selector = '#w-loading', ctx) => getCtx(selector, ctx)

export default {
  $wLoading
}
