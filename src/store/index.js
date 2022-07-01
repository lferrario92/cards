import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    player: {
      health: 100,
      energy: 4,
      shield: 0,
    },
    currentEnemy: {
      stats: {
        health: 100,
        energy: 4,
        shield: 0
      }
    }
  },
  getters: {
    getPlayerStatus: state => {
      return state.player
    },
    getCurrentEnemy: state => {
      return state.currentEnemy
    }
  },
  mutations: {
    damageMutation (state, damage) {
      /* eslint-disable */
      if (state.currentEnemy.stats.shield) {
        if ((state.currentEnemy.stats.shield - damage) >= 0) {
          state.currentEnemy.stats.shield -= damage
        } else {
          state.currentEnemy.stats.health = state.currentEnemy.stats.health - (damage - state.currentEnemy.stats.shield)
          state.currentEnemy.stats.shield = 0
        }
      } else {
        state.currentEnemy.stats.health = state.currentEnemy.stats.health - (damage)
      }
    },
    energyMutation (state, energy) {
      state.player.energy += energy
    },
    shieldMutation (state, shield) {
      state.player.shield += shield
    },
    setEnemy (state, enemy) {
      state.currentEnemy = enemy
    }
  },
  actions: {
  },
  modules: {
  }
})
