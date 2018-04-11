<template>
  <div id="wrapper">
    <div style="height:2rem;background:#fff;"></div>
    <div class="amount">￥{{paymentAmount}}</div>
    <div class="delivery px-30">运费：{{alldeliveryFee}}</div>
    <p class="orderid px-30">订单号：{{orderId}}</p>
    <div class="paybutton" @click="pay">立即支付</div>
  </div>
</template>
<script>
import md5 from 'js-md5'
import {HomeApi} from 'api'
export default {
  data() {
    return {
      orderId: this.$route.query.orderId,
      paymentAmount: this.$route.query.paymentAmount,
      alldeliveryFee: this.$route.query.alldeliveryFee,
      isLoding: false,
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
  mounted() {
    this.getWxConfig()
  },
  methods: {
    pay() {
      this.isLoding = true
      HomeApi.WeixinPay({orderId:this.orderId}).then(
        res => {
          console.log(res);
          if (res.data.code === 'success') {
            this.isLoding = false
            let ua = window.navigator.userAgent.toLowerCase();
            let data = res.data.data
            let self = this
            let str = `appId=${data.appid}&nonceStr=${data.nonce_str}&package=prepay_id=${data.prepay_id}&signType=MD5&timeStamp=${data.timeStamp}&key=162c846316c798b16768f62e819e4d35`
            let sign = md5(str).toUpperCase()
            function onBridgeReady(){
              WeixinJSBridge.invoke(
                  'getBrandWCPayRequest', {
                      "appId":data.appid,     //公众号名称，由商户传入
                      "timeStamp": data.timeStamp,         //时间戳，自1970年以来的秒数
                      "nonceStr":data.nonce_str, //随机串
                      "package":"prepay_id="+data.prepay_id,
                      "signType":'MD5',         //微信签名方式：
                      "paySign": sign //微信签名
                  },
                  function(resa){
                      if(resa.err_msg == "get_brand_wcpay_request:ok" ) {
                        self.paysuccess({out_trade_no: data.out_trade_no, orderId:self.orderId})
                      }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                  }
              );
           }
           // 如果是微信内部浏览器开启公众号支付, 如果不是则使用H5支付
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
              if (typeof WeixinJSBridge == "undefined"){
                  if( document.addEventListener ){
                      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                  }else if (document.attachEvent){
                      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                  }
               }else{
                  onBridgeReady()
               }
            } else {
              location.href = res.data.data.mweb_url
            }
            // wx.ready(() => {
            //   wx.chooseWXPay({
            //       timeStamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            //       nonceStr: data.nonce_str, // 支付签名随机串，不长于 32 位
            //       package: 'prepay_id='+data.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            //       signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            //       paySign: sign, // 支付签名
            //       success: function (resa) {
            //           // 支付成功后的回调函数
            //           console.log(resa);
            //       }
            //   });
            // });
          } else {
            this.isLoding = false
            this.$messagebox({
              title: '提示',
              message: res.data.message
            })
          }
        },
        err => {
          this.isLoding = false
          console.log(err);
        }
      )
    },
    async getWxConfig() {
      await HomeApi.WxConfig({url: encodeURIComponent(location.href)}).then(
        res => {
          console.log(res);
          if (res.data.code === 'success') {
            let data = res.data.data
            wx.config({
              debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
              appId: data.appId, // 必填，公众号的唯一标识
              nonceStr: data.nonce_str, // 必填，生成签名的随机串
              timestamp: data.timestamp, // 必填，生成签名的时间戳
              signature: data.signature,// 必填，签名，见附录1
              jsApiList: [
                "chooseWXPay",
                "onMenuShareAppMessage"
              ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
          }
        },
        err => {
          console.log(err);
        }
      )
    },
    paysuccess(params) {
      HomeApi.OrderPaySuccess(params).then(
        res => {
          console.log(res);
          if (res.data.code === 'success') {
            this.$router.push({
              name: 'mycenter'
            })
          }
        }
      )
    }
  }
}
</script>
<style scoped lang="less">
  .amount {
    font-size: .6rem;
    font-weight: 600;
    text-align: center;
    padding: 1rem;
    background: url('~images/play-ico-hover.png') center top #fff no-repeat;
  }
  .delivery, .orderid {
    height:.8rem;
    background:#fff;
    text-align: center;
  }
  .paybutton {
    height: 1rem;
    border-radius: .2rem;
    background: #14ae3c;
    color: #fff;
    font-size: .32rem;
    line-height: 1rem;
    text-align: center;
    margin: 2% 2%;
    width: 96%;
  }
</style>
