<template>
  <div>
    <div class="index-menu" :class="{'index-menu-white': mystyle === 'white'}" @click="menuClick"></div>
    <transition name="transition" enter-active-class="animated fadeInLeft"
  leave-active-class="animated fadeOutLeft">
      <ul class="submenu " v-show="isMenuShow">
        <li v-for="subclass in classList" :key="subclass.classId" @click="classClick(subclass)">
          <div class="submenupic" ><img :src="subclass.filePath" v-show="subclass.filePath" /></div>
          <span class="submenuname">{{subclass.className}}</span>
        </li>
      </ul>
    </transition>
  </div>
</template>
<script>
import { HomeApi } from 'api/index'
export default {
  data() {
    return {
      host: this.$CONSTANTS.HOST,
      classList: [],
      isMenuShow: false
    }
  },
  props:['cstyle'],
  computed: {
    mystyle() {
      return this.cstyle || ''
    }
  },
  created() {
    this.getClassList()
  },
  methods: {
    // 获取商品分类
    getClassList() {
      HomeApi.GetGoodsClass({classParam: 0, limit: 6}).then(
        res => {
          if (parseInt(res.data.resultCode) === 1) {
            this.classList = res.data.appProductClassList
          }
          console.log(res);
        },
        err => {
          console.log(err);
        }
      )
    },
    // 类别图标点击事件
    menuClick() {
      this.isMenuShow = !this.isMenuShow
    },
    // 点击跳转
    classClick(cls) {
      this.isMenuShow = !this.isMenuShow
      this.$router.push({
        name: 'goodsList',
        query: {
          classId: cls.classId
        }
      })
    }
  }
}
</script>
<style scoped>

.index-top .index-menu {
  width: .6rem;
  height: .6rem;
  background: url('~images/menuccc.png') no-repeat;
  background-size: cover;
  margin: 0 .2rem;
  float: left;
}
.index-menu.index-menu-white {
  background: url('~images/menu.png') no-repeat;
  background-size: cover;
}
.submenu {
  position: absolute;
  left: .2rem;
  top: 1rem;
  border: #ccc 1px solid;
  border-radius: .1rem;
}
.submenu li {
  width: 100%;
  height: .6rem;
  border-bottom: #ccc 1px solid;
  background: #fff;
  padding-right: .1rem;
}
.submenu li:first-child {
  border-top-left-radius: .1rem;
  border-top-right-radius: .1rem;
}
.submenu li:last-child {
  border-bottom-left-radius: .1rem;
  border-bottom-right-radius: .1rem;
  border-bottom: none;
}
.submenu li .submenupic {
  width: .6rem;
  height: .6rem;
  overflow: hidden;
  text-align: center;
  float: left;
}
.submenu li .submenupic img {
  width: .4rem;
  height: .4rem;
  margin-top: .1rem;
}
.submenu li span {
  line-height: .6rem;
}

</style>
