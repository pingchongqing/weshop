<template>
  <transition enter-active-class="fadeInRight animated" leave-active-class="fadeOutLeft animated">
    <div class="login" :style="{minHeight: screenHight + 'px'}">
      <div class="logo">
        <img src="~images/logo.png" />
      </div>
      <div class="formbox">
        <div class="inputbox">
          <div class="icon user"></div>
          <div class="inputname">
            <input-component
              :iclass="'top-input'"
              v-model="user"
              placeholder="请输入用户名"></input-component>
          </div>
        </div>
        <div class="inputbox">
          <div class="icon password"></div>
          <div class="inputname">
            <input-component
              :iclass="'top-input'"
              :type="'password'"
              v-model="password"
              placeholder="请输入密码"></input-component>
          </div>
        </div>
        <div class="inputbox">
          <div class="icon indentifying"></div>
          <div class="inputname">
            <input-component
              :iclass="'top-input'"
              :type="'number'"
              v-model="indentifying"
              placeholder="请输入验证码"></input-component>
          </div>
          <div class="code">
            <img :src="codepath" @click="changeCode" />
          </div>
        </div>
        <button class="loginbtn" @click="login">立即登录</button>
        <button class="registerbtn" @click="register">注册</button>
      </div>
    </div>
  </transition>
</template>
<script>
import {InputComponent} from 'components/common/formComponent'
import { HomeApi } from '../api/index'
export default {
  data() {
    return {
      user: '',
      password: '',
      indentifying: '',
      codepath: '',
      returnUrl: this.$route.query.returnUrl ? encodeURIComponent(this.$route.query.returnUrl) : '',
      screenHight: this.$getScreenHeight()
    }
  },
  components: {
    InputComponent
  },
  mounted() {
    this.$indicator.close()
    this.changeCode()
  },
  methods: {
    // 改变验证码
    changeCode() {
      this.codepath = '/checkImage?type=login&data=' + Math.random()
    },
    //验证用户登录
    checkLogin() {
      if((/[\ud800-\udbff][\udc00-\udfff]/g.test(this.user))) {
        this.$toast("用户名不能输入表情");
        return false;
      }
      if(!this.user) {
        this.$toast("用户名不可以为空");
        return false;
      }
      if(this.user.length < 6) {
        this.$toast("用户名至少为6个字符");
        return false;
      }
      if(!this.password) {
        this.$toast("密码不可以为空！");
        return false;
      }
      if(this.password.length < 6) {
        this.$toast("密码至少为6个字符");
        return false;
      }

      if(!this.indentifying) {
        this.$toast("验证码不可以为空！");
        return false;
      }
      return true;
    },
    // 用户登录
    login() {
      if (this.checkLogin()) {
        HomeApi.Login({userName: this.user, secretCode: this.password, identifyingCode: this.indentifying}).then(
          res => {
            console.log(res);
            if (parseInt(res.data.resultCode) === 1) {
              if (this.returnUrl) {
                location.href = decodeURIComponent(this.returnUrl)
              } else {
                this.$router.push({
                  name: 'mycenter'
                })
              }
            } else {
              this.$toast(res.data.info)
              this.changeCode()
            }
          },
          err => {
            console.log(err);
            this.changeCode()
          }
        )
      }

    },
    register() {
      this.$router.push({
        name: 'register'
      })
    }
  }
}
</script>
<style scoped lang="less">
.login {
  width: 100vw;
  height: 100vh;
  background: url('~images/loginbg.png') no-repeat #fff;
  background-size: cover;
  max-width: 768px;
  margin: 0 auto;
}
.logo {
  height: 168px;
  text-align: center;
  padding-top: 1.5rem;
  img {
    width: 30%;
  }
}
.formbox {
  padding: .3rem 1rem;
  margin-top: 1.5rem;
  .loginbtn {
    height: .8rem;
    width: 100%;
    background: #ff2c55;
    color: #fff;
    border-radius: .1rem;
    line-height: .8rem;
    font-size: .32rem;
    margin-top: 1rem;
  }
  .registerbtn {
    height: .8rem;
    width: 100%;
    background: #dfbd76;
    color: #fff;
    border-radius: .1rem;
    line-height: .8rem;
    font-size: .32rem;
    margin-top: .1rem;
  }
  .inputbox {
    height: .8rem;
    margin: .3rem 0;
    overflow: hidden;
    position: relative;
  }
  .inputname{
    width: 85%;
  }
  .code {
    width: 20%;
    position: absolute;
    right: 0;
    top: .1rem;
  }
  .icon {
    width: 15%;
    height: 100%;
    float: left;
  }
  .user {
    background: url('~images/name.png') no-repeat;
    background-size: 80%;
  }
  .password {
    background: url('~images/password.png') no-repeat;
    background-size: 80%;
  }
  .indentifying {
    background: url('~images/yzm.png') no-repeat;
    background-size: 80%;
  }
}
</style>
<style>
.inputbox .top-input {
  height: .5rem;
  width: 75%;
  background: none;
  border: none;
  z-index: 12;
}
</style>
