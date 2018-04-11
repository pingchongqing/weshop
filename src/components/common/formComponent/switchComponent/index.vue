<template>
  <div class="vux-x-switch weui-cell weui-cell_switch bg-fff mb-20 mt-20 ">
    <div class="weui-cell__bd">
      <label class="label5 f30"  v-html="title"></label>
      <inline-desc v-if="inlineDesc">{{inlineDesc}}</inline-desc>
      <i class=" pcOrder02-left fl" v-if="showtip" @click="tipclick"></i>
    </div>
    <span class="price f30"  v-html="price" v-show="price!='￥'"></span>
    <div class="weui-cell__ft" v-show="price!='￥'">
      <input class="weui-switch" type="checkbox" :disabled="disabled" v-model="currentValue"/>
    </div>
  </div>
</template>

<script>
import InlineDesc from 'components/common/formComponent/formCommon/InlineDesc.vue'

export default {
  components: {
    InlineDesc
  },
  computed: {
    labelStyle () {
      let isHTML = /<\/?[^>]*>/.test(this.title)
      let width = Math.min(isHTML ? 5 : (this.title.length + 1), 14) + 'em'
      return {
        display: 'block',
        width
      }
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: false
    },
    showtip: {
      type:Boolean,
      default:false,
      required: false
    },
    disabled: Boolean,
    value: {
      type: Boolean,
      default: false
    },
    inlineDesc: [String, Boolean, Number]
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  watch: {
    currentValue (val) {
      this.$emit('input', val)
      this.$emit('on-change', val)
    },
    value (val) {
      this.currentValue = val
    }
  },
  methods: {
    tipclick: function tipclick() {
      this.$emit('tipclick')
    }
  }
}
</script>

<style >
.price{
  margin-right: .28rem;
}
.weui-cells {
    margin-top: 1.17647059em;
    background-color: #fff;
    line-height: 1.41176471;
    font-size: 17px;
    overflow: hidden;
    position: relative;
}

.weui-cell {
    padding: 0.1rem 0.3rem;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}

.weui-cell_switch .weui-cell__ft {
  font-size: 0;
}

input.weui-switch[disabled] {
  opacity:0.6;
}

.weui-cell__bd {
    flex: 1;
}

.vux-x-switch.weui-cell_switch {
  padding-top: .24rem;
  padding-bottom: .24rem;
}

.weui-switch, .weui-switch-cp__box {
    position: relative;
    width: 54px;
    height: 26px;
    border: 1px solid #DFDFDF;
    outline: 0;
    border-radius: 13px;
    box-sizing: border-box;
    background-color: #DFDFDF;
    -webkit-transition: background-color 0.1s, border 0.1s;
    transition: background-color 0.1s, border 0.1s;
}
.weui-switch {
    -webkit-appearance: none;
    appearance: none;
}


.weui-switch:checked,
.weui-switch-cp__input:checked ~ .weui-switch-cp__box{
    /** vux **/
    border-color: #4cd964;
    background-color: #4cd964;
}

.weui-switch:checked:before,
.weui-switch-cp__input:checked ~ .weui-switch-cp__box :before{
  transform: scale(0);
}

/*.weui-switch:checked:after,
.weui-switch-cp__input:checked ~ .weui-switch-cp__box :after{
  transform: translateX(28px);
}*/

.weui-label {
    display: block;
    width: 105px;
    word-wrap: break-word;
    word-break: break-all;
}

Inherited from div.weui-cell__ft
.weui-cell_switch .weui-cell__ft {
    font-size: 0;
    position: relative;
    overflow: hidden;
}


/*.weui-switch:before, .weui-switch-cp__box:before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 30px;
    border-radius: 15px;
    //background-color: #FDFDFD;
    -webkit-transition: -webkit-transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
    transition: -webkit-transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
    transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
    transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1), -webkit-transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
}*/
/*.weui-switch:after, .weui-switch-cp__box:after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    background-color: #FFFFFF;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    -webkit-transition: -webkit-transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
    transition: -webkit-transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
    transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
    transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35), -webkit-transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
}*/
i.pcOrder02-left {
    display: inline-block;
    background: url(~images/anfw-ico.png) 0 center no-repeat;
    background-size: .33rem;
    width: .75rem;
    height: .56rem;
    margin-left: .2rem;
}
.label5 {
  float: left;
  line-height: .56rem;
}

</style>
