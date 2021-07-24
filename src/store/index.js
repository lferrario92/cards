import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    health: 100,
    energy: 4
  },
  getters: {
    getPlayerStatus: state => {
      return `health: ${state.health}, energy: ${state.energy}`
    }
  },
  mutations: {
    damageMutation (state, damage) {
      state.health -= damage
    },
    energyMutation (state, energy) {
      state.energy += energy
    }
  },
  actions: {
  },
  modules: {
  }
})
