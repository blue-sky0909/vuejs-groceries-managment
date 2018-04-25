import Vue from 'vue'
import _ from 'lodash'

// initial state
const state = {
  all: [
    { fridge: 1, amount: 40, grocery: 'Egg' },
    { fridge: 2, amount: 21, grocery: 'Pork' }
  ]
}

// getters
const getters = {
  allGroceries: state => state.all
}

// actions
const actions = {
  getGroceries ({ commit, state }) {
    commit('setGroceries', state.all)
  },

  setProduct ({ commit, state }, product) {
  //  const allgroceries = state.all
    console.log(commit)
    console.log(state)
    console.log(product)
  },

  deleteGrocery ({ commit, state }, product) {
    commit('deleteGrocery', product)
  }
}

// mutations
const mutations = {
  setGroceries (state, groceries) {
    state.all = groceries
  },
  deleteGrocery (state, product) {
    const index = _.findIndex(state.all, product)
    if (index > -1) {
      Vue.delete(state.all, index)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
