<template>
  <div :style="{minHeight: screenHight + 'px'}">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1" @click.native="showList(1)">全部</mt-tab-item>
      <mt-tab-item id="2" @click.native="showList(2)">待付款</mt-tab-item>
      <mt-tab-item id="3" @click.native="showList(3)">待发货</mt-tab-item>
      <mt-tab-item id="4" @click.native="showList(4)">待收货</mt-tab-item>
      <mt-tab-item id="5" @click.native="showList(5)">待评价</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected" >
      <mt-tab-container-item id="1">
        <div class="empty" v-show="orderList.length===0 && isLoadAll"><span>空的~</span></div>
          <ul class="listcontainer" v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10" v-if="selected==1" ref="ldm1">
            <li-component
              :listData="orderList"
            ></li-component>
          </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="empty" v-show="pendingPayment.length===0 && isLoadAll"><span>空的~</span></div>
        <ul class="listcontainer" v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10" v-if="selected==2" ref="ldm2">
          <li-component
            :listData="pendingPayment"
          ></li-component>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div class="empty" v-show="waitingDelivery.length===0 && isLoadAll"><span>空的~</span></div>
        <ul class="listcontainer" v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10" v-if="selected==3" ref="ldm3">
          <li-component
            :listData="waitingDelivery"
          ></li-component>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <div class="empty" v-show="alreadyDelivery.length===0 && isLoadAll"><span>空的~</span></div>
        <ul class="listcontainer" v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10" v-if="selected==4" ref="ldm4">
          <li-component
            :listData="alreadyDelivery"
          ></li-component>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="5">
        <div class="empty" v-show="doneOrder.length===0 && isLoadAll"><span>空的~</span></div>
        <ul class="listcontainer" v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10" v-if="selected==5" ref="ldm5">
          <li-component
            :listData="doneOrder"
          ></li-component>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>
    <div style="height:1rem"></div>
    <go-top></go-top>
    <footerComponent ></footerComponent>
  </div>
</template>
<script>
import { Navbar, TabItem,  TabContainer, TabContainerItem } from 'mint-ui';
import { HomeApi } from 'api'
import { Loadmore } from 'mint-ui';
import GoTop from '@/components/common/GoTop'
import OrderComponent from './OrderComponent'
import footerComponent from '../Footer'
export default {
  data() {
    return {
      orderList: [],
      waitingDelivery: [], // 待发货
      pendingPayment: [], // 待付款
      alreadyDelivery: [], // 待收货
      doneOrder: [], // 待评价
      pageIndex: [0,0,0,0,0],
      selected: this.$route.query.type.toString(),
      pageSize: 10,
      isLoding: false,
      isLoadAll: false,
      totalPages: 1,
      screenHight: this.$getScreenHeight(),
      topStatus: ''
    }
  },
  components: {
    'mt-navbar': Navbar,
    'mt-tab-item': TabItem,
    'mt-tab-container': TabContainer,
    'mt-tab-container-item': TabContainerItem,
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
  computed: {
    dataContainer() {
      let dataContainer = ''
      switch (parseInt(this.selected)){
        case 1:dataContainer='orderList';break;
        case 2:dataContainer='pendingPayment';break;
        case 3:dataContainer='waitingDelivery';break;
        case 4: dataContainer='alreadyDelivery';break;
        case 5:dataContainer='doneOrder';break;
        default: break;
      }
      return dataContainer
    }
  },
  created() {
    document.title = '逛逛-我的订单'
  },
  methods: {
    handleTopChange(val) {
      this.topStatus = val
    },
    showList(selected) {
      this.$router.push({
        name: 'myorder',
        query: {
          type: selected
        }
      })
    },
    // 获取订单列表数据
    getOrderData() {
      this.isLoding = true
      let jsonData = { 'iStart': this.pageIndex[this.selected-1], 'pageSize': this.pageSize, 'countFlag': '1' };
    	switch (parseInt(this.selected)){
    		case 2: jsonData.ordersStatus="3";break;
    		case 3: jsonData.ordersStatus="5";break;
    		case 4: jsonData.ordersStatus="4";break;
    		case 5: jsonData.ordersStatus="7";break;
    		default: break;
    	}
      HomeApi.GetOrderList(jsonData).then(
        res => {
          console.log(res);
          this.isLoding = false
          if (parseInt(res.data.resultCode) === 1) {
            this[this.dataContainer] = [...this[this.dataContainer], ...res.data.pages.pageList]
            this.totalPages = res.data.pages.totalPages
            // 数据加载完毕
            if (this.pageIndex[this.selected-1] === parseInt(res.data.pages.totalCount/this.pageSize + 1) || res.data.pages.totalCount === 0) {
              this.isLoadAll = true
            }
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
        this.pageIndex[this.selected-1]++
      }
    },
    async reload() {
      this.isLoadAll = false
      this[this.dataContainer] = []
      this.pageIndex[this.selected-1] = 0
      await this.loadMore()
    },
  }
}
</script>
<style lang="less" scoped>

</style>
