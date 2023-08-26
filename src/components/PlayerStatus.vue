<template>
    <div class="player-status-container">
        <img v-if="player == '1'" class="player-status-icon" src="@/assets/player-one.svg" alt="">
        <img v-if="player == '2'" class="player-status-icon" src="@/assets/player-two.svg" alt="">
        <img v-if="player == 'cpu'" class="player-status-icon" src="@/assets/cpu.svg" alt="">
        <h3 style="margin-top: 1vh;">{{ name }}</h3>
        <h1>{{ score }}</h1>
    </div>
</template>

<script>
export default {
    name: 'PlayerStatus',
    props:['player', 'name', 'score']
}
</script>

<style scoped>
.player-status-container{
    background-color: white;
    height: 18vh;
    width: 10vw;
    border: 2px solid black;
    box-shadow: 0 0.4em black;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.player-status-icon{
    width: 35%;
    margin-top: -15%;
}

@media screen and (((max-width: 1050px) and (orientation: Portrait)) or ((max-width: 800px) and (orientation: landscape)))  {
  .player-status-container{
    display: none;
  }
}
</style>