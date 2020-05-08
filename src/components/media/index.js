
Component({
  properties: {
    url: {
      type: String,
      value: '',
      observer(value) {
        const reg = /\.(mp4|wmv|avi)/i
        let _type = 'image'
        if (reg.test(value)) _type = 'video'
        this.setData({ _type })
      }
    },
    status: {
      type: Boolean,
      value: false,
      observer (value) {
        this.$delay(50)
        const { _type, networkType } = this.data

        if (_type == 'video') {
          const ctx = wx.createVideoContext('video', this)
          if (value && networkType == 'wifi') ctx.play()
          else ctx.pause()
        }
      }
    },
    autoplay: {
      type: Boolean,
      value: false
    }
  },
  data: {
    _type: '',
    networkType: ''
  },
  lifetimes: {
    async attached() {
      const {networkType} = await wx.$getNetworkType();
      this.setData({networkType})
    },
    bindplay() {
      const ctx = wx.createVideoContext('video', this)
      ctx.play()
    }
  },
  methods: {}
})
