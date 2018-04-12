<template lang="html">
  <div class="screencenter">
    <img src="~images/comingsoon.jpg" />
    <footer-component></footer-component>
  </div>
</template>

<script>
import Footer from '../Footer'
export default {
  components: {
    'footer-component': Footer
  }
}
</script>

<style lang="less">
.screencenter {
  width: 100vw;
  height: 100vh;
  background: #fff;
  text-align: center;
  padding-top: 2.5rem;
  img{
    width: 100%;
  }
}
</style>
