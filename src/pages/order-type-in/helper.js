import utils from '../../utils/utils';

const rules = {
  othername: {
    type: 'String',
    require: true,
    message: '请输入客户姓名'
  },
  othertel: {
    type: 'Number',
    require: true,
    validator: utils.isPhone,
    typeMessage: '请输入正确的手机号',
    message: '请输入正确的手机号'
  },
  otheradress: {
    type: 'String',
    require: true,
    validator: (value) => {
      return value.length >= 14
    },
    message: '地址内容至少14字符'
  },
  brand: {
    type: 'String',
    require: true,
    message: '请填写订单品牌'
  },
  price: {
    type: 'String',
    require: true,
    message: '请填写订单金额'
  },
  sign: {
    type: 'String',
    require: true,
    message: '请填写签单人'
  },
  guide: {
    type: 'String',
    require: true,
    message: '请填写带单人'
  }
};
export default rules
