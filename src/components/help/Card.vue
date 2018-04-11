<template>
  <div id="wrapper">
    <h3>如何获得优惠券</h3>
    <p>平台业务操作及单据信息的查询、跟踪和管理，内容包括订单操作、物流跟踪、支付结算、供应链金融支持等。平台使用者要求为川山甲注册会员。</p>
    <p>为平台合作伙伴所搭建的业务操作平台，内容包括“增值服务推受理和推广、业务管理、大数据服务“等。平台使用者为川山甲签约合作伙伴。</p>
    <p>针对平台会员提供信息撮合、商品交易、结算优化等服务，平台使用者要求为川山甲注册会员，供需双方资质需经平台方审核，封闭式运作。</p>
    <footer-component></footer-component>
  </div>
</template>
<script>
import Footer from '../Footer'
export default {
  data() {
    return {

    }
  },
  components: {
    'footer-component': Footer
  }
}
</script>
<style lang="less" scoped>
h3 {
  padding: .3rem;
  font-size: .3rem;
  text-align: center;
}
p {
  padding: .1rem .3rem;
}
</style>
