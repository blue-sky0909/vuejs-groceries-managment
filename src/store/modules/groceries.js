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
  addGrocery ({ commit, state }, grocery) {
    commit('addGrocery', grocery.grocery)
  },
  deleteGrocery ({ commit, state }, grocery) {
    commit('deleteGrocery', grocery)
  }
}

// mutations
const mutations = {
  setGroceries (state, groceries) {
    state.all = groceries
  },
  deleteGrocery (state, grocery) {
    const index = _.findIndex(state.all, grocery)
    if (index > -1) {
      Vue.delete(state.all, index)
    }
  },
  addGrocery (state, grocery) {
    const groceryIndex = _.findIndex(state.all, (item) => {
      return item.fridge === grocery.fridge && item.grocery === grocery.grocery
    })
    if (groceryIndex > -1) {
      state.all[groceryIndex].amount = parseFloat(state.all[groceryIndex].amount) + parseFloat(grocery.amount)
    } else {
      state.all.push(grocery)
    }
    console.log(state.all)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
