<template>
  <div class="iframe-container">
    <iframe :style="{height: mHeight + 'px'}"
      id="myiframe" :src="iframesrc" width="100%" frameborder="0"></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      typename: this.$route.query.logisticsCom,
      postid: this.$route.query.logisticsNu,
      mHeight: this.$getScreenHeight() - 44
    }
  },
  computed: {
    iframesrc() {
      return `http://m.kuaidi100.com/index_all.html?type=${this.typename}&postid=${this.postid}#result`
    }
  }
}
</script>
