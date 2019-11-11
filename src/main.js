import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 按需引入element-ui
import { Button } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$ELEMENT = { size: 'mini', zIndex: 3000 }
Vue.use(Button)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
