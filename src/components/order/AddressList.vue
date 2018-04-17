<template>
  <div id="wrapper">
    <ul class="address-list">
      <li v-for="(address, index) in addressList" @click="checkAddress(address)">
        <p class="px-30 f30"><span>{{address.consignee}}</span><span class="fr">{{address.phone}}</span></p>
        <p class="px-30 border-bottom">{{address.areaName|areaNameFilter}}{{address.streetAddress}}</p>
        <div class="address-tool">
          <div class="input-radio mt-25">
            <div class="forcheckbox" :class="{ed: address.isDefault==0}" @click.stop="setDefault(address)"></div>
            <input type="checkbox" :ref="'addresscheck'+index"  />
          </div>
          <div class="mraddress f30">默认地址</div>
          <div class="adrbtn edit fr" @click.stop="modifyAddress(address)">编辑</div>
          <div class="adrbtn del fr" @click.stop="removeAddress(address)">删除</div>
        </div>
      </li>
    </ul>
    <router-link :to="{ name: 'modifyAddress'}">
      <button class="defaultconfirm">添加新地址</button>
    </router-link>
  </div>
</template>
<script>
import {HomeApi} from 'api'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      addressList: [],
      iStart: 1,
      limit: 10,
      from: {},
      isLoding: false
    }
  },
  watch: {
    isLoding (val) {
      let inTimer
      if (val) {
        clearTimeout(inTimer)
        this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
      } else {
        inTimer = setTimeout(this.$indicator.close, 500)
      }
    },
  },
  computed:{
    ...mapState({
      appAddressParam: state => state.checkAddress
    })
  },
  filters: {
    areaNameFilter(str) {
      if (str)
        return str.split('->').join(' ').replace(/中国/g, '')
      return ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.from = from
    })
  },
  created() {
    this.getAddressList()
    document.title = '逛逛-收货地址'
  },
  methods: {
    getAddressList(){
      this.isLoding = true
      HomeApi.AddressList({
        "iStart": this.iStart,
        "limit": this.limit
      }).then(
        res => {
          this.isLoding = false
          console.log(res);
          if (res.data.resultCode === 1) {
            this.addressList = res.data.pages.pageList
          } else {
            this.$router.push({
              name: 'login',
              query: {
                returnUrl: this.$route.path
              }
            })
          }
        },
        err => {
          this.isLoding = false
        }
      )
    },
    modifyAddress(addr) {
      this.$router.push({
        name: 'modifyAddress',
        query: {
          addressId: addr.addressId
        }
      })
    },
    setDefault(addr) {
      if (addr.isDefault == 1) {
        HomeApi.UpdateAddressDefault({addressId:addr.addressId}).then(
          res => {
            console.log(res);
            if (res.data.resultCode === 1) {
              // this.$router.go(0)
              this.addressList.map(a => {
                a.isDefault = 1
                if (a.addressId === addr.addressId) {
                  a.isDefault = 0
                }
              })
              this.addressList = JSON.parse(JSON.stringify(this.addressList))
            } else {
              this.$toast(res.data.info)
            }
          }
        )
      }
    },
    checkAddress(addr) {
      this.$store.commit('setCheckAddress', addr)
      this.$router.push({name: this.from.name, query: this.from.query})
    },
    removeAddress(addr) {
      this.$messagebox({
        title: '提示',
        message: '确定删除该地址吗?',
        showCancelButton: true
      }).then(action => {
        if( action==='confirm' ) {
          HomeApi.RemoveAddress({addressId: addr.addressId}).then(
            res => {
              console.log(res);
              if (res.data.resultCode === 1) {
                this.addressList = this.addressList.filter(a=> a.addressId != addr.addressId)
                // 如果订单选中的地址被删除
                if (this.appAddressParam.addressId === addr.addressId) {
                  this.$store.commit('setCheckAddress', {})
                }
              } else {
                this.$toast(res.data.info)
              }
            }
          )
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.address-tool {
  height: .8rem;
  padding: .2rem .3rem;
}
.mraddress {
  margin-left: .2rem;
  float: left;
  line-height: .4rem;
}
.adrbtn {
  padding: 0 .2rem .2rem .4rem;
  height: .4rem;
  line-height: .4rem;
}
.edit {
  background: url('~images/edit.png') no-repeat left center;
  background-size: .4rem;
}
.del {
  background: url('~images/del.png') no-repeat left center;
  background-size: .4rem;
}
.address-list{

  li {
    margin-bottom: .2rem;
    background: #fff;
    p {
      height: .8rem;
      line-height: .8rem;
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
