import config from '../../config.js';
// import api from '../../api/index.js';

export default Component({
  behaviors: [],
  properties: {
    disabled: {
      type: Boolean,
      value: false
    },
    openType: {
      type: String,
      value: 'normal'
    },
    contact: {
      type: Object,
      value: {}
    }
  },
  data: {},
  attached() {},
  methods: {
    submitEventer(event) {
      // 函数回调
      this.triggerEvent('emiteventer', {})

      // 上报FormId
      // api.addFromId({
      //   formId: event.detail.formId,
      //   source: 'normal',
      //   openId: wx.getStorageSync('D1M_OPENID').value,
      //   wechatId: config.wechatId
      // });
    },
    // - contact
    contactEventer({ detail = {} } = {}) {
      this.triggerEvent('contact', detail)
    },

    // getPhoneNumber
    getPhoneNumberEventer({ detail = {} } = {}) {
      this.triggerEvent('getphonenumber', detail)
    },

    openSettingEventer({ detail = {} } = {}) {
      this.triggerEvent('opensetting', detail)
    }
  }
});
