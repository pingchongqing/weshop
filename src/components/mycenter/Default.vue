<template>
  <div>
    <!-- 顶部开始 -->
    <div class="center-top">
      <div class="userinfo">
        <div class="avatar">
          <img src="~images/avatar.jpg" />
        </div>
        <div class="info">
          <div>用户名: {{userinfo.userName}}</div>
          <div class="score">积分: {{userinfo.integration}}</div>
        </div>
      </div>
      <router-link :to="{ name: 'setting' }">
        <div class="setting">
          <div>设置</div>
        </div>
      </router-link>
    </div>
    <!-- 我的订单 -->
    <div class="my-order bg-fff mt-20">
      <div class="tit px-30 f30 border-bottom" @click="nextPage(1)">
        <span class="color-000 ">我的订单</span>
        <span class="color-666 fr">查看更多订单 ></span>
      </div>
      <ul class="ordercont clearfix py-30">
        <li class="border-right" @click="nextPage(51)"><i class="getgoods"></i><div>取货码</div><div class="badge" v-show="orderNum.sjgGoodsCodeNum">{{orderNum.sjgGoodsCodeNum}}</div></li>
        <li @click="nextPage(2)"><i class="pay"></i><div>待付款</div><div class="badge" v-show="orderNum.pendingPayment">{{orderNum.pendingPayment}}</div></li>
        <li @click="nextPage(3)"><i class="l3"></i><div>待发货</div><div class="badge" v-show="orderNum.waitingDelivery">{{orderNum.waitingDelivery}}</div></li>
        <li @click="nextPage(5)"><i class="l4"></i><div>待评价</div><div class="badge" v-show="orderNum.waitingEvaluated">{{orderNum.waitingEvaluated}}</div></li>
        <li @click="nextPage(4)"><i class="l5"></i><div>待收货</div><div class="badge" v-show="orderNum.alreadyDelivery">{{orderNum.alreadyDelivery}}</div></li>
        <li @click="returnListPage"><i class="l6"></i><div>退换货</div><div class="badge" v-show="orderNum.returnNum">{{orderNum.returnNum}}</div></li>
      </ul>
    </div>
    <!-- 我的服务 -->
    <div class="my-service bg-fff mt-20">
      <div class="tit px-30 f30 border-bottom">
        <span class="color-000 ">我的服务</span>
      </div>
      <ul class="servicecont clearfix py-30">
        <router-link :to="{ name: 'points'}">
          <li><i class="l1"></i><div>积分</div></li>
        </router-link>
        <router-link :to="{ name: 'mycard'}">
          <li><i class="l2"></i><div>优惠券</div></li>
        </router-link>
        <router-link :to="{ name: 'mybookmark' }">
          <li><i class="l3"></i><div>我的收藏</div></li>
        </router-link>
      </ul>
    </div>
    <!-- 加盟合作 -->
    <div class="together mt-20 bg-fff">
      <div class="tit px-30 f30 border-bottom">
        <span class="color-000 ">加盟/合作</span>
      </div>
      <div class="ad bg-fff">
        <img src="~images/ad.jpg" />
      </div>
    </div>
    <!-- 帮助中心 -->
    <router-link :to="{ name: 'help'}">
      <div class="help px-30 f30 mt-20 bg-fff">
        <span class="color-000 ">帮助中心</span>
        <span class="fr"> > </span>
      </div>
    </router-link>
    <!-- 底部空间 -->
    <div class="pb-100"></div>

    <footerComponent :active="'my'"></footerComponent>

  </div>
