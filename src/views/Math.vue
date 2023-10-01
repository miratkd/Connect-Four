<template>
    <div class="math-container">
        <div class="math-header-container">
            <button class="math-header-button" v-on:click="() => showMenuAlert = true">Menu</button>
            <img  src="@/assets/menuIcon.svg" alt="">
            <button class="math-header-button" v-on:click="restartAlertClick()">Restart</button>
        </div>
        <div class="math-mobile-status">
            <PlayerStatus :isMobile="true" player="1" name="player 1" :score="player1Score"/>
            <PlayerStatus :isMobile="true" player="2" name="player 2" :score="player2Score"/>
        </div>
        <div class="math-body-container">
            <PlayerStatus player="1" name="player 1" :score="player1Score"/>
            <MathBoard :isCpuMatch="isCpuMatch" :playerWin="playerWin" v-if="showBoard" :player="player" :changePlayer="changePlayer"/>
            <div v-else class="math-board-placeholder"></div>
            <PlayerStatus :player="isCpuMatch ? 'cpu' : 2" :name="isCpuMatch ? 'CPU' : 'player 2'" :score="player2Score"/>
        </div>
        <div class="math-round-container" v-if="!roundWinner">
            <img class="math-round-icon" v-show="player == 1" src="@/assets/round-icon.svg" alt="">
            <img class="math-round-icon" v-show="player == 2" src="@/assets/round-icon-yellow.svg" alt="">
            <div class="math-round-text-container">
               <h3 class="math-round-text">{{ player == 1 ? 'Jogador 1' : 'Jogador 2' }}</h3>
               <h2 class="math-round-text">{{time}}s</h2> 
            </div>
        </div>
        <div class="math-round-container" v-else>
            <div class="math-round-winner">
                <h3 >{{ roundWinner == 1 ? 'Jogador 1' : 'Jogador 2' }}</h3>
                <h1 >Vitoria</h1> 
                <button class="math-header-button" v-on:click="restartBoard()">Jogar de novo</button>
            </div>
        </div>
        <div class="math-footer-container">
            <div class="math-footer" :style="getFooterBackground()"></div>
        </div>

        <RestartAlert v-if="showRestartAlert" :close="() => showRestartAlert = false" :submit="restartGame" />
        <MenuAlert v-if="showMenuAlert" :close="() => showMenuAlert = false" :submit="cancelGame" />
    </div>
</template>

<script>
import PlayerStatus from '@/components/PlayerStatus.vue';
import MathBoard from '@/components/MathBoard.vue';
import RestartAlert from '@/components/RestartAlert.vue';
import MenuAlert from '@/components/MenuAlert.vue'

export default {
    name: 'MathView',
    components:{
        PlayerStatus,
        MathBoard,
        RestartAlert,
        MenuAlert
    },
    data () {
        return {
            player: 1,
            player1Score: 0,
            player2Score: 0,
            time: 50,
            round: 1,
            showBoard: true,
            runTimer: true,
            roundWinner: undefined,
            showRestartAlert: false,
            showMenuAlert: false,
            isCpuMatch: false
        }
    },
    methods:{
        getFooterBackground () {
            if(this.roundWinner == 1) return 'background-color: #FD6687'
            else if (this.roundWinner == 2) return 'background-color: #FFCE67'
        },
        playerWin (player) {
            if (player == 1) this.player1Score++
            else this.player2Score++
            this.runTimer = false
            this.roundWinner = player
        },
        cancelGame () {
            this.$router.push('/')
        },
        restartAlertClick () {
            this.showRestartAlert = true
        },
        restartGame () {
            this.player1Score = 0
            this.player2Score = 0
            this.restartBoard()
        },
        restartBoard () {
            this.showBoard = false
            setTimeout(() => {
                this.showBoard = true
                this.roundWinner = undefined
                this.runTimer = true
                this.round = 1
                this.reduceTime(50, 1)
                this.showRestartAlert = false
            }, 50);
        },
        changePlayer() {
            if (this.player == 1) this.player = 2
            else this.player = 1
            this.round++
            this.reduceTime(50, this.round)
        },
        reduceTime(localTime, localRound) {
            if (!this.runTimer) return
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
        console.log('init');
        if(this.$route.params.cpu) this.isCpuMatch = true
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
.math-mobile-status{
    display: none;
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
    gap: 2vw;
}
.math-round-container{
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
}
.math-round-icon{
    position: absolute;
    z-index: 6;
    margin-top: -5vh;
    height: 15vh;
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
.math-board-placeholder{
    width: 632px;
    height: 594px;
}
.math-footer{
    background-color: #5C2DD5;
    min-height: 30vh;
    border-radius: 70px 70px 0 0;
}
.math-round-winner{
    background-color: white;
    border: 2px solid black;
    box-shadow: 0 0.4em black;
    min-height: 150px;
    width: 20vw;
    position: absolute;
    z-index: 6;
    margin-top: -5vh;
    border-radius: 20px;
    text-align: center;
    padding: 1vh 0;
}
.math-footer-container{
    position: absolute;
    top: 20vh;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column-reverse;
}

@media screen and (min-height: 850px) {
    .math-footer-container{
        height: 80vh;
    }
    .math-footer{
        min-height: 25vh;
    }
}

@media screen and (max-width: 1050px) and (orientation: Portrait){
    .math-round-winner{
        width: 40vw;
    }
    .math-mobile-status{
        display: flex;
        justify-content: center;
        gap: 5vw;
        margin-top: 5vh;
    }
}
@media screen and (max-width: 550px) and (orientation: Portrait) {
    .math-round-icon{
        margin-top: -4vh;
    }
    .math-round-text-container{
        margin-top: 1vh;
    }
    .math-footer-container{
        height: 85vh;
    }
    .math-round-winner{
        width: 60vw;
    }
}
</style>