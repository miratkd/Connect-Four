<template>
    <div class="math-container">
        <div class="math-header-container">
            <button class="math-header-button">Menu</button>
            <img  src="@/assets/menuIcon.svg" alt="">
            <button class="math-header-button">Restart</button>
        </div>
        <div class="math-body-container">
            <PlayerStatus player="1" name="player 1"/>
            <MathBoard :player="player" :changePlayer="changePlayer"/>
            <PlayerStatus player="2" name="player 2"/>
        </div>
        <div class="math-round-container">
            <img class="math-round-icon" v-show="player == 1" src="@/assets/round-icon.svg" alt="">
            <img class="math-round-icon" v-show="player == 2" src="@/assets/round-icon-yellow.svg" alt="">
            <div class="math-round-text-container">
               <h3 class="math-round-text">{{ player == 1 ? 'Jogador 1' : 'Jogador 2' }}</h3>
               <h2 class="math-round-text">{{time}}s</h2> 
            </div>
            
        </div>
    </div>
</template>

<script>
import PlayerStatus from '@/components/PlayerStatus.vue';
import MathBoard from '@/components/MathBoard.vue';

export default {
    name: 'MathView',
    components:{
        PlayerStatus,
        MathBoard
    },
    data () {
        return {
            player: 1,
            time: 50,
            round: 1
        }
    },
    watch:{
        round (newValue){
            console.log('Round: ' + newValue);
        }
    },
    methods:{
        changePlayer() {
            if (this.player == 1) this.player = 2
            else this.player = 1
            this.round++
            this.reduceTime(50, this.round)
        },
        reduceTime(localTime, localRound) {
            this.time = localTime
            localTime--
            setTimeout(() => {
                if (localTime > 0 && localRound == this.round) {
                    this.reduceTime(localTime, localRound)
                } else if (localRound == this.round) {
                    this.changePlayer()
                }
            }, 1000);
        }
    },
    mounted () {
        this.reduceTime(50, 1)
    }
}
</script>

<style scoped>
.math-container{
    min-height: 100vh;
    background-color: #7945FF;
}
.math-header-container{
    display: flex;
    justify-content: space-evenly;
    padding-top: 5vh;
    align-items: center;
}
.math-header-button{
    color: white;
    font-size: 1em;
    background-color: #5C2DD5;
    text-transform: uppercase;
    padding: 1vh 2vw;
    border: none;
    border-radius: 10px;
    cursor: pointer;
}
.math-header-button:hover{
    background-color: #FD6687;
}
.math-body-container{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5vh;
}
.math-round-container{
    display: flex;
    justify-content: center;
    min-height: 180px;
}
.math-round-icon{
    position: absolute;
    z-index: 6;
    margin-top: -5vh;
}
.math-round-text{
    color: white;
    z-index: 7;
}
.math-round-text-container{
    position: absolute;
    z-index: 7;
    text-align: center;
}

@media screen and (max-width: 550px) and (orientation: Portrait) {
    .math-round-icon{
        margin-top: -4vh;
    }
    .math-round-text-container{
        margin-top: 3vh;
    }
}
</style>