</template>
<script>
import {HomeApi} from 'api'
import footerComponent from '../Footer'
export default {
  data() {
    return {
      userinfo: {},
      orderNum: {}
    }
  },
  components: {
    footerComponent
  },
  created() {
    this.getUserInfo()
    this.getOrderNum()
    document.title = '逛逛-个人中心'
  },
  methods: {
    getOrderNum() {
      HomeApi.GetOrderNum().then(
        res => {
          console.log(res);
          if (res.data.resultCode === -1 && res.data.info === '未登录') {
            this.$messagebox({
              title:'提示',
              message: '当前页面需要登录!',
              showCancelButton: true,
              cancelButtonText: '返回首页',
              confirmButtonText: '去登录',
              closeOnClickModal: false
            }).then(action => {
              if (action === 'confirm') {
                this.$router.push({
                  name: 'login',
                  query: {
                    returnUrl: this.$route.path
                  }
                })
              } else if (action === 'cancel') {
                this.$router.push({
                  name: 'Index',
                })
              }
            })

          } else if (parseInt(res.data.resultCode) === 1) {
            this.orderNum = res.data.orderNumViewVo
          }
        },
        err => {
          console.log(err);
        }
      )
    },
    getUserInfo() {
      HomeApi.GetUserInfo().then(
        res => {
          console.log(res);
          if (parseInt(res.data.resultCode) === 1) {
            this.userinfo = res.data.userInfoViewVo
            this.userinfo.filePath = res.data.filePath
          }
        },
        err => {
          console.log(err);
        }
      )
    },
    nextPage(n) {
      if (n===51) {
        this.$router.push({
          name: 'mycode'
        })
        return
      }
      this.$router.push({
        name: 'myorder',
        query: {
          type: n
        }
      })
    },
    returnListPage() {
      if (this.userinfo.custId) {
        this.$router.push({
          name: 'returnList',
          query: {
            buyerCustId: this.userinfo.custId
          }
        })
      } else {
        this.$toast('退换货列表加载失败')
      }
    }
  }
}
</script>
<style scoped lang="less">
.center-top {
  height: 3.2rem;
  width: 100%;
  background: linear-gradient(to bottom right, #fc4b8f , #fdac6b);
  position: relative;
  .userinfo {
    width: 80%;
    height: 1.8rem;
    position: absolute;
    top: .8rem;
    left: 10%;
    .avatar {
      width:1.8rem;
      height:1.8rem;
      background: url('~images/avatarbg.png') no-repeat;
      background-size: cover;
      float: left;
      img {
        width: 1.54rem;
        height: 1.54rem;
        margin: .13rem;
        border-radius: 50%;
      }
    }
    .info {
      float:left;
      margin-left: .2rem;
      color: #fff;
      font-size: .32rem;
      margin-top: .2rem;
      div {
        padding: .15rem 0;
      }
    }
  }
  .setting {
    width: 1rem;
    height: 1rem;
    position: absolute;
    background: url('~images/Icon/setting.png') top center no-repeat;
    background-size: .5rem;
    text-align: center;
    right: .3rem;
    top: .3rem;
    div {
      margin-top: .56rem;
      color: #fff;
    }
  }
}
.my-order, .my-service, .together {
  .tit {
    height: 1rem;
    span {
      line-height: 1rem;
    }
  }
  ul {
    padding: 0 2%;
    background:#fff;
    &.ordercont {
      li {
        height: auto;
        width: 16.666666666%;
        float: left;
        text-align: center;
        position: relative;
        i {
          width: .7rem;
          height: .7rem;
          background: url('~images/Icon/order.png') no-repeat;
          background-size: .7rem;
          display: inline-block;
        }
        .getgoods {
          background-position: 0 0;
        }
        .pay {
          background-position: 0 -.7rem;
        }
        .l3 {
          background-position: 0 -1.4rem;
        }
        .l4 {
          background-position: 0 -2.1rem;
        }
        .l5 {
          background-position: 0 -2.8rem;
        }
        .l6 {
          background-position: 0 -3.5rem;
        }
        .badge {
          width: .36rem;
          height: .36rem;
          border-radius: 50%;
          background: #fff;
          border:#ff2c55 1px solid;
          line-height: .32rem;
          text-align: center;
          color: #ff2c55;
          position: absolute;
          font-size: 10px;
          right: .1rem;
          top: 0;
        }
      }
    }
    &.servicecont {
      li {
        height: auto;
        width: 20%;
        float: left;
        text-align: center;
        i {
          width: .8rem;
          height: .8rem;
          background: url('~images/Icon/service.png') no-repeat;
          background-size: .8rem;
          display: inline-block;
        }
        .l1 {
          background-position: 0 0;
        }
        .l2 {
          background-position: 0 -.8rem;
        }
        .l3 {
          background-position: 0 -1.6rem;
        }
      }
    }
  }
  .ad {
    max-height: 3rem;
    width: 100%;
    img {
      width: 100%;
    }
  }
}
.help {
  height: 1rem;
  span {
    line-height: 1rem;
  }
}
</style>
