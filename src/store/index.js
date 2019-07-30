import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import menu from './modules/menu'
import appData from './modules/app-data'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    menu,
    appData
  },
  // strict: debug
  plugins: debug ? [createLogger()] : []
})
