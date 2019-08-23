import Vue from 'vue'
import App from './App.vue'
import ELementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入axios
import axios from 'axios'
import router from '@/router'
// prototype 原型
Vue.prototype.$http = axios

Vue.use(ELementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
