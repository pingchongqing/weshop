<template>
  <div id="wrapper">
    <!-- banner开始 -->
    <div class="newhmban">
      <swiper class="index-banner" :options="swiperOption"
                  ref="indexSwiper" v-if="bannerList.length">
        <swiper-slide v-for="(item, index) in bannerList" @click.native="goBannerUrl(item)" :key="index">
          <img :src="item.filePath">
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
    <!-- banner结束 -->
    <!-- 首页顶部 -->
    <div class="index-top">
      <!-- 首页分类导航 -->
      <classlist :cstyle="'white'"></classlist>
      <!-- 首页分类导航结束 -->
      <div class="index-search" @click="searchClick">
        <div class="searchbox"></div>
        <div class="searchicon"></div>
      </div>
    </div>
    <!-- 首页顶部结束 -->
    <!-- 精品推荐开始 -->
    <div class="recommend">
      <div class="title">—— 精品推荐 ——</div>
      <ul>
        <li v-for="goods in goodsList" :key="goods.productId" @click="nextPage(goods)">
          <div class="imgbox">
            <img :src="getImgPath(goods.filePath)" />
          </div>
          <p class="protitle">{{goods.productName}}</p>
          <p><span class="money">￥{{goods.productPrice}}</span><span class="people">{{goods.saleNum}}人付款</span></p>
        </li>
        <div class="clear"></div>
      </ul>
    </div>
    <!-- 精品推荐结束 -->
    <footerComponent :active="'home'"></footerComponent>
  </div>
</template>

<script>
import { HomeApi } from '../api/index'
import footerComponent from './Footer'
import classlist from 'components/common/ClassList'
export default {
  data () {
    return {
      host: this.$CONSTANTS.HOST,
      swiperOption: {
       /** notNextTick是一个组件自有属性，如果notNextTick设置为true，
       * 组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，
       * 假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
       */
       notNextTick: true,
       // swiper configs 所有的配置同swiper官方api配置
       autoplay: 3000,
       direction : 'horizontal',
       grabCursor : true,
       setWrapperSize :true,
       autoHeight: true,
       loop: false,
       pagination : '.swiper-pagination',
       paginationClickable :true,
       mousewheelControl : false,
       observeParents:true,
       //用户操作了swiper是否禁止自动播放
       autoplayDisableOnInteraction: true,
     },
      bannerList: [],
      goodsList: [],
      psdata: ''
    }
  },
  components: {
    footerComponent,
    classlist
  },
  created() {
    this.getBannerList()
    this.getProducts()
    this.getWeixinUser()
    this.$indicator.close()
  },
  methods: {
    //获取用户信息
    getWeixinUser() {
      if (this.$route.query.code && this.$route.query.state) {
        HomeApi.GetWeixinUser({code: this.$route.query.code, state: this.$route.query.state}).then(
          res => {
            this.psdata = JSON.stringify(res.data)
            console.log(res);
            // if (res.data.code === 'fail') {
            //   this.$toast(res.data.message)
            // }
          },
          err => {
            console.log(err);
          }
        )
      }
    },
    // 获取轮播图片方法
    getBannerList() {
      HomeApi.SelectBanner().then(
        res => {
          if (parseInt(res.data.resultCode) === 1) {
            this.bannerList = res.data.appAdvertisementList
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      )
    },
    // 轮播图点击跳转方法
    goBannerUrl(item) {
      location.href = item.advUrl
    },
    // 获取精品推荐商品
    getProducts() {
      HomeApi.GetProducts({commend: '1', pageSize: 100}).then(
        res => {
          if (parseInt(res.data.resultCode) === 1) {
            this.goodsList = res.data.pages.appProductList
          }
          console.log(res);
        },
        err => {
          console.log(err);
          this.$messagebox({
            message: '服务器开小差了,请稍后访问'
          })
        }
      )
    },
    // 搜索链接跳转
    searchClick() {
      this.$router.push({
        name: 'search'
      })
    },
    getImgPath(path) {
      if (!path) {
        return require('../assets/images/default.png')
      }
      return path
    },
    nextPage(goods) {
      this.$router.push({
        name: 'goodsDetail',
        params: {
          classId: goods.classId,
          productId: goods.productId
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.swiper-slide {
  text-align: center;
}
.swiper-slide img {
  width: 100% !important;
  height: auto !important;
}
.swiper-container {
  width: 100%;
  background: #000;
  height: 212px;
}
.swiper-pagination-bullet {
  opacity: .45;
  background: #000;
}
.swiper-pagination-bullet-active {
  background: #fff !important;
  opacity: 1 !important;
}
.newhmban .swiper-container .swiper-pagination-bullet{opacity:0.6;}
.newhmban .swiper-container .swiper-pagination{ margin-right:0;  width:100%; background:none; right:auto;opacity:1;  left:auto; border-radius:100%;  line-height:0rem;  bottom: .2rem; }
.newhmban .swiper-wrapper{ width: 100%; height: auto; line-height:normal;  }
/*首页banner*/
.index-banner{ height:212px; display:block; overflow:hidden; position:relative;}
.index-banner .banner-img{ height:2.92rem; width:100%;}
.index-banner .banner-img .demo{height:2.92rem; display:block; overflow:hidden;}
.index-banner .banner-img .demo img{ height:100%;}
.banner-list{ position:absolute; bottom:0.2rem; width:100%; text-align:center;}


/*首页顶部*/
.index-top {
  height: .8rem;
  position: absolute;
  top: .5rem;
  z-index: 100;
  width: 100%;
}

.index-top .index-search {
  position: relative;
  width: 75%;
  height: .6rem;
  float: left;
}
.index-top .index-search .searchbox {
  width: 100%;
  height: .6rem;
  border-radius: .8rem;
  opacity: .5;
  background: #fff;
  position: absolute;
  z-index: 10;
}
.index-top .index-search .searchicon {
  width: .6rem;
  height: .6rem;
  background: url('~images/search.png') no-repeat;
  background-size: cover;
  margin: 0 .1rem;
  float: left;
  position: absolute;
  z-index: 11;
}
.index-top .index-search .top-input {
  position: absolute;
  top: .15rem;
  left: 1rem;
  height: .5rem;
  width: 75%;
  background: none;
  border: none;
  z-index: 12;
}

/*精品推荐*/
.recommend {
  clear: both;
  margin-top: .3rem;
}
.recommend .title {
  height: .8rem;
  font-size: .32rem;
  line-height: .8rem;
  color: #ff2c55;
  background: #ffffff;
  text-align: center;
}
.recommend ul {
  margin-top: .2rem;
}
.recommend li {
  width: 49%;
  background: #ccc;
  min-height: 1rem;
  float: left;
  background: #fff;
  margin-bottom: .2rem;
}
.recommend li:nth-child(even) {
  margin-left: 2%;
}
.recommend li .imgbox{
  width: 100%;
  height: 2.1rem;
  overflow: hidden;
  background: #000;
}
.recommend li img{
  width: 100%;
  height: auto;
}
.recommend li p {
  font-size: .28rem;
  line-height: .5rem;
  padding: .1rem .2rem .1rem;
}
.recommend li p.protitle {
  color: #353535;
  padding-bottom: 0;
  height: 1rem;
}
.recommend li span.money {
  color: #ff2c55;
  padding: 0 .2rem .2rem 0;
}
.recommend li span.people {
  color: #666666;
  padding: 0 .2rem .2rem 0;
  font-size: .22rem;
}

</style>
