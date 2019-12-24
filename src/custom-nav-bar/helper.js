const getWindowStyle = () => {
  try {
    if (!__wxConfig) throw new Error()
    const {
      page,
      global
    } = __wxConfig
    const pages = getCurrentPages()
    const { route } = pages[pages.length - 1]
    let window = {}
    Object.keys(page).forEach(key => {
      if (key.indexOf(route) >= 0) {
        window = page[key].window
      }
    })
    return {
      ...global.window,
      ...window
    }
  } catch (err) {
    return {
      navigationBarBackgroundColor: '#000000',
      navigationBarTextStyle: 'white',
      navigationBarTitleText: '标题'
    }
  }
}

export default {
  getWindowStyle
}
