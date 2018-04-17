<template lang="html">
<div id="wrapper">
  <p class="p-30 f30">意见反馈</p>
  <textarea-component
    :max="150"
    :iclass="'chorder mt-20'"
    v-model="content"
    placeholder="详细描述你需要反馈的意见..."
  ></textarea-component>
  <div class="mt-20">
    <input-component
      :title="'备注'"
      :iclass="'top-input'"
      v-model="linkType"
      placeholder="请输入备注内容方便联络"></input-component>
  </div>
  <div style="height:.5rem;"></div>
  <button type="button" name="button" class="defaultconfirm" @click="feedback">提交</button>
</div>
</template>

<script>
import {TextareaComponent, InputComponent} from 'components/common/formComponent'
import {HomeApi} from 'api'
export default {
  data() {
    return {
      content: '',
      linkType: ''
    }
  },
  components: {
    'textarea-component':TextareaComponent,
    InputComponent
  },
  created() {
    document.title = '逛逛-意见反馈'
  },
  methods: {
    feedback() {
      if (!this.content) {
        this.$toast('请输入要反馈的意见内容')
        return
      }
      HomeApi.FeedBack({
        remark: this.linkType,
        content: this.content,
        wordType: 7
      }).then(
        res => {
          this.$toast(res.data.info)
          if (res.data.resultCode === 1) {
            this.$router.push({
              name: 'mycenter'
            })
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

<style lang="less">
</style>
