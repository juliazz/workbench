/* eslint-disable */
import lodash from './lodash';
import accounting from '../vendor/accounting'
import validator from '../vendor/validator'
/**
 * 格式化时间
 * @param time
 */
const formatTime = (time) => {
  if (typeof time !== 'number' || time < 0) {
    return time;
  }
  const hour = parseInt(time / 3600, 10);
  time %= 3600;
  const minute = parseInt(time / 60, 10);
  time = parseInt(time % 60, 10);
  const second = time;

  return ([hour, minute, second]).map((n) => {
    n = n.toString();
    return n[1] ? n : `0${n}`;
  }).join(':');
};


/**
 * 格式化日期
 * @param time
 */
const formatNum = (value) => {
  const str = value.toString();
  return str[1] ? str : `0${str}`;
};
const formatDate = (time) => {
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  const millisecond = time.getMilliseconds();
  const date = [year, month, day].map(formatNum).join('/');
  time = [hour, minute, second].map(formatNum).join(':');
  return `${date} ${time}.${millisecond}`;
};
//2020-05-18 14:32:57 ==>  2020-5-30 00:00  参数2020-05-18 14:32:57
const formatDate2 = (time) => {
  let time_ = new Date(time);
  const year = time_.getFullYear();
  const month = time_.getMonth() + 1;
  const day = time_.getDate();
  const hour = time_.getHours();
  const minute = time_.getMinutes();
  const date = [year, month, day].map(formatNum).join('.');
  time = [hour, minute].map(formatNum).join(':');
  return `${date} ${time}`;
};
// 2020-05-18 14:32:57 ==> 05.19  参数2020-05-18 14:32:57
const getMouthDay = (time) => {
  let date = new Date(time);
  let seperator1 = ".";
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  let mouthDay =  month + seperator1 + strDate;
  return mouthDay;
}
// 获取当前时间2018/05/19
const getNowFormatDate = () => {
  let date = new Date();
  let seperator1 = "-";
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if(month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if(strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  let currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}
// 将2018-05-19T08:04:52.000+0000转化为2018/05/19
const myTime = (date) =>{
       let arr=date.split("T");
        let dd=arr[0].replace(/-/g, '/');
   return dd;
  }
const myTime2 = (date) =>{
       let arr=date.split(" ");
        let dd=arr[0].replace(/-/g, '/');
   return dd;
  }
  // 手机中间四位******
const hidePhoneNumber = (phone) =>{
  let reg = /(\d{3})\d{4}(\d{4})/;
  let tel1 = phone.replace(reg, "$1****$2")
  return tel1
}
// 时间转换天 时 分
const formatDuring= (mss) =>{
  let days = parseInt(mss / (1000 * 60 * 60 * 24));
  days = days.toString().length>1?days:'0'+days.toString()
  let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  hours = hours.toString().length>1?hours:'0'+hours.toString()
  let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  minutes = minutes.toString().length>1?minutes:'0'+minutes.toString()
  // var seconds = (mss % (1000 * 60)) / 1000;
  // return days + " 天 " + hours + " 小时 " + minutes + " 分钟 ";
  return { days, hours, minutes }
}
/**
 * 格式链接
 * @param url
 * index/index => /pages/index/index
 * pages/index/index => /pages/index/index
 */
const normalizeUrl = (url) => {
  if (!url) {
    return url;
  }
  if (url[0] === '/') {
    url = url.substr(1);
  }
  if (!/^pages/.test(url)) {
    url = `pages/${url}`;
  }
  return `/${url}`;
};

/**
 * 解析链接
 * @param url
 * pages/index/index?id=1
 * =>
 * route: pages/index/index
 * query: {id: 1}
 */
const parseUrl = (url) => {
  const [route, search] = url.split('?');
  let query = {};
  if (search) {
    query = search.split('&').reduce((obj, pair) => {
      const [key, val] = pair.split('=');
      obj[key] = val;
      return obj;
    }, {});
  }
  return {
    route,
    query
  };
};
const currency = (value ,type) => {
  if (typeof value == 'string') value = parseFloat(value)
  if (isNaN(value)) return value
  return `${(value.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')}`
}

/**
 * 去除首字符
 * @param str
 * @param char
 * /index/index => index/index
 */
const trimStart = (str, char) => {
  if (str[0] === char) {
    return trimStart(str.substr(1));
  }
  return str;
};

/**
 * 去除尾字符
 * @param str
 * @param char
 * /index/index/ => /index/index
 */
const trimEnd = (str, char) => {
  const length = str.length;
  if (str[length - 1] === char) {
    return trimEnd(str.substr(0, length - 1));
  }
  return str;
};

/**
 * 合并url
 * @param baseUrl
 * @param pathUrl
 * http://test.com/ /index/index
 * =>
 * http: //test.com/index/index
 */
const combinUrl = (baseUrl, pathUrl) => {
  if (~pathUrl.indexOf('://')) {
    return pathUrl;
  }
  return `${trimEnd(baseUrl, '/')}/${trimStart(pathUrl, '/')}`;
};


/**
 * 防抖
 * @param {*} func
 * @param {*} wait
 * @param {*} immediate
 */
const debounce = (func, wait, immediate) => {
  /** 调用debounce声明一下变量 * */
  let timeout;
  let args;
  let context;
  let timestamp;
  let resullt;
  /** 初次由return函数调用, 后面自己递归调用 * */
  const later = function () {
    const now = new Date().getTime();
    // 记录在wait时间内上一次执行return函数的时间间隔
    const last = now - timestamp;
    // 时间间隔小于wait,继续递归调用
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 用于immediate==false在结束边界调用
      if (!immediate) {
        resullt = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };
  return function () {
    context = this;
    args = arguments;
    timestamp = new Date().getTime();
    const exec = immediate && !timeout;
    // 初次timeout不存在,设置延时调用later
    if (!timeout) timeout = setTimeout(later, wait);
    // 用于immediate==true在开始边界调用
    if (exec) {
      resullt = func.apply(context, args);
      context = args = null;
    }
    return resullt;
  };
};

/**
 * 防抖
 * @param   {function}  func        传入函数
 * @param   {number}    wait        表示时间窗口的间隔
 * @param   {object}    options     如果想忽略开始边界上的调用，传入{leading: false}。
 *                                  如果想忽略结尾边界上的调用，传入{trailing: false}
 * @returns {function}              返回客户调用函数   返回客户调用函数
 */
function throttle(func, wait, options) {
  let timeout; let context; let args; let
    result
  let previous = 0;
  options = options || {}
  // 延时执行函数
  let later = function () {
    let now = new Date().getTime()
    // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
    previous = options.leading === false ? 0 : now
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  return function () {
    context = this
    args = arguments
    let now = new Date().getTime()
    if (!previous && options.leading === false) previous = now
    let remaining = wait - (now - previous)
    // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
    // remaining大于时间窗口wait，表示客户端系统时间被调整过
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout)
      timeout = null
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
      // 如果延迟执行不存在，且没有设定结尾边界不执行选项
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}

/**
 * 生成随机ID
 */
const randomId = () => Math.random().toString(36).substr(2)

/**
 * 判断手机系统
 */
const getPlatform = () => {
  return wx.getSystemInfoSync().platform
}

// 判断是否是Ipx
const isIpx = () => {
  const name = 'iPhone X'         // x , xs
  const name2 = 'iPhone11'      // xsP
  const model = wx.getSystemInfoSync().model
  console.log('model===', model)
  return model.indexOf(name) > -1 || model.indexOf(name2) > -1
}
/**
 * 判断SDK版本
 * @param {*} v1  小程序SDK最低版本
 * @param {*} v2  用户小程序SDK版本
 */
const compareVersion = (v1, v2) => {
  v1 = v1.split('.')
  v2 = v2.split('.')
  let len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    let num1 = parseInt(v1[i])
    let num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    }
    if (num1 < num2) {
      return -1
    }
  }
  return 0
}
const convertQuery = (value) => {
  let result = ''
  Object.keys(value).forEach((key) => {
    result += `${key}=${value[key]}&`
  })
  result = result.substring(0, result.length - 1)
  return result
}
const convertParams = (value) => {
  value = decodeURIComponent(value)
  let result = {}
  value.split('&').forEach(item => {
    const [key, value] = item.split('=')
    result[key] = value
  })
  return result
}
// 正则去掉字符串两边空格
const spaceTrim = (value) => {
  return value.replace(/(^\s*)|(\s*$)/g, '');
}

/**
 * 判断是否是Android
 */
const checkAndroid = () => {
  const systemInfo = wx.getSystemInfoSync()
  const {
    platform, system
  } = systemInfo
  return !!~platform.indexOf('android') || !!~system.indexOf('Android')
}
//日期转时间戳
const  getUnixTime = (dateStr) =>{
  let newstr = dateStr.replace(/-/g,'/'); 
  let date =  new Date(newstr); 
  let time_str = date.getTime().toString();
  return time_str.substr(0, 10);
}

export default {
  ...lodash,
  ...accounting,
  ...validator,
  formatTime,
  formatDate2,
  normalizeUrl,
  getMouthDay,
  parseUrl,
  debounce,
  throttle,
  currency,
  isIpx,
  formatDate,
  combinUrl,
  randomId,
  getPlatform,
  compareVersion,
  convertQuery,
  convertParams,
  spaceTrim,
  checkAndroid,
  getUnixTime,
  myTime,
  myTime2,
  hidePhoneNumber,
  getNowFormatDate,
  formatDuring
};
