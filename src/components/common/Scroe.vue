<template>
<div class="scroewrap">
  <div class="star" :class="{active: scroeValue > 0}" @click="scroe(1)"></div>
  <div class="star" :class="{active: scroeValue > 1}" @click="scroe(2)" ></div>
  <div class="star" :class="{active: scroeValue > 2}" @click="scroe(3)" ></div>
  <div class="star" :class="{active: scroeValue > 3}" @click="scroe(4)" ></div>
  <div class="star" :class="{active: scroeValue > 4}" @click="scroe(5)" ></div>
</div>
</template>
<script>
export default {
  data() {
    return {
      scroeValue: 0
    }
  },
  props:['index'],
  methods: {
    scroe(n) {
      if (this.index || this.index === 0) {
        this.$emit('onScroe', n, this.index)
      } else {
        this.$emit('onScroe', n)
      }
      this.scroeValue = n
    }
  }
}
</script>
<style scoped lang="less">
.scroewrap {
  height: .4rem; padding: .15rem .2rem;
}
.star {
  width: .4rem;
  height: .4rem;
  background: url('~images/starky.png') no-repeat;
  background-size: .4rem;
  float: left;
  margin-right: .1rem;
}
.star.active{
  width: .4rem;
  height: .4rem;
  background: url('~images/starsy.png') no-repeat;
  background-size: .4rem;
}
</style>
