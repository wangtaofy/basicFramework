import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
// 按需引入element-ui
import { Button } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import util from './assets/js/util'

Vue.prototype.$ELEMENT = { size: 'mini', zIndex: 3000 }
Vue.use(Button)
Vue.prototype.$util = util

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
