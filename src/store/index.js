import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    checkAddress: {},
    checkedInvoice: {}
  },
  mutations: {
    setCheckAddress (state, addr) {
      addr.flag = '1'
      state.checkAddress = addr
    },
    setcheckInvoice (state, invoice) {
      state.checkedInvoice = invoice
    },
  },
  strict: process.env.NODE_ENV !== 'production',
})
