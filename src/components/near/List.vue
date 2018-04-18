<template>
  <div id="wrapper">
    <div class="index-top search">
      <div class="index-search">
        <input-component
          :iclass="'top-input'"
          v-model="searchText"
          @pclear="inputclear"
          placeholder="请输入柜机号"></input-component>
        <div class="searchbox"></div>
        <div class="searchicon"></div>
      </div>
      <button @click="doSearch" v-show="searchText" class="search-button">搜索</button>
    </div>
    <!-- 最近使用 -->
    <div class="listcont" v-show="localList.length">
      <h3 class="px-30">最近使用</h3>
      <ul class="clearfix">
        <li v-for="cab in localList" class="clearfix border-bottom" @click="nextPage(cab)">
          <div class="imgbox">
            <img src="~images/Icon/cab.png" />
          </div>
          <p>
            <span>柜机编号：{{cab.storeNo}}</span>
            <!-- <span class="fr">距离: 100米</span> -->
          </p>
          <div class="recive">{{cab.address}}</div>
        </li>
      </ul>
    </div>
    <div class="listcont">
      <h3 class="px-30">{{titleText}}</h3>
      <ul class="clearfix" v-if="cabList.length">
        <li v-for="cab in cabList" class="clearfix border-bottom" @click="nextPage(cab)">
          <div class="imgbox">
            <img src="~images/Icon/cab.png" />
          </div>
          <p>
            <span>柜机编号：{{cab.storeNo}}</span>
            <!-- <span class="fr">距离: 100米</span> -->
          </p>
          <div class="recive">{{cab.address}}</div>
        </li>
      </ul>
      <div class="empty" v-if="cabList.length === 0 && !isLoding">
        <span>未查询到相关柜机</span>
      </div>
    </div>
    <footerComponent :active="'near'"></footerComponent>
  </div>
</template>
<script>
import {CabApi} from 'api'
import {InputComponent} from 'components/common/formComponent'
import footerComponent from '../Footer'
export default {
  data() {
    return {
      searchText: '',
      cabList: [],
      position: this.$getPosition(),
      isLoding: false,
      bakCabList: [],
      titleText: '附近柜机'
    }
  },
  components: {
    InputComponent,
    footerComponent
  },
  computed: {
    localList() {
      if (this.$isLocalStorageSupported()) {
        if (window.localStorage.CabBrowseHistory) {
          return JSON.parse(window.localStorage.CabBrowseHistory)
        }
      }
      return []
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
  destroyed() {
    this.$indicator.close()
  },
  created() {
    CabApi.GetCabList({method:'cabinet.queryStores', data:{cabinetId: '', lat: this.position.lat, lng: this.position.lng}}).then(
      res => {
        console.log(res);
        if (res.data.code === '200' && res.data.data.length) {
          this.cabList = res.data.data
          this.bakCabList = res.data.data
        } else {
          this.$toast('获取柜机数据失败')
        }
      },
      err => {
        console.log(err);
      }
    )
    document.title = '逛逛-附近柜机'
  },
  methods: {
    inputclear() {
      this.cabList = this.bakCabList
      this.titleText = '附近柜机'
    },
    doSearch() {
      this.cabList = []
      this.titleText = '查询结果'
      this.isLoding = true
      CabApi.FindSjg({cabinetId: this.searchText}).then(
        res => {
          this.isLoding = false
          let data = JSON.parse(res.data)
          if (data.code == 200 && data.data.length) {
            this.cabList = data.data
          } else if (data.code == 406) {
            this.$toast('查询频率太快了哦~')
          }
        },
        err => {
          this.isLoding = false
        }
      )
    },
    nextPage(cab) {
      this.$router.push(
        {
          name: 'cabproducts',
          params: {
            cabinetId: cab.storeNo
          },
          query: {
            cabAddress: cab.address
          }
        }
      )
      // 存入本地缓存
      if (this.$isLocalStorageSupported()) {
        this.$saveBrowseHistory(cab)
      }
    }
  }
}
</script>

<style scoped lang="less">
.listcont {
  h3 {
    height: .8rem;
    line-height: .8rem;
    font-size: .32rem;
  }
  ul {
    background:#fff;
    li {
      padding: .2rem .3rem;
      .imgbox {
        width: .8rem;
        height: .8rem;
        background: #f6a742;
        border-radius: 50%;
        float: left;
        margin-right: .3rem;
        padding: .1rem;
        img {
          height: 100%;
        }
      }
      p {
        line-height: 150%;
      }
      .recive {
        padding: 0 .4rem;
        line-height: 150%;
        background: url('~images/Icon/address.png') left center no-repeat;
        background-size: .4rem;
        float: left;
        color: #999;
      }
    }
  }
}

.index-top {
  height: 1rem;
  width: 100%;
  background: #fff;
  padding: .2rem 0;
}
.index-top .index-search {
  position: relative;
  width: 60%;
  height: .6rem;
  float: left;
  margin-left: 20%;
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
.search-button {
  border-radius: .1rem;
  border: #ddd 1px solid;
  background: #999;
  height: .6rem;
  margin-left: .2rem;
  line-height: .5rem;
  padding: 0 .2rem;
  color: #fff;
}
</style>
