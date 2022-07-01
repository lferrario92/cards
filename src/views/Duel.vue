<template>
  <div class="duel" v-if="loaded">
    <h1>it's time to duel</h1>
    <div>
      player = {{ getPlayerStatus }}
    </div>
    <div v-if="getCurrentEnemy">
      enemy: {{ getCurrentEnemy }}
    </div>
    <div
      v-if="battleEnded"
    >
      {{ result.message }}
    </div>
    <div>
      <draggable class="field" group="cards" :list="field">
        field
      </draggable>
    </div>
    <div>
      your hand

      <div>
        <draggable :list="hand" group="cards" draggable=".card"  style="display: flex; justify-content: center;">
          <card
            v-for="(card, index) in hand"
            :card="card"
            :key="index"
          />
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'
  import draggable from 'vuedraggable'
  import card from '@/components/card.vue'

  export default {
    components: {
      card,
      draggable
    },
    computed: {
      ...mapGetters([
        'getPlayerStatus', 'getCurrentEnemy'
      ]),
    },
    data () {
      return {
        loaded: false,
        hand: [],
        field: [],
        battleEnded: false,
        result: '',
        results: {
          won: {
            message: 'You won!'
          }
        }
      }
    },
    mounted () {
      /* eslint-disable */
      axios({url: '/deck.json', method: 'get'}).then(res => {
        this.hand = res.data
      }).finally(() => {
        this.loaded = true
      })
    },
    methods: {
      endDuel (result) {
        this.result = this.results[result]
        this.battleEnded = true
        this.$store.commit('setEnemy', null)
      }
    },
    watch: {
      field: {
        handler (change) {
          console.log(change)
          if (!this.field.length) return
          let mods = this.field[0].modifiers
          Object.keys(mods).forEach(mod => {
            this.$store.commit(`${mod}Mutation`, mods[mod])
          })
          if (this.getCurrentEnemy.stats.health <= 0) {
            this.endDuel('won')
          }
          if (this.field[0].durability == 1) {
            this.field = []
            return
          }
          this.field[0].durability--
          this.hand.push(this.field.pop())
          this.field = []
        }
      }
    }
  }
</script>

<style>
  .field {
    display: inline-block;
    width: 400px;
    height: 300px;
    border: solid 1px black;
    margin-bottom: 15px;
  }
</style>
