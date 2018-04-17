<template>
<div id="wrapper">
  <div class="empty">
    <span>暂无优惠券</span>
  </div>
  <footerComponent ></footerComponent>
</div>
</template>
<script type="text/javascript">
import footerComponent from '../Footer'
export default {
  data() {
    return {

    }
  },
  components: {
    footerComponent,
  },
  created() {
    document.title = '逛逛-我的优惠券'
  }
}
</script>
