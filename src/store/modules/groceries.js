import Vue from 'vue'
import _ from 'lodash'

// initial state
const state = {
  all: [],
  preGroceries: [],
  applyFlag: false
}

// getters
const getters = {
  allGroceries: state => state.all,
  preGroceries: state => state.preGroceries
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
  },
  oneToTwo  ({ commit, state }, grocery) {
    commit('oneToTwo', grocery)
  },
  twoToOne  ({ commit, state }, grocery) {
    commit('twoToOne', grocery)
  },
  apply ({ commit }) {
    commit('apply')
  },
  format ({ commit }) {
    commit('format')
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
    let groceries = state.all
    const groceryIndex = _.findIndex(groceries, (item) => {
      return item.fridge === grocery.fridge && item.grocery.toLowerCase() === grocery.grocery.toLowerCase()
    })
    if (groceryIndex > -1) {
      groceries[groceryIndex].amount = parseFloat(groceries[groceryIndex].amount) + parseFloat(grocery.amount)
    } else {
      groceries.push(grocery)
    }
    state.all = groceries
    localStorage.setItem('groceries', JSON.stringify(state.all))
  },
  getGroceries (state) {
    if (!_.isNil(localStorage.getItem('groceries'))) {
      state.all = JSON.parse(localStorage.getItem('groceries'))
    }
  },
  oneToTwo (state, grocery) {
    const index = _.findIndex(state.preGroceries, grocery.grocery)
    const sameIndex = _.findIndex(state.preGroceries, (item) => {
      return item.fridge === 2 && item.grocery.toLowerCase() === grocery.grocery.grocery.toLowerCase()
    })
    if (index > -1) {
      state.preGroceries[index].fridge = 2
    }
    if (sameIndex > -1) {
      state.preGroceries[sameIndex].amount = parseFloat(state.preGroceries[sameIndex].amount) + parseFloat(grocery.grocery.amount)
      Vue.delete(state.preGroceries, index)
    }
  },
  twoToOne (state, grocery) {
    const index = _.findIndex(state.preGroceries, grocery.grocery)
    const sameIndex = _.findIndex(state.preGroceries, (item) => {
      return item.fridge === 1 && item.grocery.toLowerCase() === grocery.grocery.grocery.toLowerCase()
    })
    console.log(state.preGroceries)
    if (index > -1) {
      state.preGroceries[index].fridge = 1
    }
    if (sameIndex > -1) {
      state.preGroceries[sameIndex].amount = parseFloat(state.preGroceries[sameIndex].amount) + parseFloat(grocery.grocery.amount)
      Vue.delete(state.preGroceries, index)
    }
  },
  apply (state) {
    state.all = state.preGroceries
    this.applyFlag = true
    localStorage.setItem('groceries', JSON.stringify(state.all))
  },
  format (state) {
    state.preGroceries = _.cloneDeep(state.all)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
