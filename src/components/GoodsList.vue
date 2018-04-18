<template>
  <div id="wrapper" :style="{minHeight: screenHight + 'px'}">
    <div class="index-top">
      <!-- 首页分类导航 -->
      <classlist></classlist>
      <!-- 首页分类导航结束 -->
      <div class="index-search">
        <input-component
          :iclass="'top-input'"
          v-model="searchText"
          placeholder="请输入关键字" @pclear="inputclear"></input-component>
        <div class="searchbox"></div>
        <div class="searchicon"></div>
      </div>
      <button @click="doSearch" v-show="searchText" class="search-button">搜索</button>
    </div>
    <div class="pb-100"></div>
    <div class="mobilegames-nav">
      <div class="gmnav-mle">
        <div class="navdemo" :class="{active: this.sortType === 1}">
          <a @click="sortClick(1)">
            <span class="color-666 f30">默认</span>
          </a>
        </div>
        <div class="navdemo" :class="{active: this.sortType === 2}">
          <a @click="sortClick(2)">
            <span class="server color-666 f30">销量</span>
          </a>
        </div>
        <div class="navdemo" :class="{active: this.sortType === 4}">
          <a @click="sortClick(3)">
            <span class="color-666 f30 server">价格</span>
          </a>
        </div>
        <div class="navdemo" :class="{active: this.sortType === 6}">
          <a @click="sortClick(4)">
            <span class="server color-666 f30">新品</span>
          </a>
        </div>
      </div>
    </div>
    <div class="mobilegames-conn">
      <div class="mbilegames-list mt-20">
        <div class="empty" v-show="goodsList.length===0 && isLoadAll"><span>空的~</span></div>
        <transition-group tag="ul" name="flip-list" v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
          <li class="listware bg-fff border-bottom mb-20" v-for="item in goodsList" :key="item.productId" >
            <router-link :to="{ name: 'goodsDetail', params: {classId: item.classId, productId: item.productId}, query:{saleCustId: item.custId} }">
              <div class="mbgmes-img fl">
                <div class="img-center">
                  <img :src="item.filePath || defaultImgPath" :onError="nofind">
                </div>
              </div>
              <div class="mbgmes-con">
                <div class="mbl-title f30 color-000">{{item.productName}}</div>
                <div class="mbl-cper">
                  <div class="mbl-money color-m1 f32 fl">￥{{item.originalPrice}}</div>
                  <span class="mbl-money fr color-666"  v-if="item.saleNum">销量{{item.saleNum}}</span>
                </div>
              </div>
            </router-link>
          </li>

        </transition-group>
      </div>
    </div>
    <footerComponent ></footerComponent>
    <go-top></go-top>
  </div>
