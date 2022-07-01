<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div>
      <ul>
        <li
          v-for="(enemy, index) in enemies"
          :key="index"
          @click="selectEnemy(index)"
        >
          {{ enemy.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      enemies: []
    }
  },
  mounted () {
    axios({url: '/enemies.json', method: 'get'}).then(res => {
      this.enemies = res.data
    }).finally(() => {
      this.loaded = true
    })
  },
  methods: {
    selectEnemy (index) {
      this.$store.commit('setEnemy', this.enemies[index])

      this.$router.push({name: 'duel'})
    }
  }
}
</script>
