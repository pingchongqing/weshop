<template>
<div id="wrapper">
  <div class="order-top" v-if="iscab==1">
    <div :class="{active: stock === 0}" @click="showStock(0)">物流配送</div>
    <div :class="{active: stock === 1}" @click="showStock(1)">柜机自取</div>
  </div>
  <div class="orderinfo" v-else>
    <h3 class="border-bottom">物流配送</h3>
  </div>
  <!-- 收货地址 -->
  <addr :addressData="appAddressParam" v-show="stock === 0"></addr>
  <!-- 最近柜机地址 -->
  <cabaddress v-show="stock === 1" :cabdata="cabAddress"></cabaddress>
  <!-- 商品信息 -->
  <div class="orderinfo mt-20">
    <h3 class="border-bottom">商品信息</h3>
    <ul>
      <li v-for="item in cartListSon" class="clearfix">
        <div class="imgbox"><img :src="item.filePath" v-if="item.filePath" /><img v-else src="~images/defaultbox.png" /></div>
        <p>{{item.productName}}</p>
        <p class="price"><span class="money">￥{{item.stockPrice}}</span><span class="num fr">{{item.stockNum}}</span></p>
      </li>
    </ul>
  </div>
  <!-- 发票信息 -->
  <div class="invoice mt-20 bg-fff px-30">
    <div @click="goinvoiceList">
      <span class="invoice-info" v-if="checkedInvoice.titleType">{{checkedInvoice.titleType|titleTypeFilter}}-{{checkedInvoice.invoiceTitle}}</span>
      <span class="invoice-info" v-else>无需发票</span>
      <h3>发票信息</h3>
    </div>
  </div>
  <!-- 费用信息 -->
  <div class="payinfo mt-20">
    <h3 class="border-bottom">费用信息</h3>
    <div class="py-30"><span>商品金额</span><span class="fr">￥{{orderDetail.totalPrice}}</span></div>
    <div class="py-30"><span>物流费用</span><span class="fr">￥{{orderDetail.totalDeliveryFee}}</span></div>
    <div class="py-30"><span>优惠券</span><span class="fr">暂无优惠券</span></div>
    <div class="py-30"><span class="fr f32">实付款：<span style="color:#ff2c55">￥{{totalamount}}</span></span></div>
  </div>
  <div style="height:1rem"></div>
  <!-- 支付按钮 -->
  <div class="paybutton" @click="confirmOrder">微信支付</div>
</div>
</template>
<script>
import { HomeApi, CabApi } from 'api/index'
import { mapState } from 'vuex'
import addr from 'components/order/Address'
import cabaddress from 'components/order/CabAddress'
export default {
  data() {
    return {
      orderDetail: {},
      iscab: this.$route.query.iscab,
      stock: 0,
      cabAddress: []
    }
  },
  components: {
    addr,
    cabaddress
  },
  filters: {
    titleTypeFilter(val) {
      switch (parseInt(val)) {
        case 1:
          return '增值税专用发票'
          break;
        case 2:
          return '普通发票'
          break;
        case 3:
          return '增值税普通发票'
          break;
        default:

      }
    }
  },
  computed: {
    cartListSon() {
      return this.orderDetail.cartListSon
    },
    totalamount() {
      return Math.ceil(this.orderDetail.totalPrice*1000)/1000 - parseInt(this.orderDetail.totalDeliveryFee*100)/100 || '0'
    },
    ...mapState({
      appAddressParam: state => state.checkAddress,
      checkedInvoice: state => state.checkedInvoice
    })
  },
  created() {
    this.getOrderDetail()
    document.title = '逛逛-下单'
    if (this.iscab == 1) {
      this.getCabAddress()
    }
  },
  methods: {
    getCabAddress() {
      CabApi.FindRelatedSjg({productId: this.$route.query.productId}).then(
        res => {
          console.log(res);
          let data = JSON.parse(res.data)
          if (data.code == 200 && data.msg == 'OK') {
            this.cabAddress = data.data
          }
        }
      )
    },
    showStock(n) {
      this.stock = n
    },
    goinvoiceList() {
      this.$router.push({
        name: 'invoiceList'
      })
    },
    getOrderDetail() {
      let params = {
        stockType: this.$route.query.stockType,
        cartParam: this.$route.query.cartParam
      }
      HomeApi.GetOrderDetail(params).then(
        res => {
          console.log(res);
          if (res.data.resultCode === 1) {
            this.orderDetail = res.data
            if (!this.appAddressParam.addressId) {
              this.$store.commit('setCheckAddress', this.orderDetail.appAddressParam)
            }
            if (Object.keys(this.checkedInvoice).length === 0) {
              this.$store.commit('setcheckInvoice', this.orderDetail.appInvoiceParam)
            }
          } else if (res.data.resultCode === 0 && res.data.info === '未登陆') {
            this.$router.push({
              name: 'login',
              query: {
                returnUrl: location.href
              }
            })
          } else {
            this.$toast(res.data.info)
          }
        },
        err => {
          console.log(err);
        }
      )
    },
    // 创建订单，支付
    //carType==1时是柜机自取订单
    confirmOrder() {
      let params = {
        invoice: this.checkedInvoice.id || 0,
        cartParam: this.orderDetail.idAndNum,
        stockType: 1,
        addressId: this.appAddressParam.addressId,
        saleCustId: this.cartListSon[0].saleCustId,
        carType: this.stock
      }
      HomeApi.OrderSubmit(params).then(
        res => {
          console.log(res);
          if (res.data.resultCode === 1) {
            this.$router.push({
              name: 'pay',
              query: {
                orderId: res.data.orderId,
                paymentAmount: res.data.paymentAmount,
                alldeliveryFee: res.data.alldeliveryFee
              }
            })
          } else {
            this.$messagebox({message:res.data.info})
          }
        },
        err => {
          console.log(err);
        }
      )
    }
  }
}
</script>
<style scoped lang="less">
  .paybutton {
    height: 1rem;
    border-radius: .2rem;
    background: #ff2c55;
    color: #fff;
    font-size: .32rem;
    line-height: 1rem;
    text-align: center;
    position: fixed;
    margin: 2% 2%;
    width: 96%;
    bottom: 0;
  }
  .order-top {
    height: 1rem;
    border-bottom: #ededed 1px solid;
    background:#fff;
    div {
      line-height: 1rem;
      height: 1rem;
      font-size: .32rem;
      text-align: center;
      transition: border .3s;
      width: 50%;
      float: left;
      &.active {
        color: #ff2c55;
        border-bottom: #ff2c55 2px solid;
        height: 1rem;
        box-sizing: border-box;
      }
    }
  }
  .orderinfo, .invoice, .payinfo {
    h3 {
      font-size: .32rem;
      height:.8rem;
      line-height:.8rem;
      color: #000;
    }
  }
  .invoice-info {
    float: right;
    color: #999;
    font-size: .28rem;
    line-height:.8rem;
    padding-right:.3rem;
  }
  .invoice {
    background: url('~images/right.png') 98% center no-repeat #fff;
    background-size: .2rem;
  }
  .orderinfo {
    background: #fff;
    padding: 0 .3rem .3rem;
    ul {
      li {
        margin-top:.2rem;
        .imgbox {
          width: 1.3rem;
          height: 1.3rem;
          overflow: hidden;
          float: left;
          margin-right: .3rem;
          img {
            width: 100%;
          }
        }
        .price {
          margin-top: .3rem;
          font-size: .3rem;
          .money {
            color:#ff486c;
          }
          .num::before {
            content: '×';
          }
        }
      }
    }
  }
  .payinfo {
    background: #fff;
    padding: .3rem;
  }
</style>
