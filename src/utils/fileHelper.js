import {storageManage} from './index'
// 上传文件
const upLoadFile = async (path, type = 'image') => {
  const token = await storageManage.getAccessToken()
  console.log(path, token, type)
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: 'https://api.fmcd.feimi0513.xyz/api/upload',
      filePath: path,
      header: {'x-feimi-token': token},
      name: 'file',
      formData: {
        type
      },
      success(res) {
        console.log(res)
        if (res.errMsg == 'uploadFile:ok') {
          resolve(res.data)
        }
      },
      fail: err => {
        console.log(err)
        reject(err);
      }
    });
  })
}
// 把base64转换成图片
const fsm = wx.getFileSystemManager();
const FILE_BASE_NAME = 'tmp_base64src'; // 自定义文件名
const base64src = (base64data, cb) => {
  const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
  if (!format) {
    return (new Error('ERROR_BASE64SRC_PARSE'));
  }
  const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
  const buffer = wx.base64ToArrayBuffer(bodyData);
  fsm.writeFile({
    filePath,
    data: buffer,
    encoding: 'binary',
    success() {
      cb(filePath);
    },
    fail() {
      return (new Error('ERROR_BASE64SRC_WRITE'));
    }
  });
};

export default { base64src, upLoadFile};
