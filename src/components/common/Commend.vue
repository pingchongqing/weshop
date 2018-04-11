<template>
  <!-- 精品推荐开始 -->
  <div class="recommend">
    <div class="title">推荐商品</div>
    <ul v-if="commendList.length">
      <li v-for="goods in commendList" :key="goods.productId" @click="nextPage(goods)">
        <div class="imgbox">
          <img :src="getImgPath(goods.filePath)" />
        </div>
        <p class="protitle">{{goods.productName}}</p>
        <p><span class="money">￥{{goods.productPrice}}</span><span class="people" v-show="goods.saleNum">销量{{goods.saleNum}}</span></p>
      </li>
      <div class="clear"></div>
    </ul>
    <div class="nocommend" v-else>
      暂无推荐商品
    </div>
  </div>
  <!-- 精品推荐结束 -->
</template>
<script>
import {HomeApi} from 'api'
export default {
  data() {
    return {
      commendList:[]
    }
  },
  props: ['classId'],
  created() {
    this.getCommendData()
  },
  methods: {
    getImgPath(path) {
      if (!path) {
        return require('../../assets/images/default.png')
      }
      return path
    },
    // 获取推荐信息
    getCommendData() {
      let params = {commend: 1, pageSize: 6}
      if (this.classId) {
        params.classId = this.classId
      }
      HomeApi.GetProducts(params).then(
        res => {
          if (parseInt(res.data.resultCode) === 1) {
            this.commendList = res.data.pages.appProductList
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      )
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
<style scoped lang="less">
.nocommend {
  text-align: center;
  line-height: 1rem;
  background:#fff;
}
.recommend {
  clear: both;
  margin-top: .3rem;
}
.recommend .title {
  height: .8rem;
  font-size: .32rem;
  line-height: .8rem;
  background: #ffffff;
  text-align: left;
  padding-left: .3rem;
}
.recommend ul {
  background: #fff;
}
.recommend li {
  width: 49%;
  background: #ccc;
  height: auto;
  float: left;
  background: #fff;
  margin-bottom: .2rem;
  box-sizing: border-box;
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
  height: .5rem;
  overflow: hidden;
}
.recommend li p.protitle {
  color: #353535;
  padding-bottom: 0;
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
