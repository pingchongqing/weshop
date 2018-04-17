<template>
<div>
  <div class="addr px-30" v-if=" addressData.addressId " @click="nextPage">
    <div class="addrpeople f30">
      <span>收货人：{{addressData.consignee}}</span>
      <span class="pl-30">{{addressData.phone}}</span>
      <span class="fr color-999" v-show="parseInt(addressData.isDefault) === 0">默认</span>
    </div>
    <div class="recive">收货地址：{{addressData.areaName|areaNameFilter}} {{addressData.streetAddress}}</div>
  </div>
  <div class="addr addrno px-30" v-else @click="newAddress">
    <div class="newaddr f30">
      <span>新增收货地址</span>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  props: {
    addressData: {
      default: function(){
        return {}
      },
      type: Object
    }
  },
  filters: {
    areaNameFilter(str) {
      if (str)
        return str.split('->').join(' ').replace(/中国/g, '')
      return ''
    }
  },
  methods: {
    newAddress() {
      this.$router.push({
        name: 'modifyAddress'
      })
    },
    nextPage() {
      this.$router.push({
        name: 'addressList'
      })
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
.addr {
  background: url('~images/right.png') 98% center no-repeat #fff;
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
}
.addrno {
  animation: bordermove 1s linear infinite;
}
</style>
