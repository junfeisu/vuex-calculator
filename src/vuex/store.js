import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0
}

const mutations = {
  INCREAMENT (state, amount) {
    state.count = amount[0][0] + amount[0][1]
  },
  DECREAMENT (state, amount) {
    state.count = amount[0][0] - amount[0][1]
  },
  MULTIPLY (state, amount) {
    state.count = amount[0][0] * amount[0][1]
  },
  DIVIDE (state, amount) {
    state.count = amount[0][0] / amount[0][1]
  }
}

export default new Vuex.Store({
  state,
  mutations
})
