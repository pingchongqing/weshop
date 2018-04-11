<template>
  <div class="weui-cells">
  <div class="weui-cell" style="height:1rem">
    <div>
      <p v-html="title" :style="{width: $parent.labelWidth, textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}"></p>
    </div>
    <div class="weui-cell__ft vux-cell-primary " :class="{'vux-number-round': buttonStyle === 'round'}" v-show="!readonly" style="font-size:0">
      <div :style="{float:align, marginLeft:align ==='left'?'15px':'0'}">
        <div @click="sub" class="vux-number-selector vux-number-selector-sub ch_sub no-select" :class="{'vux-number-disabled':disabledMin}">
          <!-- <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width=".3rem" height=".3rem"><defs></defs><path d="M863.74455 544.00086 163.424056 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l700.320495 0c17.695686 0 31.99914 14.336138 31.99914 32.00086S881.440237 544.00086 863.74455 544.00086z"></path></svg> -->
        </div>
        <input v-model.number="currentValue" :name="name" class="vux-number-input " :style="{width: width}" :readonly="!fillable" pattern="[0-9]*" type="number"/>
        <div @click="add" class="vux-number-selector vux-number-selector-plus ch_add no-select" :class="{'vux-number-disabled':disabledMax}">
          <!-- <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width=".3rem" height=".3rem"><defs></defs><path d="M863.328262 481.340895l-317.344013 0.099772L545.984249 162.816826c0-17.664722-14.336138-32.00086-32.00086-32.00086s-31.99914 14.336138-31.99914 32.00086l0 318.400215-322.368714-0.17718c-0.032684 0-0.063647 0-0.096331 0-17.632039 0-31.935493 14.239806-32.00086 31.904529-0.096331 17.664722 14.208843 32.031824 31.871845 32.095471l322.59234 0.17718 0 319.167424c0 17.695686 14.336138 32.00086 31.99914 32.00086s32.00086-14.303454 32.00086-32.00086L545.982529 545.440667l317.087703-0.099772c0.063647 0 0.096331 0 0.127295 0 17.632039 0 31.935493-14.239806 32.00086-31.904529S880.960301 481.404542 863.328262 481.340895z"></path></svg> -->
        </div>
      </div>
    </div>
    <div class="weui-cell__ft vux-cell-primary" v-show="readonly">
      {{value}}
    </div>
  </div>
</div>

</template>

<script type="text/ecmascript-6">
export default {
  props: {
    min: Number,
    max: Number,
    readonly: Boolean,
    step: {
      type: Number,
      default: 1
    },
    value: {
      type: Number,
      default: 0
    },
    name: String,
    title: String,
    fillable: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '1rem'
    },
    buttonStyle: {
      type: String,
      default: 'square'
    },
    align: {
      type: String,
      default: 'right'
    }
  },
  created () {
    this.currentValue = this.value
  },
  data () {
    return {
      currentValue: 0
    }
  },
  computed: {
    disabledMin () {
      return typeof this.min === 'undefined' ? false : this.currentValue <= this.min
    },
    disabledMax () {
      return typeof this.max === 'undefined' ? false : this.currentValue >= this.max
    }
  },
  watch: {
    currentValue (newValue, old) {
      if (this.min && this.currentValue < this.min) {
        this.currentValue = this.min
      }
      if (this.max && this.currentValue > this.max) {
        this.currentValue = this.max
      }
      this.$nextTick(() => {
        this.$emit('on-change', this.currentValue)
        this.$emit('input', this.currentValue)
      })
    },
    value (newValue) {
      this.currentValue = newValue
    }
  },
  methods: {
    add () {
      if (!this.disabledMax) {
        this.currentValue += this.step
      }
    },
    sub () {
      if (!this.disabledMin) {
        this.currentValue -= this.step
      }
    }
  }
}
</script>
<style scoped>
.weui-cell {
    padding: 5px .3rem;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.weui-label {
    display: block;
    width: 105px;
    word-wrap: break-word;
    word-break: break-all;
}
.weui-cell:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.weui-cells__title {
    margin-top: 0.77em;
    margin-bottom: 0.3em;
    padding-left: 15px;
    padding-right: 15px;
    color: #999999;
    font-size: 14px;
}
.weui-cells {
    background-color: #FFFFFF;
    line-height: .3rem;
    font-size: .3rem;
    overflow: hidden;
    position: relative;
    margin-top: -1px;
}

.weui-cells:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}


.weui-cell__bd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
}
.weui-cell__ft {
    text-align: right;
    color: #999999;
}
.vux-number-selector-plus {
    border-left: none;
    padding: 3px 8px;
    border-radius: 0 2px 2px 0;
    background: #fff;
    width: .64rem;
    text-align: center;
}
.vux-number-selector {
    float: left;
    height: .64rem;
    font-size: .25rem;
    line-height: .64rem;
    color: #FF9900;
    border: 1px solid #ececec;
    width: .64rem;
    text-align: center;
}

.vux-cell-primary {
  flex: 1;
}
.vux-number-input {
  float:left;
  height:.64rem;
  font-size:.3rem;
  color: #000;
  appearance: none;
  border:1px solid #ececec;
  padding:3px 0;
  text-align:center;
  border-radius: 1px;
  font-family: "Arial";
}
.vux-number-round .vux-number-input {
  border: none;
}

.vux-number-round .vux-number-selector {
  width: 20px;
  border-radius: 13px;
}
.vux-number-selector svg {
  fill: #333;
}
.vux-number-selector.vux-number-disabled svg {
  fill: #ccc;
}
.vux-number-round .vux-number-selector.vux-number-disabled {
  border-color: #ececec;
}
.vux-number-round .vux-number-selector.vux-number-disabled svg {
  fill: #ccc;
}
.vux-number-selector-sub {
  border-right:none;
  padding:4px 8px 2px 8px;
  border-radius:2px 0 0 2px;
  background: #fff;
}
.vux-number-selector-plus {
  border-left:none;
  padding:3px 8px;
  border-radius:0 2px 2px 0;
}
.vux-number-round .vux-number-selector-sub svg {
  position: relative;
  top: 1px;
}

.vux-number-round .vux-number-selector-sub, .vux-number-round .vux-number-selector-plus {
  padding: 2px;
  border: 1px solid #FF9900;
  text-align: center;
}
.vux-number-round .vux-number-selector {
    width: 20px;
    border-radius: 13px;
}
.ch_add {
    background: url(~images/ch_add.png) no-repeat center center;
    background-color: #fff;
    background-size: 0.25rem;
    opacity: 1;
}
.vux-number-disabled.ch_add{
  background: url(~images/ch_add_hov.png) no-repeat center center;
  background-color: #fff;
  background-size: 0.25rem;
}
.vux-number-disabled.ch_sub {
  background: url(~images/ch_redu_hov.png) no-repeat center center;
  background-color: #fff;
  background-size: 0.25rem;
}
.ch_sub
{
  background: url(~images/ch_redu.png) no-repeat center center;
  background-color: #fff;
  background-size: 0.25rem;
}

</style>
