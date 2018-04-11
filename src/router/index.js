import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Search from '@/components/Search'
import GoodsList from '@/components/GoodsList'
import GoodsDetail from '@/components/GoodsDetail'
import Login from '@/components/Login'
import MycenterRouter from './MycenterRouter'
import nearRouter from './nearRouter'
import Register from 'components/Register'
import helpRouter from './helpRouter'

// 购物车
const CartList = resolve => {
    require.ensure([], () => {
        resolve(require('components/CartList.vue'));
    }, 'cartlist');
};
// 下单
const Order = resolve => {
    require.ensure([], () => {
        resolve(require('components/Order.vue'));
    }, 'order');
};
// 支付
const Pay = resolve => {
    require.ensure([], () => {
        resolve(require('components/Pay.vue'));
    }, 'pay');
};
// 编辑收货地址
const ModifyAddress = resolve => {
    require.ensure([], () => {
        resolve(require('components/order/ModifyAddress.vue'));
    }, 'order');
};
// 收货地址列表
const AddressList = resolve => {
    require.ensure([], () => {
        resolve(require('components/order/AddressList.vue'));
    }, 'order');
};
// 发票列表
const InvoiceList = resolve => {
    require.ensure([], () => {
        resolve(require('components/order/InvoiceList.vue'));
    }, 'order');
};
// 编辑发票
const ModifyInvoice = resolve => {
    require.ensure([], () => {
        resolve(require('components/order/ModifyInvoice.vue'));
    }, 'order');
};

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/goodsList',
      name: 'goodsList',
      component: GoodsList
    },
    {
      path: '/goodsDetail/:classId/:productId',
      name: 'goodsDetail',
      component: GoodsDetail
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/cartlist',
      name: 'cartList',
      component: CartList
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/pay',
      name: 'pay',
      component: Pay
    },
    {
      path: '/modifyAddress',
      name: 'modifyAddress',
      component: ModifyAddress
    },
    {
      path: '/addressList',
      name: 'addressList',
      component: AddressList
    },
    {
      path: '/invoiceList',
      name: 'invoiceList',
      component: InvoiceList
    },
    {
      path: '/modifyInvoice',
      name: 'modifyInvoice',
      component: ModifyInvoice
    },

    MycenterRouter,
    nearRouter,
    helpRouter
  ]
})
