import storageManage from '../../utils/storage-manage';
import api from '../../api/index';

Component({
  options: {
    multipleSlots: true
  },
  properties: {
    isTransparentAuth: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },
  data: {
  },
  pageLifetimes: {
    show: function() {},
    hide: function() {},
    resize: function() {}
  },
  lifetimes: {
    attached: function() {},
    ready: function() {},
    moved: function() {},
    detached: function() {}
  },
  methods: {
    async bindgetuserinfo(event) {
      const { errMsg, iv, encryptedData, signature, rawData, userInfo } = event.detail;
      if (errMsg != 'getUserInfo:ok') return;
      console.log(event.detail)
      const { nickName = '', gender, province, country, city } = userInfo;
      this.$showLoading()
      const result = await api.decodeUserInfo({
        encryptedData,
        iv,
        signature,
        rawData
      });
      let { model } = wx.getSystemInfoSync();
      this.$hideLoading()
      const { data, resultCode, msg } = result;
      if (resultCode != '1') return this.$showToast(msg);
      const { unionId, avatarUrl } = JSON.parse(data);
      const user_info = JSON.parse(data)
      getApp().globalData.gio('setVisitor', user_info)
      await api.updateMember({
        unionId,
        avatarUrl,
        nickName,
        model,
        gender,
        province,
        country,
        city
      });
      this.setData({ avatarUrl, nickName });
      await storageManage.setAvatarUrl(avatarUrl);
      this.triggerEvent('callback', this.data);
    }
  }
});
