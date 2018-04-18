<template>
<div>
  <li v-for="item in listData">
    <div class="sellerName">{{item.saleCustName}}<span class="fr default-color mr-20">{{item.statusName}}</span></div>
    <div class="prolist clearfix" v-for="pro in item.appProductList" @click="goOrder(item)">
      <div class="imgbox">
        <img :src="pro.filePath" v-if="pro.filePath" />
        <img src="~images/defaultbox.png" v-else />
      </div>
      <div class="proname">{{pro.productName}}</div>
      <div class="proprice"><span class="price f30">￥{{pro.productPrice}}</span><span class="num fr">{{pro.productNum}}</span></div>
    </div>
    <div class="total clearfix">合计:￥{{item.paymentAmount}}</div>
    <div class="tool clearfix" v-if="item.orderStatus == 3">
      <button class="confirm fr ml-10" @click="pay(item)">立即付款</button>
      <button class="cancel fr" @click="cancelOrder(item)">取消</button>
    </div>
    <div class="tool clearfix" v-else-if="item.orderStatus == 7">
      <button class="confirm fr ml-10" @click="evaluate(item)">立即评价</button>
      <button class="cancel fr" @click="viewlogist(item)">查看物流</button>
    </div>
    <div class="tool clearfix" v-else-if="item.orderStatus == 4">
      <button class="confirm fr ml-10" @click="confirm(item)">确认收货</button>
      <button class="cancel fr" @click="viewlogist(item)">查看物流</button>
    </div>
    <div class="tool clearfix" v-else-if="item.orderStatus == 51">
      <button class="confirm fr ml-10" @click="getgoods(item)">取货</button>
      <button class="cancel fr" @click="cancelOrder(item)">取消</button>
    </div>
  </li>
  <mt-popup
    v-model="popupVisible"
    modal="true"
    popup-transition="popup-fade">
    <div class="codemodal">
      <h3>取货码</h3>
      <qrcode :size="qrcodeOption.size" :level="qrcodeOption.level"
        :text="qrcodeOption.text"></qrcode>
    </div>
  </mt-popup>
</div>
</template>
<script>
import {HomeApi} from 'api'
import { Popup } from 'mint-ui';
import qrcode from 'components/common/Qrcode'
export default {
  data() {
    return {
      popupVisible: false,
      qrcodeOption: {
        size: 300,
        level: 'H',
        text: ''
      }
    }
  },
  components: {
    'mt-popup':Popup,
    qrcode
  },
  props: ['listData'],
  methods: {
    pay(item) {
      this.$router.push({
        name: 'pay',
        query: {
          orderId: item.orderId,
          paymentAmount: item.paymentAmount,
          alldeliveryFee: item.deliveryFee
        }
      })
    },
    evaluate(item) {
      this.$router.push({
        name: 'evaluate',
        query: {
          orderId: item.orderId
        }
      })
    },
    confirm(item) {
      this.$messagebox({
        title: '提示',
        message: '确定要确认收货吗？',
        showCancelButton: true
      }).then( action => {
        if (action === 'confirm') {
          HomeApi.ConfirmOrders({orderId: item.orderId, status: item.orderStatus}).then(
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
    viewlogist(item) {
      if (item.logisticsNu && item.logisticsCom) {
        this.$router.push({
          name: 'logist',
          query: {
            logisticsNu: item.logisticsNu,
            logisticsCom: item.logisticsCom
          }
        })
      } else {
        this.$toast('暂时无法查看物流信息')
      }
    },
    // 取消订单
    cancelOrder(order) {
      this.$messagebox({
        title: '提示',
        message: '确定要取消订单吗？',
        showCancelButton: true
      }).then( action => {
        if (action === 'confirm') {
          if (order.orderStatus == 51 ) {
            HomeApi.PayRefund({orderId: order.orderId}).then(
              res => {
                console.log(res);
                if (res.data.code === 'success') {
                  this.$router.go(0)
                } else {
                  this.$toast(res.data.message)
                }
              }
            )
          } else {
            HomeApi.CanleOrders({orderId: order.orderId}).then(
              res => {
                console.log(res);
                if (res.data.resultCode === 1) {
                  this.$router.go(0)
                }
              }
            )
          }
        }
      })
    },
    // 取货
    getgoods(order) {
      this.popupVisible = !this.popupVisible
      this.qrcodeOption.text = order.ladingCode
    },
    //
    goOrder(item) {
      this.$router.push({
        name: 'orderdetail',
        params: {
          orderId: item.orderId
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.codemodal {
  width: 95vw;
  min-height: 2.5rem;
  padding: .3rem;
  text-align: center;
  h3 {
    height: .6rem;
    line-height: .6rem;
    font-size: .3rem;
    font-weight: bold;
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
.listcontainer {
  li {
    margin-top: .2rem;
    background: #fff;
    .sellerName {
      height: .9rem;
      line-height: .9rem;
      background: url('~images/Icon/shop.png') left center no-repeat;
      background-size: .5rem;
      margin-left: .2rem;
      text-indent: .5rem;
    }
    .prolist {
      background: #f5f5f5;
      padding: .3rem;
      .imgbox {
        width: 1.5rem;
        height: 1.5rem;
        overflow: hidden;
        float: left;
        margin-right:.2rem;
        img {
          height: 100%;
        }
      }
      .proname, .proprice {
        padding: .1rem 0;
      }
    }
  }
}
</style>
