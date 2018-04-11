<template>
  <div class="weui-cells">
  <div class="weui-cell">
    <div class="weui-cell__hd">
      <div :style="labelStyles" v-if="hasRestrictedLabel">
        <slot name="restricted-label"></slot>
      </div>
      <slot name="label">
        <label class="weui-label" :style="{width: $parent.labelWidth || (labelWidth + 'em'), textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}" v-if="title" v-html="title"></label>
        <inline-desc v-if="inlineDesc">{{inlineDesc}}</inline-desc>
      </slot>
    </div>
    <div class="weui-cell__bd">
      <textarea
        :class="iclass + ' weui-textarea'"
        :autocomplete="autocomplete"
        :autocapitalize="autocapitalize"
        :autocorrect="autocorrect"
        :spellcheck="spellcheck"
        :placeholder="placeholder"
        :readonly="readonly"
        :name="name"
        :rows="rows"
        :cols="cols"
        v-model="currentValue"
        @focus="$emit('on-focus')"
        @blur="$emit('on-blur')"
        :style="textareaStyle"
        :maxlength="max"
        ref="textarea"></textarea>
      <div class="weui-textarea-counter" v-show="showCounter && max" @click="focus"><span>{{count}}</span>/{{max}}</div>
    </div>
  </div>
</div>
</template>

<script>
  import Base from '../formCommon/base'
  import inlineDesc from '../formCommon/InlineDesc'

  export default {
    minxins: [Base],
    mounted () {
      if (this.$slots && this.$slots['restricted-label']) {
        this.hasRestrictedLabel = true
      }
    },
    components: {
      inlineDesc
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      inlineDesc: String,
      showCounter: {
        type: Boolean,
        default: true
      },
      max: Number,
      value: {
        type: String,
        default: ''
      },
      name: String,
      placeholder: String,
      readonly: {
        type: Boolean,
        default: false
      },
      rows: {
        type: Number,
        default: 3
      },
      cols: {
        type: Number,
        default: 30
      },
      height: Number,
      iclass:String,
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
      }
    },
    created () {
      this.currentValue = this.value
    },
    watch: {
      value (val) {
        this.currentValue = val
      },
      currentValue (newVal) {
        if (this.max && newVal > this.max) {
          this.currentValue = newVal.slice(0, this.max)
        }
        this.$emit('on-change', this.currentValue)
        this.$emit('input', this.currentValue)
      }
    },
    data () {
      return {
        hasRestrictedLabel: false,
        currentValue: ''
      }
    },
    computed: {
      count () {
        let len = 0
        if (this.currentValue) {
          len = this.currentValue.replace(/\n/g, 'aa').length
        }
        return len > this.max ? this.max : len
      },
      textareaStyle () {
        if (this.height) {
          return {
            height: `${this.height}px`
          }
        }
      },
      labelStyles () {
        return {
          width: this.$parent.labelWidth || (this.labelWidth + 'em'),
          textAlign: this.$parent.labelAlign,
          marginRight: this.$parent.labelMarginRight
        }
      },
      labelWidth () {
        return this.title.replace(/[^x00-xff]/g, '00').length / 2 + 1
      }
    },
    methods: {
      focus () {
        this.$refs.textarea.focus()
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
.weui-textarea {
    display: block;
    border: 0;
    resize: none;
    width: 100%;
    color: inherit;
    font-size: 1em;
    line-height: inherit;
    outline: 0 none #fff;
    overflow: auto;
}
.weui-textarea-counter {
    color: #B2B2B2;
    text-align: right;
    padding-bottom: .1rem;
}
.weui-cell__bd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
}
.chorder{ height:2.04rem; border:none; width:auto; font-size:0.3rem; color:#000; line-height:0.42rem; width:100%;}
</style>
