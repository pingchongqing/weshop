<template>
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div class="pswp vux-previewer" tabindex="-1" role="dialog" aria-hidden="true">
    <!-- Background of PhotoSwipe.
         It's a separate element as animating opacity is faster than rgba(). -->
    <div class="pswp__bg" :class="{'opacity-bg':isForList}"></div>
    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">
      <!-- Container that holds slides.
        PhotoSwipe keeps only 3 of them in the DOM to save memory.
        Don't modify these 3 pswp__item elements, data is added later on. -->
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>

      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <!--  Controls are self-explanatory. Order can be changed. -->
          <div class="pswp__counter"></div>
          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
          <button class="pswp__button pswp__button--share" title="Share"></button>
          <!-- <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button> -->
          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
          <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
          <!-- element will get class pswp__preloader--active when preloader is running -->
          <div class="pswp__preloader" :style="{top: (height - 36) / 2 + 'px', left: (width - 36) / 2 + 'px'}">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div>
        </div>
        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>
      </div>
    </div>
    <div class="phone-game-swiper-point mtheight" v-if="list.length && list.length > 1">
      <div
         :class="{'now-chick': index == nowIndex}"
         v-for="(item, index) in list.length || 1"
         :style="{'margin-left': 0.09375 - 0.002*list.length + 'rem', 'margin-right': 0.09375 - 0.002*list.length + 'rem'}"
      >
      </div>
    </div>
    <div class="mob-btn fixed-bottom" v-if="isForList" @touchmove.prevent>
            <span @click.stop="nextPage"
                  class="f32 color-fff text-center bg-m1">查看商品详情</span></div>
  </div>
</template>

<script>
  const Swipe = require('components/common/photoswipe')
  const UI = require('components/common/photoswipe-ui-default')
  export default {
    data() {
      return {
        photoswipe: null,
        width: window.innerWidth,
        height: window.innerHeight,
        nowIndex: this.index, // 当前预览的图片是第几张图片,
        targetUrl: null,
      }
    },
    mounted () {
      /* 改动屏幕尺寸，则直接关闭图片预览 */
      window.onresize = () => {
        this.close()
      }
    },
    computed: {
      nlist() {
        let nar = []
        this.list.forEach(elem => {
          nar.push({
            src: this.$CONSTANTS.HOST + elem,
            w: window.innerWidth,
            h: window.innerHeight
          })
        });
        return nar
      }
    },
    methods: {
      init (index) {
        let options = Object.assign({
          loop: false,
          history: false,
          shareEl: false,
          tapToClose: true,
          captionAndToolbarAutoHideDelay: 0,
          index: index
        }, this.options)
        var self = this;
        self.photoswipe = new Swipe.PhotoSwipe(this.$el, UI.PhotoSwipeUI_Default, this.nlist, options)
        /*监听图片翻页，翻页后更新 nowIndex的值*/
        self.photoswipe.listen('afterChange', () => {
          self.nowIndex = self.photoswipe.getCurrentIndex();
        });
        self.photoswipe.init()
      },
      show (index, targetUrl) {
        if (targetUrl)
          this.targetUrl = targetUrl
        this.init(index)
      },
      close () {
        if (this.photoswipe)
          this.photoswipe.close()
      },
      nextPage(){
        this.$router.push(this.targetUrl)
      }
    },
    props: {
      list: {
        type: Array,
        required: true
      },
      index: {
        type: Number,
        default: 0
      },
      options: {
        type: Object,
        default () {
          return {}
        }
      },
      isForList: {   // 可选字段，有默认值
        default: false
      },
    }
  }
</script>


<style src="css/plugin/photoswipe.css"></style>
<style src="css/plugin/default-skin.css"></style>
<style>
  /* 加载图片样式修改  -- pswp__preloader--active -- */
  .pswp__preloader {
    position: fixed;
    width: 36px;
    height: 36px;
    left: 0;
    top: 0;
  }
  .pswp--css_animation .pswp__preloader__icn {
    width: 36px;
    height: 36px;
    left: 0;
    top: 0;
  }
  .pswp--css_animation .pswp__preloader__cut {
    width: 18px;
    height: 36px;
  }
  .pswp--css_animation .pswp__preloader__donut {
    width: 36px;
    height: 36px;
    border: 3px solid #FFF;
  }
  .pswp__img {
    display: inline-block !important;
  }

  /*图片预览底部点样式-yanjd*/
  .phone-game-swiper-point {
    text-align: center;
    width: 100%;
    position: fixed;
    bottom: 20px;
    z-index: 10000;
  }

  .phone-game-swiper-point div {
    display: inline-block;
    margin-left: .09375rem;
    margin-right: .09375rem;
    width: 6px;
    height: 6px;
    border-radius: 6px;
    background-color: rgba(69, 69, 69, 1);
    -webkit-transition: background-color .3s;
    -moz-transition: background-color .3s;
    -ms-transition: background-color .3s;
    -o-transition: background-color .3s;
    transition: background-color .3s;
  }

  .phone-game-swiper-point div.now-chick {
    background-color: rgba(187, 187, 187, 1);
  }

  .pswp__item {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .pswp__zoom-wrap {
    text-align: center;
    width: 100%;
    height: 100%;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .pswp__img {
    position: relative;
    width: auto !important;
    height: auto !important;
    max-width: 100% !important;
    max-height: 100% !important;
  }

  .pswp__top-bar {
    height: 0.96rem;
  }

  .pswp__ui--hidden .pswp__top-bar, .pswp__ui--hidden .pswp__caption, .pswp__ui--hidden .pswp__button--arrow--left, .pswp__ui--hidden .pswp__button--arrow--right {
    opacity: 1;
  }

  .pswp__counter {
    position: absolute;
    left: 50%;
    margin-left: -.5rem;
    top: 0rem;
    color: #FFF;
    opacity: 0.75;
    height: 0.96rem;
    line-height: 0.96rem;
    font-size: 0.32rem;
    width: 2.5rem;
  }

  .pswp__button, .pswp__button--arrow--left:before, .pswp__button--arrow--right:before {
    background-size: 5.28rem 1.76rem;
    width: .88rem;
    height: .88rem;
  }

  .pswp__button--close {
    background-position: 0 -.88rem;
  }

  .opacity-bg {
    opacity: 0.7 !important
  }

  .mob-btn {
    margin-bottom: 0.8rem;
  }

  .mob-btn span {
    display: block;
    width: 4.34rem;
    height: 0.8rem;
    line-height: 0.75rem;
    margin: 0 auto;
  }
</style>
