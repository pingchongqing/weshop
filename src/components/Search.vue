<template>
<transition enter-active-class="fadeInRight animated" leave-active-class="fadeOutLeft animated">
  <div id="wrapper">
    <!-- 首页顶部 -->
    <div class="index-top">
      <!-- 首页分类导航 -->
      <classlist></classlist>
      <!-- 首页分类导航结束 -->
      <div class="index-search">
        <input-component
          :iclass="'top-input'"
          v-model="searchText"
          placeholder="请输入关键字"></input-component>
        <div class="searchbox"></div>
        <div class="searchicon"></div>
      </div>
      <button @click="doSearch" v-show="searchText" class="search-button">搜索</button>
    </div>
    <!-- 首页顶部结束 -->
    <footerComponent ></footerComponent>
  </div>
</transition>
</template>
<script>
import classlist from 'components/common/ClassList'
import footerComponent from './Footer'
import {InputComponent} from 'components/common/formComponent'
export default {
  data() {
    return {
      searchText: ''
    }
  },
  components: {
    classlist,
    footerComponent,
    InputComponent
  },
  created() {
    document.title = '逛逛-搜索'
  },
  methods: {
    doSearch() {
      this.$router.push({
        name: 'goodsList',
        path: '/goodsList',
        query: {
          productName: this.searchText
        }
      })
    }
  }
}
</script>
<style scoped>
/*首页顶部*/
.index-top {
  height: 1rem;
  position: absolute;
  z-index: 100;
  width: 100%;
  background: #ccc;
  padding: .2rem 0;
}
.index-top .index-menu {
  width: .6rem;
  height: .6rem;
  background: url('~images/menu.png') no-repeat;
  background-size: cover;
  margin: 0 .3rem;
  float: left;
}
.index-top .index-search {
  position: relative;
  width: 60%;
  height: .6rem;
  float: left;
}
.index-top .index-search .searchbox {
  width: 100%;
  height: .6rem;
  border-radius: .3rem;
  opacity: .5;
  background: #fff;
  position: absolute;
  z-index: 10;
}
.index-top .index-search .searchicon {
  width: .6rem;
  height: .6rem;
  background: url('~images/search.png') no-repeat;
  background-size: cover;
  margin: 0 .1rem;
  float: left;
  position: absolute;
  z-index: 11;
}
.index-top .index-search .top-input {
  position: absolute;
  top: .15rem;
  left: 1rem;
  height: .5rem;
  width: 75%;
  background: none;
  border: none;
  z-index: 12;
}
.search-button {
  border-radius: .1rem;
  border: #ddd 1px solid;
  background: #999;
  height: .6rem;
  margin-left: .2rem;
  line-height: .5rem;
  padding: 0 .2rem;
  color: #fff;
}
</style>
