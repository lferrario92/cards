<template>
  <div class="duel" v-if="loaded">
    <h1>it's time to duel</h1>
    <div>
      player = {{ getPlayerStatus }}
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
        'getPlayerStatus',
      ]),
    },
    data () {
      return {
        loaded: false,
        hand: [
          {
            name: 'test',
            img: 'img',
            desc: '1 damage, -1 energy',
            modifiers: {
              damage: 1,
              energy: -1
            }
          },
          {
            name: 'test',
            img: 'img',
            desc: '1 shield, -1 energy',
            modifiers: {
              damage: 0,
              energy: -1,
              shield: 2
            }
          },
          {
            name: 'test2',
            img: 'img2',
            desc: '0 damage, +1 energy',
            modifiers: {
              damage: 0,
              energy: 1
            }
          },
          {
            name: 'Gandalf',
            img: 'https://upload.wikimedia.org/wikipedia/en/e/e9/Gandalf600ppx.jpg',
            desc: '99 damage, +10 energy',
            modifiers: {
              damage: 99,
              energy: 10
            }
          },
        ],
        field: []
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
    watch: {
      field: {
        handler (change) {
          console.log(change)
          let mods = this.field[0].modifiers
          Object.keys(mods).forEach(mod => {
            this.$store.commit(`${mod}Mutation`, mods[mod])
          })
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
