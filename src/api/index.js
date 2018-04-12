import Vue from 'vue'
const vm = new Vue()

const TransFnc = function (data) {
  let ret = ''
  for (let it in data) {
    ret += it + '=' + data[it] + '&'
  }
  ret = ret.substring(0, ret.lastIndexOf('&'));
  return ret
}

const HomeApi = {
  //bannerList
  SelectBanner:function SelectBanner(params={}) {
    return vm.$http.get(vm.$CONSTANTS.APIWechat + '/common/advertisementmgr/advlistone', {params:params})
  },
  //获取产品列表 1 推荐 good: 1 精品 hot 热门
  GetProducts:function GetProducts(params={}) {
    return vm.$http.get(vm.$CONSTANTS.APIWechat + '/productmgr/appproductlist', {params:params})
  },
  //获取商品分类 {"classParam": 0,"limit": 8}
  GetGoodsClass:function GetGoodsClass(params={}) {
    return vm.$http.get(vm.$CONSTANTS.APIWechat + '/productclassmgr/getproductclass', {params:params})
  },
  //获取商品详情
  GetGoodsDetail:function GetGoodsDetail(params={}) {
    return vm.$http.get(vm.$CONSTANTS.APIWechat + '/productmgr/productcontent', {params:params})
  },
  //登录接口
  Login:function Login(params) {
    return vm.$http({
      url: vm.$CONSTANTS.APIWechat + '/loginmgr/applogin',
      method: 'post',
      data: params,
      transformRequest: [TransFnc],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }}
    )
  },
  // 获取手机验证码接口
  SmsCode: function SmsCode(params) {
    return vm.$http({
      url: vm.$CONSTANTS.APIWechat + '/registermgr/getcellphonecode',
      method: 'post',
      data: params,
      transformRequest: [TransFnc],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }}
    )
  },
  // 加收藏接口
  AddBookMark: function AddBookMark(params) {
    return vm.$http({
      url: vm.$CONSTANTS.APIWechat + '/member/bookmark/addbookmark',
      method: 'post',
      data: params,
      transformRequest: [TransFnc],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }}
    )
  },
  //加入购物车接口
  addToCart: function addToCart(params={}) {
    return vm.$http.get(vm.$CONSTANTS.APIWechat + '/member/cartmgr/addshoppingcart', {params:params})
  },
  //立即购买接口
  QuickBuy: function QuickBuy(params={}) {
    return vm.$http.get(vm.$CONSTANTS.APIWechat + '/member/cartmgr/quickbuy', {params})
  },
  //购物车列表接口
  CarList: function CarList(params={}) {
    return vm.$http.get(vm.$CONSTANTS.APIWechat + '/member/cartmgr/index', {params:params})
  },
  // 修改购物车物品数量
  ModifyProductNum: function ModifyProductNum(params) {
    return vm.$http({
      url: vm.$CONSTANTS.APIWechat + '/member/cartmgr/modifyproductnum',
      method: 'post',
      data: params,
      transformRequest: [TransFnc],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }}
    )
  },
  // 从购物车删除物品
  RemoveProduct: function RemoveProduct(params) {
    return vm.$http({
      url: vm.$CONSTANTS.APIWechat + '/member/cartmgr/remove',
      method: 'post',
      data: params,
      transformRequest: [TransFnc],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }}
    )
  },
  // 获取订单数据
  GetOrderDetail: function GetOrderDetail(params) {
    return vm.$http.get(vm.$CONSTANTS.APIWechat + '/member/cartmgr/orderconfirm', {params})
  },
  OrderDetail: function OrderDetail(params) {
    return vm.$http.get(vm.$CONSTANTS.APIWechat + '/member/ordermgr/orderdetail', {params})
  },
  // 获取微信用户信息
  GetWeixinUser: function GetWeixinUser(params) {
    return vm.$http({
      url: vm.$CONSTANTS.APIWeixin + '/approve',
      method: 'post',
      data: params,
      transformRequest: [TransFnc],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }}
    )
  },
  // 微信支付成功调用接口
  OrderPaySuccess: function OrderPaySuccess(params) {
    return vm.$http({
      url: vm.$CONSTANTS.APIWeixin + '/orderPaySuccess',
      method: 'post',
      data: params,
      transformRequest: [TransFnc],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }}
    )
  },
  // 注册
  Regiter: function Regiter(params) {
    return vm.$http({
      url: vm.$CONSTANTS.APIWechat + '/registermgr/appregister',
      method: 'post',
      data: params})
  },
  // 下单
  OrderSubmit: function OrderSubmit(params) {
    return vm.$http.get(vm.$CONSTANTS.APIWechat + '/member/cartmgr/ordersubmit', {params})
  },
  // 获取订单数量
  GetOrderNum: function GetOrderNum(params={}) {
    return vm.$http.get(vm.$CONSTANTS.APIWechat + '/member/ordermgr/orderNum', {params})
  },
  // 获取个人信息
  GetUserInfo: function GetUserInfo(params={}) {
    return vm.$http.get(vm.$CONSTANTS.APIWechat + '/member/userinfomgr/userinfo', {params})
  },
  // 获取微信config
  WxConfig: function WxConfig(params={}) {
    return vm.$http({
      url: vm.$CONSTANTS.APIWeixin + '/weixinConfig',
      method: 'post',
      data: params,
      transformRequest: [TransFnc],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 查询订单列表
  GetOrderList: function GetOrderList(params={}) {
    return vm.$http.get(vm.$CONSTANTS.APIWechat + '/member/ordermgr/orderlist', {params})
  },
  // 新增收货地址
  AddAdress: function AddAdress(params={}) {
    return vm.$http({
      url: vm.$CONSTANTS.APIWechat + '/member/addressmgr/addaddress',
      method: 'post',
      data: params,
      transformRequest: [TransFnc],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 修改收货地址接口
  UpdateAddress: function UpdateAddress(params={}) {
    return vm.$http.get(vm.$CONSTANTS.APIWechat + '/member/addressmgr/updateaddress', {params})
  },
  // 收货地址设为默认接口
  UpdateAddressDefault: function UpdateAddressDefault(params={}) {
    return vm.$http({
      url: vm.$CONSTANTS.APIWechat + '/member/addressmgr/updateaddressdefault',
      method: 'post',
      data: params,
      transformRequest: [TransFnc],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 收货地址列表
  AddressList: function AddressList(params={}) {
    return vm.$http.get(vm.$CONSTANTS.APIWechat + '/member/addressmgr/addresslist', {params})
  },
  // 删除收货地址
  RemoveAddress: function RemoveAddress(params={}) {
    return vm.$http({
      url: vm.$CONSTANTS.APIWechat + '/member/addressmgr/removeaddress',
      method: 'post',
      data: params,
      transformRequest: [TransFnc],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 微信支付接口
  WeixinPay: function WeixinPay(params={}) {
    return vm.$http({
      url: vm.$CONSTANTS.APIWeixin + '/orderPay',
      method: 'post',
      data: params,
      transformRequest: [TransFnc],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 增加评论接口
  AddproductEvaluate: function AddproductEvaluate(params={}) {
    return vm.$http({
      url: vm.$CONSTANTS.APIWechat + '/member/evaluationmgr/addproductEvaluate',
      method: 'post',
      data: params,
      transformRequest: [TransFnc],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 根据地址ID查询地址信息
  GetDatabyAddressId: function GetDatabyAddressId(addressId) {
    return vm.$http.get(vm.$CONSTANTS.APIWechat + '/member/addressmgr/ajaxToupdateDetail/' + addressId)
  },
  // 确认收货
  ConfirmOrders: function ConfirmOrders(params={}) {
    return vm.$http.get(vm.$CONSTANTS.APIWechat + '/member/ordermgr/confirmorders', {params})
  },
  // 取消订单
  CanleOrders: function CanleOrders(params={}) {
    return vm.$http.get(vm.$CONSTANTS.APIWechat + '/member/ordermgr/canleorders', {params})
  },
  // 发票列表
  GetInvoiceList: function GetInvoiceList(params) {
    return vm.$http.get(vm.$CONSTANTS.APIWechat + '/invoice/invoiceindex', {params})
  },
  // 新增发票信息
  Addinvoice: function Addinvoice(params) {
    return vm.$http({
      url: vm.$CONSTANTS.APIWechat + '/invoice/addinvoice',
      method: 'post',
      data: params,
      transformRequest: [TransFnc],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 修改发票信息
  UpdateInvoice: function UpdateInvoice(params) {
    return vm.$http({
      url: vm.$CONSTANTS.APIWechat + '/invoice/updateainvoice',
      method: 'post',
      data: params,
      transformRequest: [TransFnc],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 根据发票ID查询发票信息
  InvoiceDetail: function InvoiceDetail(invoiceId) {
    return vm.$http.get(vm.$CONSTANTS.APIWechat + '/invoice/toinvoicedetail/' + invoiceId)
  },
  // 删除发票信息
  Delinvoice: function Delinvoice(params) {
    return vm.$http({
      url: vm.$CONSTANTS.APIWechat + '/invoice/delinvoice',
      method: 'post',
      data: params,
      transformRequest: [TransFnc],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 我的收藏列表
  Bookmarklist: function Bookmarklist(params) {
    return vm.$http({
      url: vm.$CONSTANTS.APIWechat + '/member/bookmark/bookmarklist',
      method: 'post',
      data: params,
      transformRequest: [TransFnc],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 修改密码
  ModifyPassword: function ModifyPassword(params) {
    return vm.$http({
      url: vm.$CONSTANTS.APIWechat + '/member/userinfomgr/modifypasswd',
      method: 'post',
      data: params,
      transformRequest: [TransFnc],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 意见反馈
  FeedBack: function FeedBack(params) {
    return vm.$http({
      url: vm.$CONSTANTS.APIWechat + '/member/leavewordsmgr/addleavewords',
      method: 'post',
      data: params,
      transformRequest: [TransFnc],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
}

const CabApi = {
  // 获取柜机列表
  GetCabList: function GetCabList(params={}) {
    return vm.$http({
      url: vm.$getCsjUrl(params),
      method: 'post',
      data: params.data || {},
    })
  },
  GetCabProducts: function GetCabProducts(params={}) {
    return vm.$http({
      url: vm.$getCsjUrl(params),
      method: 'post',
      data: params.data || {},
    })
  },
  GetProducts: function GetProducts(params={}) {
    return vm.$http({
      url: vm.$CONSTANTS.APIWechat + '/member/cabinet/getProduct ',
      method: 'post',
      data: params,
    })
  },
}


export {HomeApi, CabApi}
