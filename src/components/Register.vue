<template>
  <div id="wrapper">
    <div class="cell">
      <input-component
        :title="'登录名'"
        :iclass="'top-input'"
        v-model="user"
        placeholder="由数字和字母组成的6-20位字符"></input-component>
    </div>
    <div class="cell">
      <input-component
        :title="'手机号'"
        :iclass="'top-input'"
        v-model="tel"
        placeholder="请输入手机号"></input-component>
    </div>
    <div class="cell">
      <div class="inputname">
        <input-component
          :title="'验证码'"
          :iclass="'top-input'"
          v-model="indentifying"
          placeholder="请输入图片验证码"></input-component>
      </div>
      <div class="code">
        <img :src="codepath" @click="changeCode" />
      </div>
    </div>
    <div class="cell">
      <div class="inputname">
        <input-component
          :title="'短信验证码'"
          :iclass="'top-input'"
          v-model="telcode"
          placeholder="请输入短信验证码"></input-component>
      </div>
      <div class="code">
        <button class="telcode" :class="{act: indentifying && tel}" @click="getTelCode">取验证码</button>
      </div>
    </div>
    <div class="cell">
      <input-component
        :title="'设置密码'"
        :iclass="'top-input'"
        :type="'password'"
        v-model="password"
        placeholder="请输入密码"></input-component>
    </div>
    <div class="cell">
      <input-component
        :title="'确认密码'"
        :type="'password'"
        :iclass="'top-input'"
        v-model="repassword"
        placeholder="请再次输入密码"></input-component>
    </div>
    <button class="registerbtn" @click="rigster">注册</button>
  </div>
</template>
<script>
import {InputComponent} from 'components/common/formComponent'
import {HomeApi} from 'api'
export default {
  data() {
    return {
      user:'',
      tel:'',
      codepath: '',
      telcode: '',
      indentifying: '',
      password: '',
      repassword: ''
    }
  },
  components: {
    InputComponent
  },
  mounted() {
    this.changeCode()
  },
  methods: {
    changeCode() {
      this.codepath = '/checkImage?type=login&data=' + Math.random()
    },
    rigster() {
			if(/[\u4E00-\u9FA5]/i.test(this.user)) {
        this.$toast('用户名不可输入中文')
				return false;
			}
			if((/[\ud800-\udbff][\udc00-\udfff]/g.test(this.user))) {
        this.$toast('用户名不能输入表情')
				return false;
			}
			if(!this.user) {
				this.$toast('请输入用户名')
				return false;
			}
			if(this.user.length < 6) {
				this.$toast("登录名至少6个字符");
				return false;
			}
			if(!this.tel) {
				this.$toast("手机号不可以为空");
				return false;
			}
			if(this.tel.length != 11) {
				this.$toast("请输入11位的手机号码！");
				return false;
			}
			if(!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.tel)) {
				this.$toast("请输入正确的手机号码！");
				return false;
			}
			if(!this.indentifying) {
				mui.toast("验证码不能为空");
				return false;
			}
			if(!this.telcode) {
				this.$toast("短信验证码不能为空");
				return false;
			}

			if(!this.password) {
				this.$toast("密码不可以为空！");
				return false;
			}
			if(this.password.length < 6) {
				this.$toast("密码至少6个字符");
				return false;
			}

			if(!this.repassword) {
				this.$toast("确认密码不可以为空！");
				return false;
			}
			if(this.repassword.length < 6) {
				this.$toast("密码至少6个字符");
				return false;
			}
			if(this.password != this.repassword) {
				mui.toast("两次密码输入不一致");
				return false;
			}

			var loginData = {
				userName: this.user,
				password: this.password,
				cellphone: this.tel,
				image: this.indentifying,
				identifyingCode: this.telcode
			}
      HomeApi.Regiter(loginData).then(
        res => {
          console.log(res);
          if (res.data.resultCode === 1) {
            this.$messagebox('注册成功，请登录').then(action => {
              this.$router.push({
                name: 'login'
              })
            })
          } else {
            this.$messagebox({
              title: '提示',
              message: res.data.info
            })
          }
        },
        err => {
          console.log(err);
        }
      )
		},
    getTelCode() {
      if(!this.tel) {
        this.$toast("手机号不可以为空");
        return false;
      }
      if(this.tel.length != 11) {
        this.$toast("请输入11位的手机号码！");
        return false;
      }
      if(!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.tel)) {
        this.$toast("请输入正确的手机号码！");
        return false;
      }
      if(!this.indentifying) {
        mui.toast("验证码不能为空");
        return false;
      }
      HomeApi.SmsCode({cellphone:this.tel,image:this.indentifying}).then(
        res => {
          console.log(res);
          if (res.data.resultCode === 1) {
            this.telcode = res.data.code
          } else {
            this.$toast(res.data.info)
          }
        },
        err => {
          console.log(err);
        }
      )
    }
  }
}
</script>
<style scoped lang="less">
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
</style>