</template>
<script>
import { HomeApi } from '../api/index'
import footerComponent from './Footer'
import { Loadmore } from 'mint-ui';
import GoTop from '@/components/common/GoTop'
import {InputComponent} from 'components/common/formComponent'
import classlist from 'components/common/ClassList'
export default {
  data() {
    return {
      goodsList: [],
      totalPages: 1,
      pageSize: 10,
      pageIndex: 0,
      isLoding: false,
      isLoadAll: false,
      //1默认排序，不传参数，
			//2销量降saleSort：desc 3销量升asc
			//4价格降priceSort：desc 5价格降asc
			//6新旧降timeSort：desc 7新旧升asc
			sortType: 1,
      nofind: 'this.src="' + require('../assets/images/defaultbox.png') + '"',
      defaultImgPath: require('../assets/images/defaultbox.png'),
      searchText: this.$route.query.productName || '',
      screenHight: this.$getScreenHeight()
    }
  },
  components: {
    footerComponent,
    'mt-loadmore': Loadmore,
    'go-top': GoTop,
    InputComponent,
    classlist
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
    '$route': 'inputclear'
  },
  computed: {
    sortBy() {
      let jsonData = {}
      switch (this.sortType){
        case 2:jsonData.saleSort="desc";break;
        case 3:jsonData.saleSort="asc";break;
        case 4:jsonData.priceSort="desc";break;
        case 5:jsonData.priceSort="asc";break;
        case 6:jsonData.timeSort="desc";break;
        case 7:jsonData.timeSort="asc";break;
        default:break;
      }
      return jsonData
    },
    classId() {
      return this.$route.query.classId
    },
    productName() {
      return this.searchText || this.$route.query.productName
    }
  },
  destroyed() {
    this.$indicator.close()
  },
  created() {
    document.title = '逛逛-商品列表'
  },
  methods: {
    // 获取精品推荐商品
    getGoodsList() {
      this.isLoding = true
      let params = {
        'iStart': this.pageIndex,
        'pageSize': this.pageSize,
        'classId': this.classId,
        'productName': this.productName
      }
      params = Object.assign(params, this.sortBy)
      HomeApi.GetProducts(params).then(
        res => {
          if (parseInt(res.data.resultCode) === 1) {
            this.goodsList = [...this.goodsList, ...res.data.pages.appProductList]
            this.totalPages = res.data.pages.totalPages
          }
          this.isLoding = false
          // 数据加载完毕
          if (this.pageIndex === res.data.pages.totalPages + 1) {
            this.isLoadAll = true
          }
          console.log(res);
        },
        err => {
          console.log(err);
          this.isLoding = false
        }
      )
    },
    async loadMore () {
      if (!this.isLoding && !this.isLoadAll) {
        await this.getGoodsList()
        this.pageIndex++
      }
    },
    sortClick(num) {
      switch (num) {
        case 1:
          this.sortType = 1;
          break;
        case 2:
          if (this.sortType === 2) {
            this.sortType = 3
          } else {
            this.sortType = 2
          }
          break;
        case 3:
          if (this.sortType === 4) {
            this.sortType = 5
          } else {
            this.sortType = 4
          }
          break;
        case 4:
          if (this.sortType === 6) {
            this.sortType = 7
          } else {
            this.sortType = 6
          }
          break;
        default:
          break;
      }
      this.pageIndex = 0
      this.goodsList = []
      this.loadMore()
    },
    doSearch() {
      this.isLoadAll = false
      this.goodsList = []
      this.pageIndex = 0
      this.loadMore()
    },
    inputclear() {
      this.searchText = ''
      this.doSearch()
    }
  }
}
</script>
<style scoped>
.listware {
    padding: 15px;
}
.mobilegames-conn{height:auto; display:block; overflow:hidden;}
.mbilegames-list{height:auto; display:block; overflow:hidden;}
.mbilegames-list .listware{ height:auto; display:block; overflow:hidden; position:relative;}
.mbilegames-list .listware .ware-titl{ height:0.6rem; line-height:0.4rem;}
.mbilegames-list .listware .ware-client{ height:0.44rem; line-height:0.44rem;}
.mbilegames-list .ware-discount{ position:absolute;width: auto;height: auto; right:.3rem; bottom:.3rem}
.ware-discount .dcnt-price{ height:0.72rem; line-height:0.72rem;}
.ware-discount .dtal-price{ height:0.72rem; line-height:0.5rem}
.ware-discount .dcnt-stock{ height:0.36rem; line-height:0.36rem;}
.ware-discount .dcnt-stock i{ display:inline-block; width:0.34rem; height:0.36rem; float:left;}

