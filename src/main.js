// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookie from 'vue-cookie'
import MintUI from 'mint-ui'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import {CONFIG} from './assets/js/config/index.js'
import store from './store'

Vue.config.productionTip = false

Vue.$http = Vue.prototype.$http = axios
Vue.use(MintUI);
Vue.use(VueCookie);
Vue.use(VueAwesomeSwiper);
Vue.use(CONFIG);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
