import func from './func'

const {
  isCheckAuthApiSetting
} = func

const authorize = function (opts, done) {
  // 避免死循环
  if (opts.$callee === 'isCheckAuthApiSetting') {
    done(opts);
    return;
  }
  isCheckAuthApiSetting(opts.scope, () => done(opts));
};

// 选择地址
const chooseAddress = function (opts, done) {
  isCheckAuthApiSetting('scope.address', () => done(opts));
};

const chooseInvoiceTitle = function (opts, done) {
  isCheckAuthApiSetting('scope.invoiceTitle', () => done(opts));
};

// 获取位置信息
const getLocation = function (opts, done) {
  isCheckAuthApiSetting('scope.userLocation', () => done(opts));
};

// 保存到相册
const saveImageToPhotosAlbum = function (opts, done) {
  isCheckAuthApiSetting('scope.writePhotosAlbum', () => done(opts));
}


export default {
  authorize,
  chooseAddress,
  chooseInvoiceTitle,
  getLocation,
  saveImageToPhotosAlbum
}
