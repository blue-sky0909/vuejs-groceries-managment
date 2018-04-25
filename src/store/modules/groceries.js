import Vue from 'vue'
import _ from 'lodash'

// initial state
const state = {
  all: []
}

// getters
const getters = {
  allGroceries: state => state.all
}

// actions
const actions = {
  getGroceries ({ commit }) {
    commit('getGroceries')
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
      if (state.all[index].amount > 1) {
        state.all[index].amount--
      } else {
        Vue.delete(state.all, index)
      }
      localStorage.setItem('groceries', JSON.stringify(state.all))
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
    localStorage.setItem('groceries', JSON.stringify(state.all))
  },
  getGroceries (state) {
    state.all = JSON.parse(localStorage.getItem('groceries'))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
