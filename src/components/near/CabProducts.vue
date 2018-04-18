<template>
  <div id="wrapper" :style="{minHeight: screenHight + 'px'}">
    <div class="mobilegames-conn">
      <div class="cabinfo">
        <p>柜机编号：{{cabinetId}}</p>
        <p>柜机地址：{{cabAddress}}</p>
      </div>
      <div class="mbilegames-list mt-20">
        <div class="empty" v-show="goodsList.length===0 && isLoadAll"><span>柜机暂无上架商品~</span></div>
        <transition-group tag="ul" name="flip-list">
          <li class="listware bg-fff border-bottom mb-20" v-for="item in goodsList" :key="item.productNo" @click="nextPage(item)">
            <div class="mbgmes-img fl">
              <div class="img-center">
                <img :src="item.filePath || defaultImgPath" :onError="nofind">
              </div>
            </div>
            <div class="mbgmes-con">
              <div class="mbl-title f30 color-000">{{item.productName}}</div>
              <div class="mbl-cper">
                <div class="mbl-money color-m1 f32 fl">货号：{{item.productNo}}</div>
              </div>
            </div>
          </li>

        </transition-group>
      </div>
    </div>
    <footerComponent ></footerComponent>
    <go-top></go-top>
  </div>
</template>
<script>
import { CabApi } from 'api/index'
import footerComponent from '../Footer'
import { Loadmore } from 'mint-ui';
import GoTop from '@/components/common/GoTop'
export default {
  data() {
    return {
      goodsList: [],
      isLoding: false,
      isLoadAll: false,
      nofind: 'this.src="' + require('../../assets/images/defaultbox.png') + '"',
      defaultImgPath: require('../../assets/images/defaultbox.png'),
      screenHight: this.$getScreenHeight(),
      cabAddress: this.$route.query.cabAddress||'无法获得柜机地址',
      cabinetId: this.$route.params.cabinetId
    }
  },
  components: {
    footerComponent,
    'mt-loadmore': Loadmore,
    'go-top': GoTop,
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
    this.getGoodsList()
    document.title = '逛逛-柜机商品'
  },
  methods: {
    // 获取精品推荐商品
    getGoodsList() {
      this.isLoding = true
      let params = {
        method:'cabinet.queryProducts',
        data: {
          cabinetId: this.$route.params.cabinetId
        }
      }
      CabApi.GetCabProducts(params).then(
        res => {
          console.log(res);
          if (res.data.code==='200' && res.data.data.length) {
            this.goodsList = res.data.data
          }
          this.isLoding = false
          this.isLoadAll = true
        },
        err => {
          console.log(err);
          this.isLoding = false
          this.isLoadAll = true
        }
      )
    },
    async nextPage(item) {
      this.isLoding = true
      await CabApi.GetProducts({productNo: item.productNo, customNo: item.customNo}).then(
        res => {
          console.log(res);
          this.isLoding = false
          if (parseInt(res.data.resultCode) === 2) {
            this.$messagebox('商城暂无该商品数据，请浏览其他商品')
          } else if (parseInt(res.data.resultCode) === 1) {
            this.$indicator.close()
            this.$router.push({
              name: 'goodsDetail',
              params: {
                classId: res.data.classId,
                productId: res.data.productId
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
    }
  }
}
</script>
<style scoped>
.cabinfo{
  border: #ccc 1px dashed;
  background: #ff2c55;
  padding: .2rem;
}
.cabinfo p {
  color: #fff;
  font-size: .3rem;
  line-height: 150%;
}
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
