<template>
<div id="wrapper" :style="{minHeight: screenHight + 'px'}">
  <mt-cell  title="修改密码"  to="/mycenter/setting/modifypassword"  is-link  ></mt-cell>
  <mt-cell  title="关于我们"  to="/mycenter/setting/aboutus"  is-link  class="border-top"></mt-cell>
  <mt-cell  title="意见反馈"  to="/mycenter/setting/feedback"  is-link  class="border-top"></mt-cell>
  <button class="defaultconfirm" @click="logOut">退出</button>
  <footer-component></footer-component>
</div>
</template>
<script type="text/javascript">
import {Cell} from 'mint-ui'
import Footer from '../Footer'
import {HomeApi} from 'api'
export default {
  data() {
    return {
      screenHight: this.$getScreenHeight()
    }
  },
  components: {
    'mt-cell':Cell,
    'footer-component': Footer
  },
  created(){
    document.title = '逛逛-设置'
  },
  methods: {
    logOut() {
      HomeApi.LogOut().then(
        res => {
          if (res.data.resultCode === 1) {
            this.$router.push({name:'Index'})
          } else {
            this.$toast(res.data.info)
          }
        }
      )
    }
  }
}
</script>
