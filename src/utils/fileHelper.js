import {tokenManage} from './index'

const upLoadFile = async (path)=>{
    const token = await tokenManage.get()
    return new Promise((resolve, reject)=>{
        wx.uploadFile({
            url: 'https://api.fmlesson.cn/api/upload', 
            filePath: path,
            header:{'x-feimi-token':token},
            name: 'file',
            success(res) {
                if(res.errMsg=='uploadFile:ok'){
                    resolve(res.data)
                }
            },
            fail: err => {
                reject(err);
              }
          });
    })
   
}
const fsm = wx.getFileSystemManager();
const FILE_BASE_NAME = 'tmp_base64src'; //自定义文件名
const  base64src = (base64data, cb) => {
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
    },
  });
};

export default { base64src , upLoadFile};