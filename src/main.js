// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Qs from 'qs'
import ElementUI from 'element-ui'
import store from './store'
// import './mock'
import './icons' // icon
import './permission' // 检查权限
import vueWaves from './components/waves' // 水波纹指令

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.qs = Qs

let bus = new Vue()
Vue.prototype.bus = bus
// 引入ElementUI
import '@/assets/css/element-#0BBA6B/index.css'
Vue.use(ElementUI)
Vue.use(vueWaves)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
