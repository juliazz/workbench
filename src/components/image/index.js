import normalizeStyle from '../../utils/normalizeStyle'
import createSelectorQuery from '../../utils/selectQuery'

const SWIPER = '../swiper/index'
export default Component({
  relations: {
    [SWIPER]: {
      type: 'parent'
    }
  },
  properties: {
    url: {
      type: String,
      value: ''
    },
    lazyload: {
      type: Boolean,
      value: true
    },
    mode: {
      type: String,
      value: 'widthFix'
    },
    ratio: {
      type: Number,
      value: 0
    },
    // 是否处于swiper视图
    type: {
      type: String,
      value: ''
    },
    // 是否圆角
    radius: {
      type: Boolean,
      value: false
    }
  },
  data: {
    loaded: false,
    customStyle: ''
  },
  pageLifetimes: {
    show: function () {
      if (this.url) {
        this.setData({
          url: this.url
        })
      }
    },
    hide: function () {},
    resize: function () {}
  },

  async attached() {
    await this.delay(50)
    const { ratio } = this.data
    if (!ratio) return
    const rect = await createSelectorQuery.call(this, '#image')
    const { width } = rect
    const style = {
      width: `${width}px`,
      height: `${width * ratio}px`
    }
    this.setData({
      customStyle: normalizeStyle(style)
    })
  },
  methods: {
    delay(timer) {
      return new Promise(resolve => setTimeout(resolve, timer))
    },
    async bindload(event) {
      this.triggerEvent('load', event)
      this.setData({
        loaded: true
      })
      const result = await createSelectorQuery.call(this, '#image')
      const { width, height } = result
      const style = {
        'max-width': `${parseInt(width)}px`,
        'max-height': `${parseInt(height)}px`,
        width: `${parseInt(width)}px`,
        height: `${parseInt(height)}px`
      }
      this.setData({
        customStyle: normalizeStyle(style)
      })
      // 如果图片处于swiper
      const { type } = this.data
      if (!type == 'swiper') return
      const elements = this.getRelationNodes(SWIPER)
      if (elements.length > 0) {
        elements.forEach((ele) => {
          ele.updateSwiperHeight()
        })
      }
    },
    binderror(event) {
      this.triggerEvent('error', event)
      const { url } = this.data
      this.url = `${url.split('?')[0]}?v=1`;
    }
  }
})
