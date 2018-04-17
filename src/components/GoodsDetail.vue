<template>
  <div id="wrapper" :style="{minHeight: screenHight + 'px'}">
    <div class="detail-top" id="link1">
      <ul>
        <li :class="{active: quickLink === 1}" @click="golink(1)">商品</li>
        <li :class="{active: quickLink === 2}" @click="golink(2)">评价</li>
        <li :class="{active: quickLink === 3}" @click="golink(3)">详情</li>
        <li :class="{active: quickLink === 4}" @click="golink(4)">推荐</li>
      </ul>
    </div>
    <div style="height:.8rem"></div>
    <!-- 商品图片开始 -->
    <div class="swiper-container border-bottom piccont bg-000" @click="show(0)">
      <div class="swiper-wrapper text-center middle" :style="{width:midwidth}">
        <img  :src="firstImage" class="previewer-demo-img" />
      </div>
      <div class="swiper-tip text-center color-fff f28" v-show="imageList.length>0">
        <span v-show="imageList.length>0">点击查看（共{{imageList.length}}张图片）</span>
      </div>
    </div>
    <!-- 商品图片结束-->
    <div class="detail-box">
      <h3>
        {{detailData.productName}}
      </h3>
      <p><span class="price f32">￥{{detailData.productPrice}}</span><span class="fr"><a href="" class="viewlink">点击查看商品全景</a></span></p>
      <p><span>快递：{{detailData.freightType|freightType}}</span><span class="fr">销量：{{detailData.saleNum}}</span></p>
    </div>
    <div class="num-box mt-20 bg-fff">
      <NumberInput
        :min=1
        :max="parseInt(detailData.productNum)"
        :fillable=true
        v-model="eqNum"
        :align="'left'"
        :title="'购买数量'"
      >
      </NumberInput>
      <div class="num">
        库存：{{detailData.productNum}}{{detailData.productUnit}}
      </div>
    </div>


    <div class="evaluate mt-20 bg-fff p-30" id="link2">
      <P>
        <h3 class="f30 fl">评价</h3>
        <span class="fr">共{{evaluate.length}}条评价</span>
        <div class="clearfix"></div>
      </p>
      <div class="mt-20" v-for="eva in evaluate">
        <div class="color-m1">{{eva.buyerCustName}}</div>
        <div class="">{{eva.buyerDesc}}</div>
      </div>
      <div class="text-center mt-20" v-show="!evaluate.length">暂无评价</div>
      <!-- <div class="color-m1 text-center mt-20">查看更多评价</div> -->
    </div>
    <!-- 店铺信息 -->
    <div class="shopinfo">
      <div class="clearfix">
        <div class="shopicon" v-show="detailData.icon"><img :src="detailData.icon" /></div>
        <div class="shopname">{{detailData.saleCustName}}</div>
      </div>
      <div class="clearfix mt-20">
        <div class="shopbox border-right">
          <p>{{detailData.fensiCount}}</p>
          <p>粉丝人数</p>
        </div>
        <div class="shopbox">
          <p>{{detailData.productCount}}</p>
          <p>店铺商品</p>
        </div>
      </div>
    </div>
    <!-- 精品推荐开始 -->
    <div id="link4">
      <commend :classId="classId"></commend>
    </div>
    <!-- 精品推荐结束 -->

    <div class="mbgame-iftion border-bottom mt-20" id="link3">
      <div class="iftdemo fl ">
        <a class="text-center bg-f8 f32 " :class="{active: barShow}" @click="barShow = true">图文详情</a>
      </div>
      <div class="iftdemo fl ">
        <a class="text-center bg-f8 f32 " :class="{active: !barShow}" @click="barShow = false">扩展属性</a>
      </div>
    </div>
    <div class="describe p-30 bg-fff" style="min-height: 2rem;" v-show="barShow">
      <div v-html="detailData.productDesc"></div>
    </div>
    <div class="describe py-30 bg-fff" v-show="!barShow">
      <div class="rechseach-titl fw px-30 text-center" v-if="!attrList.length"><span>无扩展属性</span></div>
      <div class="rechseach-titl fw px-30 border-bottom" v-else v-for="attr in attrList">
        <div class="sto_rent f30 fl">{{attr.attrName}}</div>
        <div class="sto_rerg f30 fr text-left sto-height">
        {{attr.attrValue}}
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="pb-200"></div>

    <div class="buybox">
      <div class="bookmark" :class="{ed: isBookMark}" @click="addBookMark"><span>{{isBookMark ? '已' : ''}}收藏</span></div>
      <button class="car button" :class="{dis: detailData.productNum == 0 || !detailData.productId}" @click="addToCart">加入购物车</button>
      <button class="buy button" :class="{dis: detailData.productNum == 0 || !detailData.productId}" @click="buy">立即购买</button>
    </div>
    <!-- 购物车 -->
    <cart :addnum="cartnum" ref="cart"></cart>
    <previewer :list="imageList" ref="previewer" ></previewer>
  </div>
