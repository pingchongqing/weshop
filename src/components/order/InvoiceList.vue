<template>
  <div id="wrapper">
    <ul class="address-list">
      <li v-for="(invoice, index) in invoiceList" @click="checkInvoice(invoice)">
        <table style="width: 100%;">
          <tr>
            <td class="incheck">
              <div class="input-radio">
                <div class="forcheckbox" :class="{ed: invoice.id==checkedInvoice.id}" ></div>
                <input type="checkbox" :ref="'addresscheck'+index"  />
              </div>
            </td>
            <td class="p-30 border-bottom">
              <p class="px-30 f30 "><span class="color-999">发票类型:</span><span> {{invoice.titleType|titleTypeFilter}}</span></p>
              <p class="px-30 f30 "><span class="color-999">发票抬头:</span><span> {{invoice.invoiceTitle}}</span></p>
              <p class="px-30 f30" v-show="invoice.titleType!=2"><span class="color-999">注册地址: </span><span>{{invoice.registAddress}}</span></p>
              <p class="px-30 f30" v-show="invoice.titleType!=2"><span class="color-999">注册电话: </span><span>{{invoice.registTel}}</span></p>
              <p class="px-30 f30" v-show="invoice.titleType!=2"><span class="color-999">开户银行: </span><span>{{invoice.openBank}}</span></p>
              <p class="px-30 f30" v-show="invoice.titleType!=2"><span class="color-999">银行账号: </span><span>{{invoice.bankAccount}}</span></p>
              <p class="px-30 f30" v-show="invoice.titleType!=2"><span class="color-999">纳税人识别号: </span><span>{{invoice.taxpayerNo}}</span></p>
            </td>
          </tr>
        </table>
        <div class="address-tool">
          <div class="adrbtn edit fr" @click.stop="modifyInvoice(invoice)">编辑</div>
          <div class="adrbtn del fr" @click.stop="remove(invoice)">删除</div>
        </div>
      </li>
    </ul>
    <button class="defaultconfirm" @click="newInvoice">添加发票信息</button>
    <div class="incon" v-show="addinvoiceshow">
      <add-invoice @invoicesave="getresult" :editid="editid"></add-invoice>
    </div>
    <footerComponent ></footerComponent>
  </div>
</template>
<script>
import {HomeApi} from 'api'
import {mapState} from 'vuex'
import footerComponent from '../Footer'
import AddInvoice from './ModifyInvoice'
export default {
  data() {
    return {
      invoiceList: [],
      iStart: 1,
      limit: 10,
      from: {},
      addinvoiceshow: false,
      editid: '',
      isLoding: false
    }
  },
  components: {
    footerComponent,
    'add-invoice': AddInvoice
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
  computed: {
    ...mapState({
      checkedInvoice: state => state.checkedInvoice
    })
  },
  filters: {
    titleTypeFilter(val) {
      switch (parseInt(val)) {
        case 1:
          return '增值税专用发票'
          break;
        case 2:
          return '普通发票'
          break;
        case 3:
          return '增值税普通发票'
          break;
        default:

      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.from = from
    })
  },
  destroyed() {
    this.$indicator.close()
  },
  created() {
    this.getInvoiceList()
    document.title = '逛逛-发票信息'
  },
  methods: {
    getresult(val) {
      if (val) {
        this.addinvoiceshow = false
        this.getInvoiceList()
      }
    },
    newInvoice() {
      this.editid = ''
      this.addinvoiceshow = true
      // this.$router.push({
      //   name: 'modifyInvoice'
      // })
    },
    getInvoiceList(){
      this.isLoding = true
      HomeApi.GetInvoiceList({
        "iStart": this.iStart,
        "limit": this.limit
      }).then(
        res => {
          this.isLoding = false
          console.log(res);
          if (res.data.resultCode === 1) {
            this.invoiceList = res.data.pages.pageList
          } else if (res.data.resultCode === 0){
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
    modifyInvoice(invoice) {
      this.editid = invoice.id
      this.addinvoiceshow = true
      // this.$router.push({
      //   name: 'modifyInvoice',
      //   query: {
      //     invoiceId: invoice.id
      //   }
      // })
    },
    setDefault(invoice) {

    },
    checkInvoice(invoice) {
      if(this.from.name === 'order') {
        this.$store.commit('setcheckInvoice', invoice)
        this.$router.push({
          name: this.from.name,
          query: this.from.query,
          params: this.from.params
        })
      }
    },
    remove(invoice) {
      this.$messagebox({
        title: '提示',
        message:  '确定删除此发票信息吗?',
        showCancelButton: true
      }).then( action => {
        if( action === 'confirm') {
          HomeApi.Delinvoice({id: invoice.id}).then(
            res => {
              console.log(res);
              if (res.data.resultCode === 1) {
                this.getInvoiceList()
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
.incon {
  z-index:100;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #f7f7f7;
  overflow-x: hidden;
  overflow-y: auto;
  display: block
}
.incheck {
  width: 10%;
  padding-left: .3rem;
}
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
      height: .6rem;
      line-height: .6rem;
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
