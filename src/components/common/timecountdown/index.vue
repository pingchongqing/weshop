<template>
  <span>{{currentTime}}秒</span>
</template>

<script>
export default {
  props: {
    value: Number,
    start: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.currentTime = this.time
    if (this.value) this.currentTime = this.value
  },
  filters:{
    timeFilter(time) {
      let seconds = time % 60
      let minutes = Math.floor(time / 60) % 60
      let hours = Math.floor(time / 60 / 60) % 24
      let days = Math.floor(time / 60 / 60 / 24)
      let weeks = Math.floor(time / 60 / 60 / 24 / 7)
      let months = Math.floor(time / 60 / 60 / 24 / 30)
      let years = Math.floor(time / 60 / 60 / 24 / 365)
      return minutes +'分' + seconds + '秒'
    }
  },
  methods: {
    tick () {
      let _this = this
      this.interval = setInterval(function () {
        if (_this.currentTime > 0) {
          _this.currentTime--
        } else {
          _this.stop()
          _this.index++
          _this.$emit('on-finish', _this.index)
        }
      }, 1000)
    },
    stop () {
      clearInterval(this.interval)
    }
  },
  watch: {
    value (val) {
      this.currentTime = val
    },
    currentTime (val) {
      this.$emit('input', val)
      this.$emit('on-trip', val)
    },
    start (newVal, oldVal) {
      if (newVal === true && oldVal === false && this.currentTime > 0) {
        this.tick()
      }
      if (newVal === false && oldVal === true) {
        this.stop()
      }
    }
  },
  mounted () {
    if (this.start) {
      this.tick()
    }
  },
  data () {
    return {
      interval: null,
      index: 0,
      currentTime: 60
    }
  }
}
</script>
