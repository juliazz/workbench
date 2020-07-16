const createSelectorQueryAll = function (ele) {
  return new Promise((resolve) => {
    try {
      wx.createSelectorQuery()
        .selectAll(ele)
        .fields({ // 需要获取的节点相关信息
          node: true, // 是否返回节点对应的 Node 实例
          size: true // 是否返回节点尺寸（width height）
        })
        .exec((res) => {
          console.log(res, '99999999999999')
          const dom = res[0] // 因为页面只存在一个画布，所以我们要的dom数据就是 res数组的第一个元素
          const canvas = dom.node // canvas就是我们要操作的画布节点
          const ctx = canvas.getContext('2d') // 以2d模式，获取一个画布节点的上下文对象
          const dpr = wx.getSystemInfoSync().pixelRatio // 获取设备的像素比，未来整体画布根据像素比扩大
          // const [rect, port] = res
          // if (rect && port) {
          //   resolve({ ...rect, ...port })
          // } else {
          //   resolve({})
          // }
        })
    } catch (err) {
      resolve({})
    }
  })
}


export default {
  createSelectorQueryAll
}
