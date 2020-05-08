import config from '../../config';
import storageManage from '../../utils/storage-manage';
import utils from '../../utils/utils'

const $debounce = utils.debounce((func) => {
  func()
}, 300, false);

export default Component({
  behaviors: [],
  properties: {
    path: {
      default: '',
      type: String
    }
  },
  data: {
    $isAuthorizeCamera: false,
    $isAuthorizeCameraFail: false
  },
  attached() {
    const {$isAuthorizeCamera} = this.data
    if (!$isAuthorizeCamera) {
      this.$getSetting()
    }
  },
  methods: {
    // 是否已授权摄像
    $getSetting() {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.writePhotosAlbum'] === true) {
            this.setData({
              $isAuthorizeCamera: true
            })
          }
          if (res.authSetting['scope.writePhotosAlbum'] === false) {
            this.setData({
              $isAuthorizeCameraFail: true
            })
          }
        }
      })
    },
    $onAuthorizeCamera() {
      wx.showLoading({mask: true})
      const {path} = this.data
      console.log('path===', path)
      wx.saveImageToPhotosAlbum({
        filePath: path,
        success: (res) => {
          console.log('res===', res)
          this.triggerEvent('emiteventer', true)
        },
        fail: (err) => {
          console.log('err===', err)
          this.setData({
            $isAuthorizeCameraFail: true
          })
          this.triggerEvent('emiteventer', false)
        }
      })
    },
    $toCamera() {
      $debounce(() => {
        this.$onAuthorizeCamera()
      })
    },
    $onOpenSetting(e) {
      const {authSetting} = e.detail
      if (authSetting['scope.writePhotosAlbum'] === true) {
        this.$onAuthorizeCamera()
        this.setData({
          $isAuthorizeCamera: true
        })

        wx.reportAnalytics('auth_album', { auth_album_result: 0 });
      } else {
        wx.reportAnalytics('auth_album', { auth_album_result: 1 });
        this.triggerEvent('emiteventer', false)
      }
    }
  }
});
