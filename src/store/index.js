import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    health: 100,
    energy: 4,
    shield: 0
  },
  getters: {
    getPlayerStatus: state => {
      return `health: ${state.health}, energy: ${state.energy}, shield: ${state.shield}`
    }
  },
  mutations: {
    damageMutation (state, damage) {
      if (state.shield) {
        if ((state.shield - damage) >= 0) {
          state.shield -= damage
        } else {
          state.health = state.health - (damage - state.shield)
          state.shield = 0
        }
      }
    },
    energyMutation (state, energy) {
      state.energy += energy
    },
    shieldMutation (state, shield) {
      state.shield += shield
    }
  },
  actions: {
  },
  modules: {
  }
})
