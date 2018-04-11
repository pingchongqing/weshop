<template id="go-top">
  <div>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <a id="BackToTop" @click="goTop" v-show="goTopEnable"></a>
    </transition>
  </div>
</template>

<script>
export default {
  template: '#go-top',
  data () {
    return {
      goTopEnable: false,
      dom: null
    }
  },
  props: ['controlId'],
  mounted: function () {
    this.watchGoTop()
  },
  methods: {
    watchGoTop: function () {
      var self = this
      var doc = window
      if (self.controlId && self.$parent.$refs[self.controlId]) {
        self.dom = self.$parent.$refs[self.controlId]
        doc = self.dom
      }
      doc.addEventListener('scroll', function () {
        if (self.dom) {
          if (self.dom.scrollTop > 600) {
            self.goTopEnable = true
          } else {
            self.goTopEnable = false
          }
        } else {
          let scrollTop = document.body.scrollTop + document.documentElement.scrollTop
          if (scrollTop > 600) {
            self.goTopEnable = true
          } else {
            self.goTopEnable = false
          }
        }
      })
    },
    goTop: function () {
      var self = this
      if (!self.dom) {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      } else {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        self.dom.scrollTop = 0
      }
    }
  }
}
</script>

<style scoped>
  #BackToTop {
    z-index: 30 !important;
    right: .28rem;
    display: block;
    bottom: 2.3rem;
  }
</style>
