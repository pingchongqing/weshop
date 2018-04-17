<template>
<div id="wrapper" :style="{minHeight: screenHight + 'px'}">
  <div class="cartbox" v-for="(cart, index) in showList" :key="cart.saleCustId" v-if="showList.length">
    <div class="sellerinfo border-bottom">
      <div class="input-radio mt-25">
        <div class="forcheckbox" @click="maincheckClick(index, cart.saleCustId)" :class="{ed: cart.checked}"></div>
        <input type="checkbox" :ref="'maincheck'+index"  />
      </div>
      <div class="custname f30">{{cart.saleCustName}}</div>
    </div>
    <ul>
      <li v-for="(item, subindex) in cart.list" :key="item.tradeId" >
        <div class="input-radio mt-60">
          <div class="forcheckbox" @click="subcheckClick(index, subindex, item.tradeId)" :class="{ed: item.checked}"></div>
          <input type="checkbox" :ref="'subcheck'+index+subindex" />
        </div>
        <div class="cartimg">
          <img src="~images/listpic.jpg" />
        </div>
        <div class="goodsinfo">
          <div class="goodstitle">{{item.productName}}</div>
          <div class="goodsprice">
            <span class="f32">￥{{item.productPrice}}</span>
            <div class="numcontroller">
              <div class="tool sub" @click="modifyNum('sub',index, subindex, item)"></div>
              <input type="number" class="border-bottom color-666 f32" :value="item.stockNum"  />
              <div class="tool add" @click="modifyNum('add', index, subindex, item)"></div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="empty" v-show="showList.length===0 && logstatus"><span>购物车空空如也~</span></div>
  <div class="p-30" v-show="!logstatus && !isLoding"><button class="defaultconfirm" @click="gologin">去登录</button></div>
  <!-- 精品推荐开始 -->
  <div id="link4">
    <commend></commend>
  </div>
  <!-- 精品推荐结束 -->
  <div style="height: 1rem"></div>
  <div class="balance pl-30" v-show="cartList.length">
    <div class="input-radio mt-30">
      <div class="forcheckbox" @click="allcheck" :class="{ed: allchecked}"></div>
      <input type="checkbox" :ref="'maincheckall'"  />
    </div>
    <span>全选</span>
    <div class="balance-button" :class="{dis: !bechecked}" @click="balance">结算<span v-show="bechecked">({{bechecked}})</span></div>
    <div class="sum">合计：<span>￥{{sum}}</span></div>
  </div>
  <footerComponent :active="'buycar'"></footerComponent>
