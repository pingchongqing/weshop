<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style src="mint-ui/lib/style.css"></style>
<style src="css/swiper.css" ></style>
<style>
/*返回顶部*/
#BackToTop { position:fixed; bottom:0.3rem; right:.06rem; padding:.24rem; background:url('~images/totop.png') center center no-repeat; width:.91rem; height:.91rem; background-size:.9rem; z-index:9; display:none; border-radius:100%; }

.index-top .index-search .top-input {
  width: 100%;
  background: none;
  border: none;
}
.index-top .weui-cells {
  position: absolute !important;
  top: .02rem;
  left: .7rem;
  width: 85%;
  z-index: 13;
  background: none !important;
}
.index-top .weui-cells:after, .cell .weui-cells:after{
  border-bottom: none !important;
}
.index-top .weui-cell:before,  .cell .weui-cell:before{
  border-top: none !important;
}
.empty {
  height: 3.5rem;
  margin-top: .3rem;
  background: url('~images/nores.png') no-repeat center;
  opacity: .45;
  position: relative;
  animation: nofadeIn 1s;
}
.empty span {
  text-align: center;
  display: block;
  position: absolute;
  bottom: 0rem;
  left: 50%;
  transform: translate(-50%, 0);
  color: #333;
}
button.defaultconfirm {
  height: 1rem;
  border-radius: .2rem;
  background: #ff2c55;
  color: #fff;
  font-size: .32rem;
  line-height: 1rem;
  text-align: center;
  margin: 2% 2%;
  width: 96%;
}
.default-color {
  color: #ff2c55;
}
.top-input {
  height: .5rem;
  width: 75%;
  background: none;
  border: none;
  z-index: 12;
}
</style>
