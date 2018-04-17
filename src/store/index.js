import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    checkAddress: {},
    checkedInvoice: {},
    checkedCabAddress:{}
  },
  mutations: {
    setCheckAddress (state, addr) {
      addr.flag = '1'
      state.checkAddress = addr
    },
    setcheckInvoice (state, invoice) {
      state.checkedInvoice = invoice
    },
    setcheckCabAddress (state, addr) {
      state.checkedCabAddress = addr
    },
  },
  strict: process.env.NODE_ENV !== 'production',
})