</div>
</template>
<script>
import { HomeApi } from 'api/index'
import footerComponent from './Footer'
import commend from 'components/common/Commend'
export default {
  data() {
    return {
      cartList: [],
      screenHight: this.$getScreenHeight(),
      logstatus: false,
      isLoding: false
    }
  },
  components: {
    footerComponent,
    commend
  },
  computed: {
    // 处理列表数据，将相同卖家数据合并
    showList() {
      let list = []
      let norepeat = []
      this.cartList.forEach(cart => {
        norepeat = this.cartList.filter(item => item.saleCustId === cart.saleCustId)
        let outdata = {
          saleCustId: cart.saleCustId,
          saleCustName: cart.saleCustName,
          list: norepeat
        }
        let checked = false
        norepeat.map(nr => {
          if(nr.checked) {
            checked = true
          }
        })
        if (checked) {outdata.checked = true} else {
          outdata.checked = false
        }
        list.push(outdata)
      })
      let nlist = []
      list.forEach(item => {
        nlist.push(JSON.stringify(item))
      })
      nlist = [...new Set(nlist)];
      let blist = []
      nlist.forEach(item => {
        blist.push(JSON.parse(item))
      })
      return blist
    },
    // 计算购物车中有几项被选中
    bechecked() {
      return this.cartList.filter(item => item.checked).length
    },
    // 计算选中商品的价格
    sum() {
      let sum = 0
      this.cartList.map(item => {
        if (item.checked) {
          sum += item.stockPrice * item.stockNum
        }
      })
      return parseInt(sum*10000)/10000
    },
    // 是否全部选中
    allchecked() {
      let result = true
      this.cartList.map(item => {
        if (!item.checked) {
          result = false
        }
      })
      return result
    }
  },
  created() {
    this.getCartList()
    document.title = '逛逛-购物车'
  },
  methods: {
    gologin() {
      this.$router.push({
        name: 'login',
        query: {
          returnUrl: this.$route.path
        }
      })
    },
    getImgPath(path) {
      if (!path) {
        return require('../assets/images/default.png')
      }
      return path
    },
    getCartList() {
      this.isLoding = true
      HomeApi.CarList().then(
        res => {
          console.log(res);
          this.isLoding = false
          if (res.data.resultCode === 1) {
            this.logstatus = true
            this.cartList = res.data.appShoppingCartList
          } else if (res.data.resultCode === 3 && res.data.info === '未登录') {
            this.$messagebox({
              title:'提示',
              message: '当前页面需要登录!',
              showCancelButton: true,
              cancelButtonText: '返回',
              confirmButtonText: '去登录'
            }).then(action => {
              if (action === 'confirm') {
                this.$router.push({
                  name: 'login',
                  query: {
                    returnUrl: this.$route.path
                  }
                })
              } else if (action === 'cancel') {
                this.$router.back()
              }
            })
          } else {
            this.logstatus = true
            this.cartList = []
          }
        },
        err => {
          console.log(err);
          this.isLoding = false
        }
      )
    },
    maincheckClick(index, id) {
      let target = this.$refs['maincheck'+index][0]
      target.checked = !target.checked
      this.cartList.map(item => {
        if (item.saleCustId === id) {
          item.checked = target.checked
        }
      })
      this.cartList = JSON.parse(JSON.stringify(this.cartList))
    },
    allcheck() {
      let target = this.$refs['maincheckall']
      if (this.allchecked) {
        this.cartList.map(item => {
          item.checked = false
        })
      } else {
        this.cartList.map(item => {
          item.checked = true
        })
      }
      target.checked = !target.checked
      this.cartList = JSON.parse(JSON.stringify(this.cartList))
    },
    subcheckClick(index, subindex, id) {
      let target = this.$refs['subcheck'+index+''+subindex][0]
      target.checked = !target.checked
      this.cartList.map(item => {
        if (item.tradeId === id) {
          item.checked = !item.checked
        }
      })
      this.cartList = JSON.parse(JSON.stringify(this.cartList))
    },
    modifyNum(type, index, subindex, item) {
      let num = item.stockNum
      if (type === 'add') {
        num++
      } else if (type === 'sub') {
        num--
      }
      if (num === 0) {
        this.$messagebox({
          title: '提示',
          message: '确定从购物车删除吗？',
          showCancelButton: true
        }).then(
          action => {
            if (action === 'confirm') {
              this.removeProduct(item.tradeId)
            }
            console.log(action);
          }
        )
      } else if (num > item.productNum) {
        num = item.stockNum
      } else {
        HomeApi.ModifyProductNum({tradeId: item.tradeId, stockNum: num}).then(
          res => {
            console.log(res);
            if (res.data.resultCode === 1) {
              this.cartList.map( cart => {
                if (cart.tradeId === item.tradeId) {
                  cart.stockNum = num
                }
              })
              this.cartList = JSON.parse(JSON.stringify(this.cartList))
            }
          },
          err => {
            console.log(err);
          }
        )
      }
    },
    removeProduct(id) {
      HomeApi.RemoveProduct({tradeId: id}).then(
        res => {
          console.log(res);
          if (res.data.resultCode === 1){
            this.$toast(res.data.info)
          }
          let nlist = this.cartList.filter(item => item.tradeId != id)
          this.cartList = JSON.parse(JSON.stringify(nlist))
        },
        err => {
          console.log(err);
        }
      )
    },
    // 结算
    balance() {
      if (!this.bechecked) {
        this.$toast('请先选中宝贝!')
        return
      }
      let cartParam = ''
      this.cartList.map(item => {
        if (item.checked) {
          if (cartParam === '') {
            cartParam = item.tradeId + ',' + item.stockNum
          } else {
            cartParam += '@' + item.tradeId + ',' + item.stockNum
          }
        }
      })
      this.$router.push({
        name: 'order',
        query: {
          stockType: 1,
          cartParam: cartParam
        }
      })

    }
  }
}
</script>
<style scoped lang="less">
.mt-25 {
  margin-top:.25rem;
}
.mt-60 {
  margin-top: .60rem;
}
.balance {
    height: 1rem;
    position: fixed;
    bottom: 1.2rem;
    width: 100%;
    background: #fff;
    font-size: .32rem;
    span {
      line-height: 1rem;
    }
    .sum {
      float: right;
      line-height: 1rem;
      padding-right: .3rem;
      span {
        color: #ff2c55;
      }
    }
    .balance-button {
      float: right;
      background: #ff2c55;
      line-height: 1rem;
      color: #fff;
      padding: 0 .3rem;
      &.dis {
        background: #ccc;
      }
    }
}

