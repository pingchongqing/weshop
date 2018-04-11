<template>
<div class="weui-cells">
  <div class="vux-x-input weui-cell" :class="{'weui-cell_warn': !valid}">
    <div class="weui-cell__hd">
      <div :style="labelStyles" v-if="hasRestrictedLabel">
        <slot name="restricted-label"></slot>
      </div>
      <slot name="label">
        <label class="weui-label" :style="{width: $parent.labelWidth || (labelWidth + 'em'), textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}" v-if="title" v-html="title"></label>
        <inline-desc v-if="inlineDesc">{{inlineDesc}}</inline-desc>
      </slot>
    </div>
  <div class="weui-cell__bd weui-cell__primary" :class="placeholderAlign ? `vux-x-input-placeholder-${placeholderAlign}` : ''">
    <input
    v-if="!type || type === 'text'"
    :class="iclass"
    :maxlength="max"
    :autocomplete="autocomplete"
    :autocapitalize="autocapitalize"
    :autocorrect="autocorrect"
    :spellcheck="spellcheck"
    :style="inputStyle"
    type="text"
    :name="name"
    :list="listName"
    :pattern="pattern"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
    v-model="currentValue"
    @focus="focusHandler"
    @blur="blur"
    ref="input"/>
    <datalist v-if="listName" :id="listName">
      <option v-for="item in list" >{{item}}</option>
    </datalist>
    <input
    v-if="type === 'number'"
    :class="iclass"
    :maxlength="max"
    :autocomplete="autocomplete"
    :autocapitalize="autocapitalize"
    :autocorrect="autocorrect"
    :spellcheck="spellcheck"
    :style="inputStyle"
    type="number"
    :name="name"
    :pattern="pattern"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
    v-model="currentValue"
    @focus="focusHandler"
    @blur="blur"
    ref="input"/>
    <input
    v-if="type === 'email'"
    :class="iclass"
    :maxlength="max"
    :autocomplete="autocomplete"
    :autocapitalize="autocapitalize"
    :autocorrect="autocorrect"
    :spellcheck="spellcheck"
    :style="inputStyle"
    type="email"
    :name="name"
    :pattern="pattern"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
    v-model="currentValue"
    @focus="focusHandler"
    @blur="blur"
    ref="input"/>
    <input
    v-if="type === 'password'"
    :class="iclass"
    :maxlength="max"
    :autocomplete="autocomplete"
    :autocapitalize="autocapitalize"
    :autocorrect="autocorrect"
    :spellcheck="spellcheck"
    :style="inputStyle"
    type="password"
    :name="name"
    :pattern="pattern"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
    v-model="currentValue"
    @focus="focusHandler"
    @blur="blur"
    ref="input"/>
    <input
    v-if="type === 'tel'"
    :class="iclass"
    :maxlength="max"
    :autocomplete="autocomplete"
    :autocapitalize="autocapitalize"
    :autocorrect="autocorrect"
    :spellcheck="spellcheck"
    :style="inputStyle"
    type="tel"
    :name="name"
    :pattern="pattern"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
    v-model="currentValue"
    @focus="focusHandler"
    @blur="blur"
    ref="input"/>
  </div>
  <div class="weui-cell__ft">
    <icon type="clear" v-show="!equalWith && showClear && currentValue && !readonly && !disabled" @click.native="clear"></icon>

    <icon class="vux-input-icon" type="warn" :title="!valid ? firstError : ''" v-show="!novalidate && !equalWith && ((touched && !valid && firstError) || (forceShowError && !valid && firstError))"></icon>
    <icon class="vux-input-icon" type="warn" v-if="!novalidate && hasLengthEqual && dirty && equalWith && !valid"></icon>
    <icon type="success" v-show="!novalidate && equalWith && equalWith === currentValue && valid"></icon>

    <icon type="success" class="vux-input-icon" v-show="novalidate && iconType === 'success'"></icon>
    <icon type="warn" class="vux-input-icon" v-show="novalidate && iconType === 'error'"></icon>

    <slot name="right"></slot>
  </div>
