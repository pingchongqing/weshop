<template>
<div>
  <div class="addr px-30 clearfix" >
    <mt-cell  title="最近自取地址"  to=""  is-link  value="其他地址"></mt-cell>
    <div class="recive">取货地址：浙江省杭州市滨江区</div>
    <div class="distance">柜机距当前位置1千米</div>
    <div class="pt-20">
      <div class="input-radio mt-20">
        <div class="forcheckbox ed" ></div>
        <input type="checkbox" />
      </div>
      <p class="accept">同意《柜机取货协议》<span class="color-999 fr">查看地图</span></p>
    </div>
  </div>
</div>
</template>
<script>
import {Cell} from 'mint-ui'
export default {
  data() {
    return {

    }
  },
  components: {
    'mt-cell':Cell
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
