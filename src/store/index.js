import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import groceries from './modules/groceries'
import createLogger from '../plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    cart,
    groceries
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
