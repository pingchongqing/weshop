<template>
<div id="wrapper">
  <ul class="bookmarklist" v-if="bookmarkList.length">
    <li v-for="bookmark in bookmarkList" @click="golink(bookmark)" class="clearfix">
      <div class="imgbox mr-20">
        <img :src="bookmark.filePath" v-if="bookmark.filePath" />
        <img src="~images/defaultbox.png" v-else />
      </div>
      <div class="title">{{bookmark.linkName}}</div>
      <div class="price default-color f30">{{bookmark.productPrice}}</div>
      <button class="cancelbutton fr" @click.stop="cancelBookmark(bookmark)">取消收藏</button>
    </li>
  </ul>
  <div class="empty" v-show="bookmarkList.length===0 && !isLoding">
    <span>暂无收藏的商品</span>
  </div>
  <footerComponent ></footerComponent>
</div>
</template>
<script type="text/javascript">
import {HomeApi} from 'api'
import footerComponent from '../Footer'
export default {
  data() {
    return {
      bookmarkList: [],
      isLoding: false
    }
  },
  components: {
    footerComponent,
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
  created() {
    this.getBookmarkList()
  },
  methods: {
    getBookmarkList() {
      this.isLoding = true
      HomeApi.Bookmarklist({
        Start: 0,
        pageSize: 50,
        enableTag: 1
      }).then(
        res => {
          this.isLoding = false
          console.log(res);
          if (res.data.resultCode === 1) {
            this.bookmarkList = res.data.pages.pageList
          } else if (res.data.resultCode === -1 && res.data.info === '未登录') {
            this.$router.push({
              name: 'login',
              query: {
                returnUrl: this.$route.path
              }
            })
          } else {
            this.$toast(res.data.info)
          }
        }
      )

    },
    cancelBookmark(bookmark) {
      this.$messagebox({
        title:'提示',
        message: '确定取消收藏吗?',
        showCancelButton: true
      }).then(action => {
        if (action === 'confirm') {
          let {linkId,linkName,linkUrl,linkType} = bookmark
          HomeApi.AddBookMark({
            linkId,
            enableTag: 0,
            linkName,
            linkUrl,
            linkType
          }).then(
            res => {
              this.$toast(res.data.info)
              if (res.data.resultCode === 1) {
                this.$router.go(0)
              }
            }
          )
        }
      })
    },
    golink(bookmark) {
      this.$router.push({
        name: 'goodsDetail',
        params: {
          classId: bookmark.classId ? bookmark.classId : 0,
          productId: bookmark.linkUrl
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.cancelbutton, .confirm {
  padding: .1rem .2rem;
  border-radius: .1rem;
}
.cancelbutton {
  border: #999 1px solid;
  color: #999;
}
.bookmarklist {
  li {
    padding: .3rem;
    background: #fff;
    margin-bottom: .2rem;
    .imgbox {
      width: 1.5rem;
      height: 1.5rem;
      float: left;
      img {
        width: 100%;
      }
    }
    .title {
      padding: .1rem .3rem;
    }
    .price {
      padding: .2rem .3rem;
    }
  }
}
</style>
