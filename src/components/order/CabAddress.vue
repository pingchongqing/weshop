<template>
<div>
  <div class="addr px-30 clearfix" >
    <mt-cell  title="最近自取地址"  value="其他地址" :isLink="true" @click.native="showList"></mt-cell>
    <div class="recive">取货地址：{{checkedCabAddress.address}}</div>
    <div class="distance">柜机距当前位置{{checkedCabAddress.distance}}公里</div>
    <div class="pt-20">
      <div class="input-radio mt-20">
        <div class="forcheckbox ed" ></div>
        <input type="checkbox" />
      </div>
      <p class="accept">同意《柜机取货协议》<span class="color-999 fr">查看地图</span></p>
    </div>
  </div>
  <div class="incon" v-show="listShow" @click="maskClick"></div>
  <ul class="cablist" v-show="listShow">
    <li v-for="(addr, index) in cabdata" @click="checkCabAddress(addr)">
      <div class="selectcontainer">
        <div class="input-radio">
          <div class="forcheckbox" :class="{ed: addr.storeNo==checkedCabAddress.storeNo}" ></div>
          <input type="checkbox" :ref="'addresscheck' + index"  />
        </div>
      </div>
      <p>柜机地址:{{addr.address}}</p>
      <p>距离:{{addr.distance}}公里</p>
    </li>
  </ul>
</div>
</template>
<script>
import {Cell} from 'mint-ui'
import {mapState} from 'vuex'
export default {
  data() {
    return {
      listShow: false
    }
  },
  props: ['cabdata'],
  components: {
    'mt-cell':Cell
  },
  computed: {
    addressinfo: {
      get() {
        if (this.cabdata.length) {
          this.$store.commit('setcheckCabAddress', this.cabdata[0])
          return this.cabdata[0]
        }
        return []
      },
    },
    ...mapState({
      checkedCabAddress: state => state.checkedCabAddress
    })
  },
  methods: {
    showList() {
      this.listShow = true
    },
    checkCabAddress(addr) {
      this.$store.commit('setcheckCabAddress', addr)
      this.listShow = !this.listShow
    },
    maskClick() {
      this.listShow = false
    }
  }
}
</script>
<style scoped lang="less">
@keyframes bordermove {
  0% {
    box-shadow: #ff2c55 0 0 5px inset;
  }
  50% {
    box-shadow: #ff2c55 0 0 1px inset;
  }
  100% {
    box-shadow: #ff2c55 0 0 5px inset;
  }
}
.cablist {
  background: #f7f7f7;
  position: absolute;
  z-index: 100;
  top:0;
  left:0;
  right:0;
  li {
    background: #fff;
    padding:.3rem;
    margin-bottom:.2rem;
    height: 2rem;
    p {
      font-size:.3rem;
      padding:.15rem 0;
    }
    .selectcontainer{
      height: 2rem;
      margin-right:.2rem;
      float:left;
      padding-top: .5rem;
    }
  }
}
.incon {
  z-index:99;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #000;
  overflow-x: hidden;
  overflow-y: auto;
  display: block;
  opacity: .75;
}
.addr {
  background: #fff;
  padding-bottom: .3rem;
  background-size: .2rem;
  .addrpeople {
    line-height: .8rem;
    padding: 0 .4rem;
  }
  .recive {
    padding: 0 .4rem;
    line-height: 150%;
    background: url('~images/Icon/address.png') left center no-repeat;
    background-size: .4rem;
  }
  .newaddr {
    padding-top: .26rem;
  }
  .distance {
    padding: .2rem .4rem;
    color: #999;
  }
}
.addrno {
  animation: bordermove 1s linear infinite;
}
.input-radio {
  position: relative;
  width: .4rem;
  height: .4rem;
  float: left;
  .forcheckbox {
    position: absolute;
    z-index: 6;
    background: url('~images/Icon/check.png') no-repeat;
    background-size: cover;
    width: .4rem;
    height: .4rem;
    transition: background .3s;
  }
  .ed {
    background: url('~images/Icon/checked.png') no-repeat;
    background-size: cover;
  }
  input[type="checkbox"]{
    opacity: .01;
  }
}
.accept {
  padding-top: .25rem;
}
</style>
