<template lang="html">
<div id="wrapper">
  <div class="orderinfo">
    <h3 class="border-bottom">配送地址</h3>
  </div>
  <!-- 收货地址 -->
  <div class="addr px-30" >
    <div class="addrpeople f30">
      <span>收货人：{{appAddressParam.consignee}}</span>
      <span class="pl-30">{{appAddressParam.phone}}</span>
      <span class="fr color-999" v-show="parseInt(appAddressParam.isDefault) === 0">默认</span>
    </div>
    <div class="recive">收货地址：{{appAddressParam.areaName|areaNameFilter}} {{appAddressParam.streetAddress}}</div>
  </div>
  <!-- 商品信息 -->
  <div class="orderinfo mt-20">
    <h3 class="border-bottom">商品信息</h3>
    <ul>
      <li v-for="item in appProductList" class="clearfix">
        <div class="imgbox"><img :src="item.filePath" v-if="item.filePath" /><img v-else src="~images/defaultbox.png" /></div>
        <p>{{item.productName}}</p>
        <p class="price"><span class="money">￥{{item.productPrice}}</span><span class="num fr">{{item.productNum}}</span></p>
      </li>
    </ul>
  </div>
  <!-- 发票信息 -->
  <div class="invoice mt-20 bg-fff px-30">
    <div >
      <span class="invoice-info" v-if="orderData.invoiceTitle">{{orderData.invoiceTitle}}</span>
      <span class="invoice-info" v-else>无需发票</span>
      <h3>发票信息</h3>
    </div>
  </div>
  <!-- 费用信息 -->
  <div class="payinfo mt-20">
    <h3 class="border-bottom">费用信息</h3>
    <div class="py-30"><span>商品金额</span><span class="fr">￥{{orderData.paymentAmount}}</span></div>
    <div class="py-30"><span>物流费用</span><span class="fr">￥{{orderData.deliveryFee}}</span></div>
    <div class="py-30"><span>优惠券</span><span class="fr">暂无优惠券</span></div>
    <div class="py-30"><span class="fr f32">实付款：<span style="color:#ff2c55">￥{{totalamount}}</span></span></div>
  </div>
  <div class="tool clearfix" v-if="orderData.orderStatus == 3">
    <button class="confirm fr ml-10" @click="pay">立即付款</button>
    <button class="cancel fr" @click="cancelOrder">取消</button>
  </div>
  <div class="tool clearfix" v-else-if="orderData.orderStatus == 7">
    <button class="confirm fr ml-10" @click="evaluate">立即评价</button>
    <button class="cancel fr" @click="viewlogist">查看物流</button>
  </div>
  <div class="tool clearfix" v-else-if="orderData.orderStatus == 4">
    <button class="confirm fr ml-10" @click="confirm">确认收货</button>
    <button class="cancel fr" @click="viewlogist">查看物流</button>
  </div>
  <div class="tool clearfix" v-else-if="orderData.orderStatus == 51">
    <button class="confirm fr ml-10" @click="getgoods">取货</button>
    <button class="cancel fr" @click="cancelOrder">取消</button>
  </div>
</div>
</template>

<script>
import {HomeApi} from 'api'
export default {
  data() {
    return {
      orderId: this.$route.params.orderId,
      orderData: {},
      isLoding: false
    }
  },
  computed: {
    appAddressParam() {
      return this.orderData.appAddressParam || {}
    },
    appProductList() {
      return this.orderData.appProductList || {}
    },
    totalamount() {
      return parseInt(this.orderData.paymentAmount*100)/100 - parseInt(this.orderData.deliveryFee*100)/100
    },
  },
  filters: {
    areaNameFilter(str) {
      if (str)
        return str.split('->').join(' ').replace(/中国/g, '')
      return ''
    }
  },
  watch: {
    isLoding (val) {
      let inTimer
      if (val) {
        clearTimeout(inTimer)
        this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
      } else {
        inTimer = setTimeout(this.$indicator.close, 500)
      }
    },
  },
  destroyed() {
    this.$indicator.close()
  },
  created() {
    this.getOrderData()
  },
  methods: {
    getOrderData() {
      this.isLoding = true
      HomeApi.OrderDetail({orderId: this.orderId}).then(
        res => {
          console.log(res);
          this.isLoding = false
          if (res.data.resultCode === 1) {
            this.orderData = res.data
          }
        },
        err => {
          this.isLoding = false
          console.log(err);
          this.$messagebox({
            message: '服务器或数据异常'
          }).then(action => {
            this.$router.back()
          })
        }
      )
    },
    pay() {
      this.$router.push({
        name: 'pay',
        query: {
          orderId: this.orderId,
          paymentAmount: this.orderData.paymentAmount,
          alldeliveryFee: this.orderData.deliveryFee
        }
      })
    },
    evaluate() {
      this.$router.push({
        name: 'evaluate',
        query: {
          orderId: this.orderId,
        }
      })
    },
    confirm() {
      this.$messagebox({
        title: '提示',
        message: '确定要确认收货吗？',
        showCancelButton: true
      }).then( action => {
        if (action === 'confirm') {
          HomeApi.ConfirmOrders({orderId: this.orderId, status: this.orderData.orderStatus}).then(
            res => {
              console.log(res);
              if (res.data.resultCode === 1) {
                this.$router.go(0)
              }
            }
          )
        }
      })
    },
    // 查看物流
    viewlogist() {
      if (this.orderData.logisticsNu && this.orderData.logisticsCom) {
        this.$router.push({
          name: 'logist',
          query: {
            logisticsNu: this.orderData.logisticsNu,
            logisticsCom: this.orderData.logisticsCom
          }
        })
      } else {
        this.$toast('暂时无法查看物流信息')
      }
    },
    // 取消订单
    cancelOrder() {
      this.$messagebox({
        title: '提示',
        message: '确定要取消订单吗？',
        showCancelButton: true
      }).then( action => {
        if (action === 'confirm') {
          HomeApi.CanleOrders({orderId: this.orderId}).then(
            res => {
              console.log(res);
              if (res.data.resultCode === 1) {
                this.$router.go(0)
              }
            }
          )
        }
      })
    },
  }
}
</script>

<style scoped lang="less">
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
    background: #fff;
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
  .addr {
    background: #fff;
    padding-bottom: .3rem;
    background-size: .2rem;
    .addrpeople {
      line-height: .8rem;
      padding: 0 .4rem;
    }
    .recive {
      padding: 0 .4rem;
      line-height: 150%;
      background: url('~images/Icon/address.png') left center no-repeat;
      background-size: .4rem;
    }
    .newaddr {
      padding-top: .26rem;
    }
  }
  .tool {
    padding: .2rem .3rem;
    border-top: #f5f5f5 1px solid;
  }
  .cancel, .confirm {
    padding: .1rem .2rem;
    border-radius: .1rem;
  }
  .cancel {
    border: #999 1px solid;
    color: #999;
  }
  .confirm {
    border: #ff2c55 1px solid;
    color: #ff2c55;
  }
  .total {
    text-align: right;
    padding: .2rem .2rem;
  }
  .price {
    color:#ff2c55;
  }
  .num::before {
    content: '×';
  }
</style>