</div>
</div>
</template>
<script >
import Base from '../formCommon/base'
import Icon from '../formCommon/Icon'
import inlineDesc from '../formCommon/InlineDesc'

import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'

const validators = {
  'email': {
    fn: isEmail,
    msg: '邮箱地址'
  },
  'china-mobile': {
    fn (str) {
      return isMobilePhone(str, 'zh-CN')
    },
    msg: '手机号码'
  },
  'china-name': {
    fn (str) {
      return str.length >= 2 && str.length <= 6
    },
    msg: '中文姓名'
  },
  'qq-number': {
    fn (str) {
      return str.length>=5 && str.length <=14
    },
    msg: 'QQ号码'
  },
  'zip-code': {
    fn (str) {
      return /^[1-9][0-9]{5}$/.test(str)
    },
    msg: '邮政编码'
  }
}
export default {
  created () {
    this.currentValue = this.value || ''
    if (!this.title && !this.placeholder && !this.currentValue) {
      console.warn('no title and no placeholder?')
    }
    if (this.required && !this.currentValue) {
      this.valid = false
    }
    this.handleChangeEvent = true
  },
  mounted () {
    if (this.$slots && this.$slots['restricted-label']) {
      this.hasRestrictedLabel = true
    }
  },
  mixins: [Base],
  components: {
    Icon,
    inlineDesc
  },
  props: {
    required: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    value: [String, Number],
    name: String,
    readonly: Boolean,
    disabled: Boolean,
    keyboard: String,
    isType: [String, Function],
    min: Number,
    max: Number,
    list:{
      type: Array
    },
    listName: String,
    showClear: {
      type: Boolean,
      default: true
    },
    inlineDesc: String,
    equalWith: String,
    iclass: String,
    textAlign: String,
    // https://github.com/yisibl/blog/issues/3
    autocomplete: {
      type: String,
      default: 'off'
    },
    autocapitalize: {
      type: String,
      default: 'off'
    },
    autocorrect: {
      type: String,
      default: 'off'
    },
    spellcheck: {
      type: String,
      default: 'false'
    },
    novalidate: {
      type: Boolean,
      default: false
    },
    iconType: String,
    placeholderAlign: String
  },
  computed: {
    labelStyles () {
      return {
        width: this.$parent.labelWidth || (this.labelWidth + 'em'),
        textAlign: this.$parent.labelAlign,
        marginRight: this.$parent.labelMarginRight
      }
    },
    pattern () {
      if (this.keyboard === 'number' || this.isType === 'china-mobile' || this.isType === 'qq-number') {
        return '[0-9]*'
      }
    },
    labelWidth () {
      return this.title.replace(/[^x00-xff]/g, '00').length / 2 + 1
    },
    hasErrors () {
      return Object.keys(this.errors).length > 0
    },
    inputStyle () {
      if (this.textAlign) {
        return {
          textAlign: this.textAlign
        }
      }
    }
  },
  methods: {
    reset (value = '') {
      this.dirty = false
      this.currentValue = value
      this.firstError = ''
      this.valid = true
    },
    clear () {
      this.currentValue = ''
      this.$refs.input.focus()
      this.$emit('pclear', true)
    },
    focus () {
      this.$refs.input.focus()
    },
    focusHandler () {
      this.$emit('on-focus', this.currentValue)
    },
    blur () {
      this.setTouched()
      this.validate()
      this.$emit('on-blur', this.currentValue)
    },
    getError () {
      let key = Object.keys(this.errors)[0]
      this.firstError = this.errors[key]
    },
    validate () {
      if (typeof this.equalWith !== 'undefined') {
        this.validateEqual()
        return
      }
      this.errors = {}

      if (!this.currentValue && !this.required) {
        this.valid = true
        return
      }

      if (!this.currentValue && this.required) {
        this.valid = false
        this.errors.required = '必填哦'
        this.getError()
        return
      }

      if (typeof this.isType === 'string') {
        const validator = validators[this.isType]
        if (validator) {
          this.valid = validator[ 'fn' ](this.currentValue)
          this.$emit('BackValid', this.errors)
          if (!this.valid) {
            this.errors.format = validator[ 'msg' ] + '格式不对哦~'
            return
          } else {
            delete this.errors.format
          }
        }
      }

      if (typeof this.isType === 'function') {
        const validStatus = this.isType(this.currentValue)
        this.valid = validStatus.valid
        this.$emit('BackValid', this.errors)
        if (!this.valid) {
          this.errors.fn = validStatus.msg
          this.forceShowError = true
          this.getError()
          return
        } else {
          delete this.errors.fn
        }
      }

      if (this.min) {
        if (this.currentValue.length < this.min) {
          this.errors.min = `最少应该输入${this.min}个字符哦`
          this.valid = false
          if (!this.firstError) {
            this.getError()
          }
          return
        } else {
          delete this.errors.min
        }
      }

      if (this.max) {
        if (this.currentValue.length > this.max) {
          this.errors.max = `最多可以输入${this.max}个字符哦`
          this.valid = false
          this.forceShowError = true
          return
        } else {
          this.forceShowError = false
          delete this.errors.max
        }
      }

      this.valid = true
    },
    validateEqual () {
      if (!this.equalWith && this.currentValue) {
        this.valid = false
        this.errors.equal = '输入不一致'
        return
      }
      let willCheck = this.dirty || this.currentValue.length >= this.equalWith.length
      // 只在长度符合时显示正确与否
      if (willCheck && this.currentValue !== this.equalWith) {
        this.valid = false
        this.errors.equal = '输入不一致'
        return
      } else {
        if (!this.currentValue && this.required) {
          this.valid = false
        } else {
          this.valid = true
          delete this.errors.equal
        }
      }
    }
  },
  data () {
    let data = {
      hasRestrictedLabel: false,
      firstError: '',
      forceShowError: false,
      hasLengthEqual: false,
      valid: true,
      currentValue: ''
    }
    return data
  },
  watch: {
    valid () {
      this.getError()
    },
    value (val) {
      this.currentValue = val
    },
    equalWith (newVal) {
      if (newVal && this.equalWith) {
        if (newVal.length === this.equalWith.length) {
          this.hasLengthEqual = true
        }
        this.validateEqual()
      } else {
        this.validate()
      }
    },
    currentValue (newVal) {
      if (!this.equalWith && newVal) {
        this.validateEqual()
      }
      if (newVal && this.equalWith) {
        if (newVal.length === this.equalWith.length) {
          this.hasLengthEqual = true
        }
        this.validateEqual()
      } else {
        this.validate()
      }
      this.$emit('input', newVal)
      this.$emit('on-change', newVal)
    }
  }
}
</script>
<style scoped>
.vux-x-input .vux-x-input-placeholder-right input::-webkit-input-placeholder {
  text-align: right;
}
.vux-x-input .vux-x-input-placeholder-center input::-webkit-input-placeholder {
  text-align: center;
}
.vux-input-icon.vux-input-icon {
  font-size: 21px;
}
.vux-input-icon.weui-icon-warn:before, .vux-input-icon.weui-icon-success:before {
  font-size: 21px;
}
.vux-x-input .weui-icon {
  padding-left: 5px;
}
.vux-x-input.weui-cell_vcode {
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
}
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
    border-top: 1px solid #D9D9D9;
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
.weui-cell__bd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
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

</style>
<style>
  .mint-toast-text{
    font-size: .33rem !important;
    padding-left: .2rem;
    padding-right: .2rem;
    padding-top: .2rem !important;
    padding-bottom: .2rem;
  }
</style>