.mbilegames-list .listware .mbgmes-img{ width:1.5rem; overflow:hidden; position:relative; height:1.5rem; line-height:1.5rem; background:#f1f1f1;}
.mbilegames-list .listware .mbgmes-img img{ height: 1.5rem;vertical-align: top;}
.mbgmes-con{float: right; width: 4.6rem; min-width: 78%;box-sizing: border-box; padding-left: .2rem; font-size: .26rem;  overflow: hidden; line-height: .4rem;}
.mbgmes-con .mbl-title{ overflow:hidden; line-height:0.4rem;}
.mbgmes-con .mbl-cper{ height:auto; display:block; overflow:hidden; margin-top:0.15rem}
.mbgmes-con .mbl-cper .mbl-money{ height:0.58rem; line-height:0.58rem; }
.mbgmes-con .mbl-cper .mbl-icon{height:0.58rem;}
.mbgmes-con .mbl-cper .mbl-icon i{ display:inline-block; float:left; width:0.45rem; height:0.58rem;}



.listware .hrgames-titl{ line-height:0.5rem; display:block; overflow:hidden;}
.mobilegames-conn .listware .hrgames-img{ height:auto; display:block; overflow:hidden; width:120%;}
.mobilegames-conn .listware .hrgames-img .img-demo{ width:2.42rem; text-align:center; height:1.5rem; background-color:#f1f1f1; margin-right:0.2rem;}
.mobilegames-conn .listware .hrgames-img .img-demo img{ height:1.5rem;}
.listware .hrgames-tne{ height:0.5rem; line-height:0.4rem;}
.detail-tutorial .hrgames-cfi{ height:0.8rem ; line-height:0.8rem ;}
.hrgames-cfi{ line-height:0.4rem; overflow:hidden;}
.hrgames-cfi i{height:0.4rem; padding-left:0.4rem; }


.mobilegames-nav{ height:auto; display:block; background: #fff; border-top: #f4f4f4 1px solid;}
.mobilegames-nav .gmnav-mle{height:auto; display:block; overflow:hidden; position:relative;}
.mobilegames-nav .gmnav-mle .navdemo{ float:left; width:25%; height:0.95rem; text-align:center;}
.mobilegames-nav .gmnav-mle .active { border-bottom: #ff2c55 2px solid;}
.mobilegames-nav .gmnav-mle .active span{ color:#ff2c55; }
.mobilegames-nav .navdemo span{ display:inline-block; height:0.95rem; line-height:0.95rem; padding-right:0.33rem; text-align: center;}
.mobilegames-nav .navdemo span.server{ background:url(~images/Icon/mold-sv.png) no-repeat right .38rem; background-size:0.22rem 0.13rem;}
.mobilegames-nav .gmnav-mle .active span.server{ background:url(~images/Icon/mold-sv-hov.png) no-repeat right .38rem; background-size:0.22rem 0.13rem;}

.flip-list-move {
   transition: transform 1s;
 }

.flip-list-enter-active, .flip-list-leave-active {
 transition: all 1s;
}
.flip-list-enter, .flip-list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
 opacity: 0;
 transform: translateX(30px);
}

.empty {
  height: 3.5rem;
  margin-top: .3rem;
  background: url('~images/nores.png') no-repeat center;
  opacity: .45;
  position: relative;
  animation: nofadeIn 1s;
}
.empty span {
  text-align: center;
  display: block;
  position: absolute;
  bottom: 0rem;
  left: 50%;
  transform: translate(-50%, 0);
  color: #333;
}
/*首页顶部*/
.index-top {
  height: 1rem;
  position: absolute;
  z-index: 100;
  width: 100%;
  background: #fff;
  padding: .2rem 0;
}
.index-top .index-menu {
  width: .6rem;
  height: .6rem;
  background: url('~images/menu.png') no-repeat;
  background-size: cover;
  margin: 0 .3rem;
  float: left;
}
.index-top .index-search {
  position: relative;
  width: 65%;
  height: .6rem;
  float: left;
}
.index-top .index-search .searchbox {
  width: 100%;
  height: .6rem;
  border-radius: .3rem;
  opacity: .5;
  background: #eaeaea;
  position: absolute;
  z-index: 10;
}
.index-top .index-search .searchicon {
  width: .6rem;
  height: .6rem;
  background: url('~images/searchccc.png') no-repeat;
  background-size: cover;
  margin: 0 .1rem;
  float: left;
  position: absolute;
  z-index: 11;
}
.index-top .index-search .top-input {
  position: absolute;
  top: .15rem;
  left: .4rem;
  height: .5rem;
  width: 75%;
  background: none;
  border: none;
  z-index: 12;
}
.search-button {
  border-radius: .1rem;
  border: #ddd 1px solid;
  background: #ff2c55;
  height: .6rem;
  margin-left: .2rem;
  line-height: .5rem;
  padding: 0 .2rem;
  color: #fff;
}
</style>
