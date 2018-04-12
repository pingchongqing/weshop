<template lang="html">
<div id="wrapper">
  <div class="cell">
    <input-component
      :title="'旧密码'"
      :iclass="'top-input'"
      v-model="oldPassword"
      type="password"
      required
      placeholder="请输入旧密码"></input-component>
  </div>
  <div class="cell">
    <input-component
      :title="'新密码'"
      :iclass="'top-input'"
      v-model="newPassword"
      type="password"
      required
      placeholder="请输入新密码"></input-component>
  </div>
  <div class="cell">
    <input-component
      :title="'确认新密码'"
      :iclass="'top-input'"
      v-model="confirmNewPassword"
      type="password"
      required
      placeholder="请输入确认新密码"></input-component>
  </div>
  <button class="defaultconfirm" @click="submit">确定</button>
</div>
</template>

<script>
import {InputComponent} from 'components/common/formComponent'
import {HomeApi} from 'api'
export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  },
  components: {
    InputComponent
  },
  methods: {
    submit() {
      if (!this.oldPassword || !this.newPassword || !this.confirmNewPassword) {
        this.$toast('还有信息没有填哦')
        return
      } else if (this.newPassword != this.confirmNewPassword) {
        this.$toast('两次密码输入不一致哦')
        return
      }
      HomeApi.ModifyPassword({oldPassword: this.oldPassword, password: this.newPassword}).then(
        res => {
          if (res.data.resultCode === 1) {
            this.$toast('修改密码成功')
            this.$router.push({
              name: 'mycenter'
            })
          } else {
            this.$toast(res.data.info)
          }
        }
      )
    }
  }
}
</script>

<style lang="css">
.cell {
  background: #fff;
  border-bottom: #dfdfdf 1px solid;
  padding: .1rem 0;
  position: relative;
}
</style>
