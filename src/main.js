import Vue from 'vue'
import App from './App.vue'
import router from './routers/router'
import iView from 'iview'
import store from '@/store'
import 'iview/dist/styles/iview.css'
import './styles/reset.css'

Vue.use(iView)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