</template>
<script type="text/javascript">
  import previewer  from './common/Previwer.vue' // 查看图片
  import cart  from './common/Cart.vue' // 购物车
  import { HomeApi } from '../api/index'
  import NumberInput from 'components/common/formComponent/numberComponent'
  import commend from 'components/common/Commend'
  export default {
    data() {
      return {
        host: this.$CONSTANTS.HOST,
        detailData: {},
        midwidth: window.innerWidth + 'px',
        eqNum: 1,
        barShow: true,
        nofind: 'this.src="' + require('../assets/images/default.png') + '"',
        quickLink: 1,
        isMark: 0,
        cartnum: 0,
        screenHight: this.$getScreenHeight(),
        classId: this.$route.params.classId,
        isLoding: false
      }
    },
    components: {
      previewer,
      NumberInput,
      cart,
      commend
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
      '$route': 'refresh'
    },
    destroyed() {
      this.$indicator.close()
    },
    computed: {
      imageList() {
        return this.detailData.filePathList ? this.detailData.filePathList : []
      },
      firstImage() {
        if (this.detailData.filePathList) {
          if (this.detailData.filePathList.length) {
            return  this.detailData.filePathList[0]
          } else {
            return require('../assets/images/defaultbox.png')
          }
        }
      },
      evaluate() {
        return this.detailData.custgradingViewVo ? this.detailData.custgradingViewVo : []
      },
      attrList() {
        return this.detailData.attrList || []
      },
      isBookMark() {
        return this.detailData.isBookMark
      },
      // 商品类别前六位是100122的可以柜机取货
      iscab() {
        if (this.detailData.classId) {
          if (this.detailData.classId.slice(0,6) === '100122') {
            return true
          }
        }
        return false
      }
    },
    created() {
      this.refresh()
      document.title = '逛逛-商品详情'
    },
    filters: {
      freightType(type) {
        if (parseInt(type) === 1) {
          return '免运费'
        } else {
          return '有运费'
        }
      }
    },
    methods: {
      refresh() {
        this.getDetailData()
        this.$nextTick(()=>{
          document.documentElement.scrollTop = 0
          document.body.scrollTop = 0
        })
      },
      getDetailData() {
        HomeApi.GetGoodsDetail({productId: this.$route.params.productId}).then(
          res => {
            if (parseInt(res.data.resultCode) === 1) {
              this.detailData = res.data
            }
            console.log(res);
          },
          err => {
            console.log(err);
          }
        )
      },
      // 查看大图
      show (index) {
        if (!this.firstImage.includes('data:image')) {
          this.$refs.previewer.show(index)
        }
      },
      getImgPath(path) {
        if (!path) {
          return require('../assets/images/default.png')
        }
        return path
      },
      // 添加收藏和取消收藏
      addBookMark() {
        if (!this.detailData.productId){
          return false
        }
        this.isLoding = true
        let markdata = {
          "linkType": 1,
          "linkUrl": this.detailData.productId ,
          "linkNo": this.detailData.productId,
          "linkName": this.detailData.productName
        }
        HomeApi.AddBookMark(markdata).then(
          res => {
            console.log(res);
            this.isLoding = false
            // 未登录
            if (res.data.resultCode === 3) {
              this.$router.push({
                name: 'login',
                query: {
                  returnUrl: this.$route.path
                }
              })
            } else if (res.data.resultCode === 1) {
              this.detailData.isBookMark===0 ? this.detailData.isBookMark = 1 : this.detailData.isBookMark = 0
              this.detailData = JSON.parse(JSON.stringify(this.detailData))
              this.$toast(res.data.info)
            } else {
              this.$toast(res.data.info)
            }
          },
          err => {
            console.log(err);
            this.isLoding = false
          }
        )
      },
      // 业内导航
      golink(n) {
        this.quickLink = n
        let anchor = this.$el.querySelector('#link' + n)
        document.documentElement.scrollTop = anchor.offsetTop
        document.body.scrollTop = anchor.offsetTop
      },
      // 加入购物车
      addToCart() {
        if (this.detailData.productNum == 0) {
          this.$toast('库存不足')
          return false
        }
        if (!this.detailData.productId){
          return false
        }
        this.isLoding = true
        let jsonData = {"stockNum": this.eqNum,"stockId": this.detailData.productId};
        HomeApi.addToCart(jsonData).then(
          res => {
            console.log(res);
            this.isLoding = false
            if (res.data.resultCode === 1) {
              this.cartnum = this.eqNum
              this.$nextTick(() => {
                this.$refs.cart.doaddnum()
              })
              this.$toast(res.data.info)
            } else if (res.data.resultCode === 3) {
              this.$router.push({
                name: 'login',
                query: {
                  returnUrl: this.$route.path
                }
              })
            } else {
              this.$toast(res.data.info)
            }
          },
          err => {
            console.log(err);
            this.isLoding = false
          }
        )
      },
      // 立即购买
      buy() {
        if (this.detailData.productNum == 0) {
          this.$toast('库存不足')
          return false
        }
        if (!this.detailData.productId){
          return false
        }
        HomeApi.QuickBuy({"productNum": this.eqNum, "productId": this.detailData.productId}).then(
          res => {
            console.log(res);
            if (res.data.resultCode === -1) {
              this.$router.push({name: 'login', query:{returnUrl: location.href}})
            } else if (res.data.resultCode === 1) {
              let postquery = {
                stockType: 1,
                cartParam: res.data.tradeId + ',' + res.data.productNum,
                productId: this.$route.params.productId
              }
              if (this.iscab) {
                postquery.iscab = 1
              }
              this.$router.push({
                name: 'order',
                query: postquery
              })
            } else {
              this.$messagebox({
                title: '提示',
                message: res.data.info
              })
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
.nocommend {
  text-align: center;
  line-height: 1rem;
  background:#fff;
}
.shopinfo {
  background: #fff;
  margin-top: .2rem;
  padding: .3rem;
  .shopname{
    text-align: center;
    line-height: .6rem;
    font-size: .3rem;
  }
  .shopicon {
    width: .6rem;
    height: .6rem;
    float: left;
    img {
      width: 100%;
    }
  }
  .shopbox {
    width: 50%;
    height: 1.2rem;
    padding: .3rem 0;
    float: left;
    p{
      text-align: center;
    }
  }
}
.describe {
  width: 100%;
  overflow: hidden;
}
.detail-top {
  height: .8rem;
  width: 100%;
  position: fixed;
  z-index: 8;
  top: 0;
  ul {
    background: #fff;
    li {
      width: 25%;
      line-height: .8rem;
      float: left;
      text-align: center;
      border-bottom: #fff 2px solid;
      transition: border-bottom .5s;
      &.active {
        border-bottom: #ff2c55 2px solid;
        color: #ff2c55;
      }
    }
    &::after {
      content:".";display:block;height:0;clear:both;visibility:hidden;
    }
  }
}
.swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction{bottom:.6rem;}
.swiper-container .swiper-pagination{ font-size:.3rem;  margin-right:.32rem; width:1rem; background:#333; right:0; opacity:.9; left:auto; border-radius:.06rem; color:#fff; line-height:0.54rem; bottom: .3rem;}
.swiper-container .swiper-tip{position: absolute;bottom: 0;background: rgba(0,0,0,0.6);width: 100%;height: 0.6rem;line-height: 0.6rem}
.swiper-container .swiper-tip {
  z-index: 2;
}
.swiper-wrapper {
  display: block;
}
.lh {
  line-height: 1rem !important;
}
.piccont {
  width: 100%;
  position: relative;
  margin-top: 2px;
}
.middle {
  vertical-align: middle;
  text-align: center;
  height: 5rem;
  line-height: 5rem;
  overflow: hidden;
}
.swiper-container img {
  max-height: 100%;
  max-width: 100%;
  display: inline;
}
.detail-box {
  background: #fff;
  padding: .3rem;
  h3 {
    font-size: .32rem;
    padding-bottom: .2rem;
    color: #000;
  }
  p {
    padding: .1rem 0;
  }
}
span.price {
  color: #ff2c55;
}
.viewlink {
  color: #4992bf;
}
.num-box {
  position: relative;
}
.num {
  position: absolute;
  right: .3rem;
  height: 1rem;
  line-height: 1rem;
  top: 0;
}
.num-box .weui-cells {
  background: none !important;
}
.num-box .weui-cells:after {
  border-bottom: none !important;
}
.num-box .weui-cell:before {
  border-top: none !important;
}

.mbgame-iftion{ height:1rem; }
.mbgame-iftion .iftdemo{ width:50%; height:1rem; line-height:1rem;}
.mbgame-iftion .iftdemo a{ display:block; border-bottom: 1px solid #e8e8e8; border-top:1px solid #e8e8e8;}
.mbgame-iftion .iftdemo:first-child a.active{border-right:1px solid #e8e8e8; border-left:none; }
.mbgame-iftion .iftdemo a.active{ background-color:#fff;height:1.02rem;border-left:1px solid #e8e8e8; color:#f75e46;  border-bottom: none;}

.rechseach-titl {height: auto; display:block; overflow:hidden;}
.rechseach-titl span{display: inline-block;width: 2.35rem;text-align: center; white-space:nowrap; overflow:hidden; line-height: 1.1rem;}
.rechseach-titl .sto_rent{ height:1rem; line-height:1rem; color:#666;}
.rechseach-titl .sto_rerg{height:1rem; line-height:1rem; width:70%;}
.rechseach-titl .sto-height{ line-height:0.48rem; margin:0.28rem 0; height:auto;}


.buybox {
  height: 1rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  .bookmark {
    width: 30%;
    height: 1rem;
    background: url('~images/mark.png') center .1rem no-repeat #fff;
    background-size: .45rem;
    float: left;
    span {
      width: 100%;
      display: block;
      text-align: center;
      padding-top: .6rem;
    }
  }
  .bookmark.ed {
    background: url('~images/marked.png') center .1rem no-repeat #fff;
    background-size: .45rem;
  }
  .button {
    width: 35%;
    float: left;
    height: 1rem;
    color: #fff;
    font-size: .32rem;
  }
  .car {
    background-color: #ff2c55;
  }
  .buy {
    background-color: #ecc100;
  }
  .car.dis {
    background-color: #ddd !important;
  }
  .buy.dis {
    background-color: #ccc !important;
  }
}
</style>
