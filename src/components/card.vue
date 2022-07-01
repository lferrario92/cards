<template>
  <div class="card">
    <div class="cardName">{{ card.name }}</div>
    <div class="cardImg">
      <img class="cardImg" :src="card.img" alt="">
    </div>
    <div class="cardDesc">{{ card.desc }}</div>
    <div class="cardDesc">Durability: {{ card.durability }}</div>
  </div>
</template>

<script>
  export default {
    props: {
      card: {
        required: true
      }
    }
  }
</script>

<style>
  .card {
    border: solid 1px black;
    border-radius: 3px;
    padding: 8px;
    margin: 2px;
    width: 150px;
    min-height: 250px;
  }
  .cardImg {
    max-width: 100%;
  }
</style>
