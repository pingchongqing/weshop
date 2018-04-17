<template>
  <div id="wrapper">
    <div class="cell">
      <input-component
        :title="'收货人'"
        :iclass="'top-input'"
        v-model="name"
        @BackValid="namebackValid"
        :isType = "'china-name'"
        required
        placeholder="请输入收货人姓名"></input-component>
    </div>
    <div class="cell">
      <input-component
        :title="'手机号'"
        :iclass="'top-input'"
        v-model="tel"
        @BackValid="telbackValid"
        :isType = "'china-mobile'"
        type="tel"
        required
        placeholder="请输入手机号"></input-component>
    </div>
    <div class="cell">
      <input-component
        :title="'邮政编码'"
        :iclass="'top-input'"
        v-model="zipCode"
        @BackValid="zipbackValid"
        :isType = "'zip-code'"
        type="tel"
        required
        placeholder="请输入邮政编码"></input-component>
    </div>
    <div class="cell">
      <input-component
        :title="'所在地区'"
        :iclass="'top-input'"
        v-model="areaName"
        readonly
        @click.native="areachoice"
        placeholder="选择所在区域"></input-component>
    </div>
    <div class="cell">
      <input-component
        :title="'详细地址'"
        :iclass="'top-input'"
        v-model="exactAddress"
        required
        placeholder="详细地址"></input-component>
    </div>
    <button class="registerbtn" @click="save">保存</button>
    <mt-popup
      v-model="areaChoiceShow"
      position="bottom">
      <div style="width:100vw">
        <div class="choicetool">
          <button class="confirmbutton" @click="checkdown">确定</button>
          <button class="cancelbutton" @click="areachoice">取消</button>
        </div>
        <mt-picker :slots="slots" @change="onValuesChange">
        </mt-picker>
      </div>
    </mt-popup>

  </div>
</template>
<script>
import {InputComponent} from 'components/common/formComponent'
import { Picker, Popup } from 'mint-ui'
import {HomeApi} from 'api'
import cityData from '@/assets/cityb.json'
export default {
  data() {
    return {
      name:'',
      tel:'',
      zipCode: '',
      exactAddress: '',
      areaName: '',
      isDefault: 0,
      areaChoiceShow: false,
      errors: {},
      slots:[
        {
          flex: 1,
          defaultIndex: 0,
          values: this.province(),  //省份数组
          className: 'slot1',
          textAlign: 'center',
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        },
        {
          divider: true,
          content: '-',
          className: 'slot4'
        },
        {
          flex: 1,
          values: [],
          className: 'slot5',
          textAlign: 'center'
        }
      ],
      myAddressProvince:'省',
      myAddressCity:'市',
      myAddresscounty:'区/县',
      isLoding: false
    }
  },
  components: {
    InputComponent,
    'mt-picker': Picker
  },
  computed: {
    addressid() {
      let id = '';
      cityData.map( p => {
        if (p.text === this.myAddressProvince) {
          p.children.map( c => {
            if (c.text === this.myAddressCity) {
              if (c.children.length) {
                c.children.map(d => {
                  if (d.text === this.myAddresscounty) {
                    id = d.value
                  }
                })
              } else {
                id = c.value
              }
            }
          })
        }
      })
      return id
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.slots[2].values = this.getCity('浙江省')
      this.slots[4].values = this.getArea('浙江省', '杭州市')
    })
    if(this.$route.query.addressId) {
      this.getAddressData(this.$route.query.addressId)
    }
  },
  methods: {
    namebackValid(val) {
      this.errors.name = val
    },
    zipbackValid(val) {
      this.errors.zip = val
    },
    telbackValid(val) {
      this.errors.tel = val
    },
    checkdown() {
      this.areaName = this.myAddressProvince + this.myAddressCity + this.myAddresscounty
      this.areaChoiceShow = false
    },
    areachoice() {
      this.areaChoiceShow = !this.areaChoiceShow
    },
    province() {
      let arr = []
      cityData.map(d => arr.push(d.text))
      return arr
    },
    getCity(province) {
      let arr = []
      cityData.map(d => {
        if (d.text === province) {
          d.children.map(c => arr.push(c.text))
        }
      })
      return arr
    },
    getArea(province,city) {
      let arr = []
      cityData.map(d => {
        if (d.text === province) {
          d.children.map(c => {
            if (c.text === city) {
              c.children.map(a => arr.push(a.text))
            }
          })
        }
      })
      return arr
    },
    save() {
      if (!this.name || !this.zipCode || !this.exactAddress || !this.areaName || !this.tel) {
        this.$toast('还要信息没有填哦')
        return
      } else if (Object.keys(this.errors).length) {
        for (let err in this.errors) {
          if (this.errors[err].format) {
            this.$toast(this.errors[err].format)
            return
          }
        }
      } else if (this.isLoding) {
        return
      }
      // 有则修改 无则新增
      this.isLoding = true
      if (this.$route.query.addressId) {
        HomeApi.UpdateAddress({
          "isDefault": this.isDefault,
          "streetAddress": this.exactAddress,
          "areaId": this.addressid,
          "phone": this.tel,
          "consignee": this.name,
          "zipCode": this.zipCode,
          "addressId":this.$route.query.addressId
        }).then(
          res => {
            this.isLoding = false
            console.log(res);
            if (res.data.resultCode === 1) {
              this.$toast('修改地址成功')
              this.$router.back()
            } else {
              // this.$router.push({
              //   name: 'login',
              //   query: {
              //     returnUrl: location.href
              //   }
              // })
              this.$toast(res.data.info)
            }
          },
          err => {
            console.log(err);
            this.isLoding = false
          }
        )
      } else {
        HomeApi.AddAdress({
          "isDefault": 0,
          "streetAddress": this.exactAddress,
          "areaId": this.addressid,
          "phone": this.tel,
          "consignee": this.name,
          "zipCode": this.zipCode
        }).then(
          res => {
            this.isLoding = false
            console.log(res);
            if (res.data.resultCode === 0) {
              this.$router.push({
                name: 'login',
                query: {
                  returnUrl: location.href
                }
              })
            } else if (res.data.resultCode === 1) {
              this.$toast('添加地址成功')
              this.$router.back()
            }
          },
          err => {
            this.isLoding = false
            console.log(err);
          }
        )
      }

		},
    onValuesChange(picker, values) {
        picker.setSlotValues(1, this.getCity(values[0]));
        picker.setSlotValues(2, this.getArea(values[0], values[1]));
        this.myAddressProvince = values[0];
        this.myAddressCity = values[1];
        this.myAddresscounty = values[2];
    },
    getAddressData(addressId) {
      HomeApi.GetDatabyAddressId(addressId).then(
        res => {
          console.log(res);
          if (res.data.statusCode === 200) {
            let data = res.data.viewVo
            this.name = data.consignee
            this.exactAddress = data.streetAddress
            this.tel = data.phone
            this.zipCode = data.zipCode
            this.isDefault = data.isDefault
            this.myAddressProvince = data.areAllName.split('->')[1]
            this.myAddressCity = data.areAllName.split('->')[2]
            this.myAddresscounty = data.areAllName.split('->')[3] || ''
            this.areaName = this.myAddressProvince + this.myAddressCity + this.myAddresscounty
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
<style>
.top-input {
  height: .5rem;
  width: 75%;
  background: none;
  border: none;
  z-index: 12;
}
.picker {
  width: 100%;
}
.slot1, .slot3, .slot5{
  width: 30% !important;
  overflow: hidden;
}
</style>
