<template>
<transition leave-active-class="animated fadeOutLeft" enter-active-class="animated fadeInRight">
  <div id="wrapper">
    <mt-cell  title="修改密码"  to="/mycenter/setting/modifypassword"  is-link  ></mt-cell>
    <mt-cell  title="关于我们"  to="/mycenter/setting/aboutus"  is-link  class="border-top"></mt-cell>
    <mt-cell  title="意见反馈"  to="/mycenter/setting/feedback"  is-link  class="border-top"></mt-cell>
    <button class="defaultconfirm">退出</button>
    <footer-component></footer-component>
  </div>
</transition>
</template>
<script type="text/javascript">
import {Cell} from 'mint-ui'
import Footer from '../Footer'
export default {
  data() {
    return {

    }
  },
  components: {
    'mt-cell':Cell,
    'footer-component': Footer
  }
}
</script>
