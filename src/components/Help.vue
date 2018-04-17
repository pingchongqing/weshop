<template>
  <div id="wrapper">
    <mt-cell  title="如何获得积分"  to="/help/scroe"  is-link  ></mt-cell>
    <mt-cell  title="如何获得优惠券"  to="/help/card"  is-link  class="border-top"></mt-cell>
    <mt-cell  title="如何获得积分"  to="/help/scroe"  is-link  class="border-top"></mt-cell>
    <mt-cell  title="如何获得优惠券"  to="/help/card"  is-link  class="border-top"></mt-cell>
    <footer-component></footer-component>
  </div>
</template>
<script>
import {Cell} from 'mint-ui'
import Footer from './Footer'
export default {
  data() {
    return {

    }
  },
  components: {
    'mt-cell':Cell,
    'footer-component': Footer
  },
  created() {
    document.title = '逛逛-帮助中心'
  }
}
</script>
<style scoped lang="less">

</style>
