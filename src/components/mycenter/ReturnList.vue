<template>
  <div :style="{minHeight: screenHight + 'px'}">
      <div class="empty" v-show="orderList.length===0 && isLoadAll"><span>暂无退换货订单~</span></div>
      <ul class="listcontainer" v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"  ref="ldm1">
        <li-component
          :listData="orderList"
        ></li-component>
      </ul>
    <div style="height:1rem"></div>
    <go-top></go-top>
    <footerComponent ></footerComponent>
  </div>
</template>
<script>
import { HomeApi } from 'api'
import { Loadmore } from 'mint-ui';
import GoTop from '@/components/common/GoTop'
import OrderComponent from './OrderComponent'
import footerComponent from '../Footer'
export default {
  data() {
    return {
      orderList: [],
      pageIndex: 0,
      pageSize: 10,
      isLoding: false,
      isLoadAll: false,
      totalPages: 1,
      screenHight: this.$getScreenHeight(),
    }
  },
  components: {
    'li-component':OrderComponent,
    'load-more':Loadmore,
    'go-top': GoTop,
    footerComponent,
  },
  watch: {
    '$route': 'reload',
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
    document.title = '逛逛-退换货'
  },
  methods: {
    // 获取订单列表数据
    getOrderData() {
      this.isLoding = true
      let jsonData = { 'iStart': this.pageIndex, 'pageSize': this.pageSize, 'buyerCustId': this.$route.query.buyerCustId};
      HomeApi.GetReturnOrderList(jsonData).then(
        res => {
          console.log(res);
          this.isLoding = false
          if (parseInt(res.data.resultCode) === 1 && res.data.counter > 0) {
            this.orderList = [...this.orderList, ...res.data.pages.pageList]
            this.totalPages = res.data.pages.totalPages
            // 数据加载完毕
            if (this.pageIndex === parseInt(res.data.pages.totalCount/this.pageSize + 1) || res.data.pages.totalCount === 0) {
              this.isLoadAll = true
            }
          } else if (res.data.counter == 0) {
            this.isLoadAll = true
          } else if (res.data.resultCode === -1) {
            this.$router.push({
              name: 'login',
              query: {
                returnUrl: location.href
              }
            })
          }

        },
        err => {
          console.log(err);
          this.isLoding = false
        }
      )
    },
    async loadMore() {
      if (!this.isLoding && !this.isLoadAll) {
        await this.getOrderData()
        this.pageIndex++
      }
    },
    async reload() {
      this.isLoadAll = false
      this.orderList = []
      this.pageIndex = 0
      await this.loadMore()
    },
  }
}
</script>
<style lang="less" scoped>

</style>
