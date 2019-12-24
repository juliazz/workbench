import list from './config.js'
// import api from '../api/index'
// import storageManage from '../utils/storage-manage'

Component({
  properties: {
    activeIndex: {
      type: Number,
      value: 0
    }
  },
  data: {
    list
  },
  pageLifetimes: {
    show: function () {},
    hide: function () {},
    resize: function () {}
  },
  lifetimes: {
    attached: function () {},
    ready: function () {},
    moved: function () {},
    detached: function () {}
  },
  methods: {
    switchTab(event) {
      const {
        url, index
      } = event.currentTarget.dataset
      if (url) {
        const routes = getCurrentPages()
        const route = routes[routes.length - 1].route
        if (url != route) {
          this.$switchTab(url)
        }
      }
    }
  }
})
