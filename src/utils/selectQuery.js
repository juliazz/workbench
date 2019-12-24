const createSelectorQuery = function (ele) {
  return new Promise((resolve) => {
    if (!this) throw new Error('createSelectorQuery.call(this, ele)')
    try {
      wx.createSelectorQuery().in(this)
        .select(ele)
        .boundingClientRect()
        .selectViewport()
        .scrollOffset()
        .exec((res) => {
          const [rect, port] = res
          if (rect && port) {
            resolve({ ...rect, ...port })
          } else {
            resolve({})
          }
        })
    } catch (err) {
      resolve({})
    }
  })
}

export default createSelectorQuery
