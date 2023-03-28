import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/config/core/lazy_use' // ant-design-vue 的引入 以及默认配置
import {version} from '../package.json'
import './logger'

Vue.config.productionTip = false
Vue.prototype.VERSION = version
Vue.__proto__.VERSION = version

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
