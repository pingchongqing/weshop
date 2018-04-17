const Main = resolve => {
    require.ensure([], () => {
        resolve(require('components/mycenter/Main.vue'));
    }, 'mycenter');
};

const Default = resolve => {
    require.ensure([], () => {
        resolve(require('components/mycenter/Default.vue'));
    }, 'mycenter');
};

const MyOrder = resolve => {
    require.ensure([], () => {
        resolve(require('components/mycenter/MyOrder.vue'));
    }, 'mycenter');
};
const Evaluate = resolve => {
    require.ensure([], () => {
        resolve(require('components/mycenter/Evaluate.vue'));
    }, 'mycenter');
};
// 查看物流
const Logist = resolve => {
    require.ensure([], () => {
        resolve(require('components/mycenter/Logist.vue'));
    }, 'mycenter');
};
// 我的优惠券
const MyCard = resolve => {
    require.ensure([], () => {
        resolve(require('components/mycenter/MyCard.vue'));
    }, 'mycenter');
};
// 我的收藏
const MyBookMark = resolve => {
    require.ensure([], () => {
        resolve(require('components/mycenter/MyBookmarkList.vue'));
    }, 'mycenter');
};
// 积分
const Points = resolve => {
    require.ensure([], () => {
        resolve(require('components/mycenter/Points.vue'));
    }, 'mycenter');
};
// 我的取货码
const MyCode = resolve => {
    require.ensure([], () => {
        resolve(require('components/mycenter/MyCode.vue'));
    }, 'mycenter');
};
// 设置
const Setting = resolve => {
    require.ensure([], () => {
        resolve(require('components/mycenter/Setting.vue'));
    }, 'mycenter');
};
// 修改密码
const ModifyPassword = resolve => {
    require.ensure([], () => {
        resolve(require('components/mycenter/ModifyPassword.vue'));
    }, 'mycenter');
};
// 关于我们
const AboutUs = resolve => {
    require.ensure([], () => {
        resolve(require('components/mycenter/AboutUs.vue'));
    }, 'mycenter');
};
// 信息反馈
const FeedBack = resolve => {
    require.ensure([], () => {
        resolve(require('components/mycenter/FeedBack.vue'));
    }, 'mycenter');
};
// 订单详情
const OrderDetail = resolve => {
    require.ensure([], () => {
        resolve(require('components/mycenter/OrderDetail.vue'));
    }, 'mycenter');
};

export default {
  path: '/mycenter',
  components: {
    default: Main,
  },
  children: [
    {
      name: 'mycenter',
      path: 'default',
      components: {
        default: Default
      }
    },
    {
      name: 'myorder',
      path: 'myorder',
      components: {
        default: MyOrder
      }
    },
    {
      name: 'evaluate',
      path: 'evaluate',
      components: {
        default: Evaluate
      }
    },
    {
      name: 'logist',
      path: 'logist',
      components: {
        default: Logist
      }
    },
    {
      name: 'mycard',
      path: 'mycard',
      components: {
        default: MyCard
      }
    },
    {
      name: 'mybookmark',
      path: 'mybookmark',
      components: {
        default: MyBookMark
      }
    },
    {
      name: 'mycode',
      path: 'mycode',
      components: {
        default: MyCode
      }
    },
    {
      name: 'setting',
      path: 'setting',
      components: {
        default: Setting
      }
    },
    {
      name: 'aboutus',
      path: 'setting/aboutus',
      components: {
        default: AboutUs
      }
    },
    {
      name: 'modifypassword',
      path: 'setting/modifypassword',
      components: {
        default: ModifyPassword
      }
    },
    {
      name: 'feedback',
      path: 'setting/feedback',
      components: {
        default: FeedBack
      }
    },
    {
      name: 'points',
      path: 'points',
      components: {
        default: Points
      }
    },
    {
      name: 'orderdetail',
      path: 'orderdetail/:orderId',
      components: {
        default: OrderDetail
      }
    },
  ]
}