.cartbox {
  background: #fff;
  margin-bottom: .2rem;
  .sellerinfo {
    padding: 0 .3rem;
    height: .9rem;
    .custname {
      line-height: .9rem;
      background: url('~images/Icon/shop.png') left center no-repeat;
      background-size: .5rem;
      float: left;
      margin-left: .2rem;
      text-indent: .6rem;
    }
  }
  ul {
    padding: .3rem .3rem .3rem .6rem;
    li {
      height: 1.6rem;
      margin-bottom: .3rem;
      .cartimg {
        height: 1.6rem;
        width: 1.6rem;
        overflow: hidden;
        float: left;
        margin-left: .2rem;
        margin-right: .2rem;
        border-radius: .2rem;
        img {
          height: 100%;
        }
      }
      .goodsinfo {
        .goodsprice {
          color:#ff2c55;
          margin-top: .2rem;
          height: 1rem;
          line-height:1rem;
          .numcontroller {
            width: 2.6rem;
            margin-top: .3rem;
            float: right;
            input {
              width: 1rem;
              float: left;
              border-width: 1px;
              border-top: none;
              border-right: none;
              border-left: none;
              margin: 0 .1rem;
              text-align: center;
            }
            .tool {
              width: .45rem;
              height: .45rem;
              float: left;
              border-radius: 50%;
            }
            .sub {
              background: url('~images/ch_redu.png') no-repeat center;
              background-size: .3rem;
              border: #666 1px solid;
            }
            .sub-disable {
              background: url('~images/ch_redu_hov.png') no-repeat center;
              background-size: .3rem;
              border: #ccc 1px solid;
            }
            .add {
              background: url('~images/ch_add.png') no-repeat center;
              background-size: .3rem;
              border: #666 1px solid;
            }
            .add-disable {
              background: url('~images/ch_add_hov.png') no-repeat center;
              background-size: .3rem;
              border: #ccc 1px solid;
            }
          }
        }
      }
    }
  }
}
.input-radio {
  position: relative;
  width: .4rem;
  height: .4rem;
  float: left;
  .forcheckbox {
    position: absolute;
    z-index: 6;
    background: url('~images/Icon/check.png') no-repeat;
    background-size: cover;
    width: .4rem;
    height: .4rem;
    transition: background .3s;
  }
  .ed {
    background: url('~images/Icon/checked.png') no-repeat;
    background-size: cover;
  }
  input[type="checkbox"]{
    opacity: .01;
  }
}
</style>
