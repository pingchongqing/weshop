<template>
  <div id="wrapper">
    <div class="cell">
      <div class="px-30 f30 pt-30">请选择发票类型</div>
      <mt-radio
        v-model="invoiceType"
        :options="options">
      </mt-radio>
    </div>
    <div class="cell">
      <input-component
        :title="'发票抬头'"
        :iclass="'top-input'"
        v-model="invoiceTitle"
        required
        placeholder="请输入发票抬头"></input-component>
    </div>
    <div class="cell" v-show="invoiceType==1||invoiceType==3">
      <input-component
        :title="'纳税人识别号'"
        :iclass="'top-input'"
        v-model="taxpayerNo"
        required
        placeholder="请输入纳税人识别号"></input-component>
    </div>
    <div class="cell" v-show="invoiceType==1||invoiceType==3">
      <input-component
        :title="'注册地址'"
        :iclass="'top-input'"
        v-model="registAddress"
        required
        placeholder="请输入注册地址"></input-component>
    </div>
    <div class="cell" v-show="invoiceType==1||invoiceType==3">
      <input-component
        :title="'注册电话'"
        :iclass="'top-input'"
        v-model="registTel"
        required
        placeholder="请输入注册电话"></input-component>
    </div>
    <div class="cell" v-show="invoiceType==1||invoiceType==3">
      <input-component
        :title="'开户银行'"
        :iclass="'top-input'"
        v-model="openBank"
        required
        placeholder="请输入开户银行"></input-component>
    </div>
    <div class="cell" v-show="invoiceType==1||invoiceType==3">
      <input-component
        :title="'银行帐户'"
        :iclass="'top-input'"
        v-model="bankAccount"
        required
        placeholder="请输入银行帐户"></input-component>
    </div>
    <button class="registerbtn" @click="save">确定</button>
  </div>
</template>
<script type="text/javascript">
import {HomeApi} from 'api'
import {InputComponent} from 'components/common/formComponent'
import { Radio } from 'mint-ui';
export default {
  data() {
    return {
      invoiceType: '2',
      taxpayerNo:'',
      registAddress: '',
      registTel:'',
      openBank:'',
      bankAccount:'',
      options: [
        {
          label: '普通发票',
          value: '2',
        },
        {
          label: '增值税普通发票',
          value: '3',
        },
        {
          label: '增值税专用发票',
          value: '1'
        },
      ],
      invoiceTitle: ''
    }
  },
  components: {
    'input-component':InputComponent,
    'mt-radio':Radio
  },
  created() {
    if(this.$route.query.invoiceId) {
      this.getInvoiceData(this.$route.query.invoiceId)
    }
  },
  methods: {
    save() {
      let params = {
        titleType: this.invoiceType,
        invoiceTitle: this.invoiceTitle
      }
      let subparams = {
        registAddress: this.registAddress,
        registTel: this.registTel,
        openBank: this.openBank,
        bankAccount: this.bankAccount,
        taxpayerNo: this.taxpayerNo
      }
      if (this.invoiceType == '3' || this.invoiceType == '1') {
        params = Object.assign(subparams, params)
      }
      for (let p in params) {
        if (params[p]=='') {
          this.$toast('请将发票信息补充完整')
          return false
        }
      }
      let fun = 'Addinvoice'
      if (this.$route.query.invoiceId) {
        fun = 'UpdateInvoice'
        params.id = this.$route.query.invoiceId
      }
      HomeApi[fun](params).then(
        res => {
          console.log(res);
          if (res.data.resultCode === 1) {
            this.$router.push({
              name: 'invoiceList'
            })
          }
        }
      )
    },
    getInvoiceData(invoiceId) {
      HomeApi.InvoiceDetail(invoiceId).then(
        res => {
          console.log(res);
          if (res.data.resultCode === 1) {
            let data = res.data.viewVo
            this.invoiceType = data.titleType
            this.taxpayerNo = data.taxpayerNo
            this.registAddress = data.registAddress
            this.registTel = data.registTel
            this.openBank = data.openBank
            this.bankAccount = data.bankAccount
            this.invoiceTitle = data.invoiceTitle
          } else {
            this.$toast(res.data.info)
          }
        }
      )
    }
  }
}
</script>
<style scoped lang="less">
.confirmbutton {
  background: #ff2c55;
  border-radius: .1rem;
  color: #fff;
  float: right;
  padding: .1rem .2rem;
  margin:.1rem;
}
.cancelbutton {
  background: #ccc;
  border-radius: .1rem;
  color: #fff;
  float: right;
  padding: .1rem .2rem;
  margin:.1rem;
}
.cell {
  background: #fff;
  border-bottom: #dfdfdf 1px solid;
  padding: .1rem 0;
  position: relative;
  .code {
    width: 20%;
    position: absolute;
    right: 0;
    top: .2rem;
  }
  .inputname{
    width: 80%;
  }
  .telcode.act {
    background: #ff0000;
  }
  .telcode {
    border-radius: .1rem;
    background: #ccc;
    color: #fff;
    line-height:  .6rem;
    margin-top: -.1rem;
  }
}
.registerbtn {
  height: .8rem;
  width: 96%;
  background: #ff2c55;
  color: #fff;
  border-radius: .1rem;
  line-height: .8rem;
  font-size: .32rem;
  margin-top: .5rem;
  margin-left: 2%;
}
</style>
