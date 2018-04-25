import Vue from 'vue'
import Vuex from 'vuex'
import groceries from './modules/groceries'
import createLogger from '../plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    groceries
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
