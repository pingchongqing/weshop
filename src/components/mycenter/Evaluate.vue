<template>
  <div>
    <div class="product-evaluate" v-for="(item, index) in productList">
      <div class="imgbox">
        <img :src="item.filePath" v-if="item.filePath" />
        <img src="~images/defaultbox.png" v-else />
      </div>
      <div class="crib clearfix">
        <span class="fl pt-20 mr-20 ml-20">描述相符</span>
        <scroe @onScroe="evaluateScroe" :index="index"></scroe>
      </div>
      <div class="evalute-text">
        <textInput
          v-model="desc[index]"
          :iclass="'chorder mt-20'"
          :max="200"
          placeholder="宝贝满足你的期望吗？说说你的使用心得，分享给想买的他们吧"
        >
        </textInput>
      </div>
    </div>
    <div class="shop-evaluate">
      <div class="sellerName border-bottom">店铺评分</div>
      <div class="p-10 clearfix">
        <span class="fl pt-20 mr-20 ml-20">物流服务</span>
        <scroe @onScroe="wlScroe" ></scroe>
      </div>
      <div class="p-10 clearfix">
        <span class="fl pt-20 mr-20 ml-20">发货服务</span>
        <scroe @onScroe="fhScroe" ></scroe>
      </div>
      <div class="p-10 clearfix">
        <span class="fl pt-20 mr-20 ml-20">卖家服务</span>
        <scroe @onScroe="mjScroe" ></scroe>
      </div>
    </div>
    <button @click="evaluate" class="defaultconfirm">提交评价</button>
  </div>
</template>
<script>
import scroe from 'components/common/scroe'
import textInput from 'components/common/formComponent/textareaComponent'
import {HomeApi} from 'api'
export default {
  data() {
    return {
      orderId: this.$route.query.orderId,
      orderData: {},
      matchDescriptionValue: '',
      desc:[],
      wlaScroe: '',
      fhaScroe: '',
      mjaScroe: '',
      descScroe: []
    }
  },
  components: {
    scroe,
    textInput
  },
  computed: {
    addressData() {
      return this.orderData.appAddressParam
    },
    productList: {
      get() {
        return this.orderData.appProductList
      }
    },
    productIds() {
      let ids =''
      if (this.orderData.appProductList) {
        this.orderData.appProductList.map(item => {
          ids += item.productId
        })
      }
      return ids
    },
    buyerDescValue() {
      let val = ''
      this.desc.map(d => {
        if (val) {
          val += '@#-&amp;@' + d
        } else {
          val = d
        }
      })
      return val
    },
    descScroeValue() {
      let val = ''
      this.descScroe.map(d => {
        if (val) {
          val += '@' + d
        } else {
          val = d
        }
      })
      return val
    }
  },
  created() {
    this.getOrderData()
    document.title = '逛逛-商品评价'
  },
  methods: {
    evaluateScroe(val, index) {
      this.descScroe[index] = val
    },
    wlScroe(n) {
      this.wlaScroe = n
    },
    fhScroe(n) {
      this.fhaScroe = n
    },
    mjScroe(n) {
      this.mjaScroe = n
    },
    getOrderData() {
      HomeApi.OrderDetail({orderId: this.orderId}).then(
        res => {
          console.log(res);
          if (res.data.resultCode === 1) {
            this.orderData = res.data
          }
        }
      )
    },
    evaluate() {
      if (!this.descScroe || this.wlaScroe || this.fhaScroe || this.mjaScroe) {
        this.$toast('还有内容没评分哦！')
        return
      }
      let params = {
        "matchDescription":this.descScroe,
    		"logisticsService":this.wlaScroe,
    		"deliveryService":this.fhaScroe,
    		"sellerService":this.mjaScroe,
    		"orderId":this.orderId,
    		"buyerDesc":this.buyerDescValue,
    		"productId":this.productIds,
      }
      HomeApi.AddproductEvaluate(params).then(
        res => {
          console.log(res);
          if (res.data.resultCode === 1) {
            this.$router.back()
          }
        }
      )
    }
  }
}
</script>
<style lang="less" scoped>
.product-evaluate {
  padding: .3rem;
  background: #fff;
  .crib {
    padding-top: .14rem;
  }
  .imgbox {
    width: 1rem;
    height: 1rem;
    float: left;
    img {
      width: 100%;
    }
  }
  .evalute-text {
    margin-top: .2rem;
  }
}
.shop-evaluate {
  background: #fff;
  padding-bottom: .3rem;
}
.sellerName {
  height: .9rem;
  line-height: .9rem;
  background: url('~images/Icon/shop.png') left center no-repeat;
  background-size: .5rem;
  margin-left: .2rem;
  text-indent: .5rem;
}
</style>
