<template>
  <transition name="fed" appear enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">
    <div id="cart" v-show="cartnum" @click="nextPage"><div class="badge">{{cartnum}}</div></div>
  </transition>
</template>
<script>
import { HomeApi } from 'api/index'
export default {
  data() {
    return {
      cartnum: 0
    }
  },
  props: {
    addnum: {
      type: Number
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.$on('addcartnum', function(n) {
      this.cartnum = this.cartnum + n
    })
  },
  methods: {
    getData() {
      HomeApi.CarList().then(
        res => {
          if (res.data.resultCode === 1) {
            res.data.appShoppingCartList.forEach(item => {
              this.cartnum += item.stockNum
            })
          }
        },
        err => {
          console.log(err);
        }
      )
    },
    nextPage() {
      this.$router.push({
        name: 'cartList'
      })
    },
    doaddnum() {
      this.cartnum = this.cartnum + this.addnum
    }
  }
}
</script>
<style scoped lang="less">
#cart {
  width: 1rem;
  height: 1rem;
  position: fixed;
  right: .3rem;
  bottom: 1.8rem;
  z-index: 8;
  background: url('~images/cart.png') no-repeat;
  background-size: cover;
  border-radius: 50%;
  box-shadow: 0 0 5px #ccc;
  .badge {
    width: .3rem;
    height: .3rem;
    border-radius: 50%;
    background: #ff0000;
    line-height: .3rem;
    text-align: center;
    color: #fff;
    position: absolute;
    font-size: 10px;
    right: .1rem;
    top: .1rem;
  }
}
</style>
