<template>
    <div class="board-container">
        <img class="board-img1" src="@/assets/blackLayer.svg" alt="">
        <img class="board-img2" src="@/assets/whiteLayer.svg" alt="">

        <img v-for="coin in coins" :key="coin.id" :id="`yellow-coin-${coin.id}`" class="board-coin" src="@/assets/yellowCoin.svg" alt="">
        <img v-for="coin in coins" :key="coin.id" :id="`pink-coin-${coin.id}`" class="board-coin" src="@/assets/pinkCoin.svg" alt="">

        <div class="coin-hitbox" :data-test="'hitbox-'+coin.id" v-on:click="userCoinClick(coin)" v-on:mouseleave="hitboxleave(coin.position.x)" v-on:mouseover="hitboxHover(coin.position.x)" :style="getCoinPosition(coin.position.x, coin.position.y)" v-for="coin in coins" :key="coin.id"></div>

        <img v-for="number in [0,1,2,3,4,5,6]" :key="number" :id="'hover-id-'+number" :style="'left: ' + xPosition[number] + '%'" class="math-hover-icon" src="@/assets/hoverIcon.svg" alt="">
        <div v-for="winnerCoin in winnerCoins" :key="winnerCoin.id" :style="getCoinPosition(winnerCoin.position.x, winnerCoin.position.y)" class="coin-win-icon"></div>
    </div>
</template>

<script>
export default {
    name:'MathBoard',
    props:['player', 'changePlayer', 'playerWin', 'isCpuMatch'],
    data () {
        return {
            xPosition: [3, 16.5, 30.5, 44.5, 58.4, 72.3, 86.3],
            yPosition: [3, 17.5, 32.5, 47.7, 62.5, 77],
            coins: [],
            isOver: false,
            winnerCoins: []
        }
    },
    watch:{
        player () {
            if (this.isCpuMatch && this.player != 1) setTimeout(this.cpuCoinClick, 1500);
        }
    },
    methods:{
        getCoinPosition (x,y){
            return `top: ${this.yPosition[y]}%; left: ${this.xPosition[x]}%;`
        },
        userCoinClick (coin) {
            if (this.isCpuMatch && this.player != 1) return
            this.coinClick(coin)
        },
        cpuCoinClick () {
            const nextMove = this.testVerticalLine()
            const nextMove2 = this.testHorizontalLine()
            if (nextMove || nextMove2) {
                if (nextMove) this.coinClick(nextMove)
                else if (nextMove2) this.coinClick(nextMove2)
                return
            } else {
                // click random coin
                let xList = [0,1,2,3,4,5,6]
                for (let index = 0; index < 7; index++) {
                    const tryNumber = this.getRndInteger(0,xList.length)
                    const tryCoin = this.getColumHeigth(xList[tryNumber])
                    if (tryCoin){
                        this.coinClick(this.coins[xList[tryNumber]])
                        break
                    }
                    xList.splice(tryNumber,1)
                }
            }

            
        },
        getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min) ) + min;
        },
        testHorizontalLine () {
            for (let y = 5; y > -1; y--) {
                let coinInit = undefined
                let coinStreak = 0
                for (let x = 0; x < 7; x++){
                    if (this.coins[x + y * 7].player) {
                        if (!coinInit){
                            coinInit = this.coins[x + y * 7]
                            coinStreak++
                        } else if (coinInit.player == this.coins[x + y * 7].player){
                            coinStreak++
                        } else {
                            coinInit = this.coins[x + y * 7]
                            coinStreak = 1
                        }
                    } else {
                        coinInit = undefined
                        coinStreak = 0
                    }
                    if (coinStreak == 3) {
                        break
                    }
                }
                if (coinStreak == 3) {
                    if (coinInit.position.y < 5 && coinInit.position.x < 4 && !this.coins[coinInit.position.x+3 + coinInit.position.y * 7].player && this.coins[coinInit.position.x+3 + coinInit.position.y+1 * 7].player){
                        return this.coins[coinInit.position.x+3 + coinInit.position.y * 7]
                    }
                    if (coinInit.position.y < 5 && coinInit.position.x > 0 && !this.coins[coinInit.position.x-1 + coinInit.position.y * 7].player && this.coins[coinInit.position.x-1 + coinInit.position.y+1 * 7].player){
                        return this.coins[coinInit.position.x-1 + coinInit.position.y * 7]
                    }if (coinInit.position.x > 0 && !this.coins[coinInit.position.x-1 + coinInit.position.y * 7].player){
                        return this.coins[coinInit.position.x-1 + coinInit.position.y * 7]
                    }if (coinInit.position.x < 4 && !this.coins[coinInit.position.x+3 + coinInit.position.y * 7].player){
                        return this.coins[(coinInit.position.x+3) + coinInit.position.y * 7]
                    }
                }
            }
        },
        testVerticalLine(){
            for (let x = 0; x < 7; x++) {
                let lastCoin = undefined
                let coinStreak = 0
                let resp = undefined
                for (let y = 5; y > -1; y--) {
                    const coin = this.coins[x + y * 7].player
                    if (!coin) break
                    if (!lastCoin && coinStreak == 0) {
                        lastCoin = coin
                        coinStreak++
                    } else if (lastCoin == coin) coinStreak++
                    else {
                        lastCoin = coin
                        coinStreak = 1
                    }
                }
                if (coinStreak == 3) resp = this.getColumHeigth(x)
                if (resp) {
                    return resp
                }
            }
        },
        coinClick (coin) {
            coin = this.getColumHeigth(coin.position.x)
            if (!coin) return
            if(this.isOver) return
            let element = undefined
            if (this.player == 1) element = document.getElementById('pink-coin-'+ coin.id)
            else element = document.getElementById('yellow-coin-'+ coin.id)
            
            coin.player = this.player
            element.style.display = 'block'
            element.style.top = '-15%'
            element.style.left = this.xPosition[coin.position.x] + '%'
            setTimeout(() => {
                element.style.top = this.yPosition[coin.position.y] + '%'
                this.testWin(coin)
                this.changePlayer()
            }, 100);
        },
        testWin(coin) {
            let isWin = false
            let winnerCoins = []
            let xLine = [coin]
            let accendLine = [coin]
            let descendLine = [coin]
            // pegar valores a direita
            if (coin.position.x + 1 < 7 && this.coins[(coin.position.x+1) + coin.position.y * 7].player == coin.player) {
                xLine.push(this.coins[(coin.position.x+1) + coin.position.y * 7])
                if (coin.position.x + 2 < 7 && this.coins[(coin.position.x+2) + coin.position.y * 7].player == coin.player) {
                    xLine.push(this.coins[(coin.position.x+2) + coin.position.y * 7])
                    if (coin.position.x + 3 < 7 && this.coins[(coin.position.x+3) + coin.position.y * 7].player == coin.player) {
                        xLine.push(this.coins[(coin.position.x+3) + coin.position.y * 7])
                    }
                }
            }
            // pegar valores a Direita-Cima
            if (coin.position.x + 1 < 7 && coin.position.y - 1 > -1 && this.coins[(coin.position.x+1) + (coin.position.y-1) * 7].player == coin.player){
                accendLine.push(this.coins[(coin.position.x+1) + (coin.position.y-1) * 7])
                if (coin.position.x + 2 < 7 && coin.position.y - 2 > -1 && this.coins[(coin.position.x+2) + (coin.position.y-2) * 7].player == coin.player){
                    accendLine.push(this.coins[(coin.position.x+2) + (coin.position.y-2) * 7])
                    if (coin.position.x + 3 < 7 && coin.position.y - 3 > -1 && this.coins[(coin.position.x+3) + (coin.position.y-3) * 7].player == coin.player){
                        accendLine.push(this.coins[(coin.position.x+3) + (coin.position.y-3) * 7])
                    }
                }
            }
            // pegar valores Direita-Baixo
            if(coin.position.x + 1 < 7 && coin.position.y + 1 < 6 && this.coins[(coin.position.x+1) + (coin.position.y+1) * 7].player == coin.player){
                descendLine.push(this.coins[(coin.position.x+1) + (coin.position.y+1) * 7])
                if(coin.position.x + 2 < 7 && coin.position.y + 2 < 6 && this.coins[(coin.position.x+2) + (coin.position.y+2) * 7].player == coin.player){
                    descendLine.push(this.coins[(coin.position.x+2) + (coin.position.y+2) * 7])
                    if(coin.position.x + 3 < 7 && coin.position.y + 3 < 6 && this.coins[(coin.position.x+3) + (coin.position.y+3) * 7].player == coin.player){
                        descendLine.push(this.coins[(coin.position.x+3) + (coin.position.y+3) * 7])
                    }
                }
            }
            // pegar valores a esquerda
            if (coin.position.x - 1 > -1 && this.coins[(coin.position.x-1) + coin.position.y * 7].player == coin.player) {
                xLine.push(this.coins[(coin.position.x-1) + coin.position.y * 7])
                if (coin.position.x - 2 > -1 && this.coins[(coin.position.x-2) + coin.position.y * 7].player == coin.player){
                    xLine.push(this.coins[(coin.position.x-2) + coin.position.y * 7])
                    if (coin.position.x - 3 > -1 && this.coins[(coin.position.x-3) + coin.position.y * 7].player == coin.player){
                        xLine.push(this.coins[(coin.position.x-3) + coin.position.y * 7])
                    }
                }
            }
            // pegar valores a esquerda-cima
            if(coin.position.x - 1 > -1 && coin.position.y - 1 > -1 && this.coins[(coin.position.x-1) + (coin.position.y-1) * 7].player == coin.player ) {
                descendLine.push(this.coins[(coin.position.x-1) + (coin.position.y-1) * 7])
                if(coin.position.x - 2 > -1 && coin.position.y - 2 > -1 && this.coins[(coin.position.x-2) + (coin.position.y-2) * 7].player == coin.player ) {
                    descendLine.push(this.coins[(coin.position.x-2) + (coin.position.y-2) * 7])
                    if(coin.position.x - 3 > -1 && coin.position.y - 3 > -1 && this.coins[(coin.position.x-3) + (coin.position.y-3) * 7].player == coin.player ) {
                        descendLine.push(this.coins[(coin.position.x-3) + (coin.position.y-3) * 7])
                    }
                }
            }
            // pegar valores esquerda-baixo
            if(coin.position.x - 1 > -1 && coin.position.y + 1 < 6 && this.coins[(coin.position.x-1) + (coin.position.y+1) * 7].player == coin.player){
                accendLine.push(this.coins[(coin.position.x-1) + (coin.position.y+1) * 7])
                if(coin.position.x - 2 > -1 && coin.position.y + 2 < 6 && this.coins[(coin.position.x-2) + (coin.position.y+2) * 7].player == coin.player){
                    accendLine.push(this.coins[(coin.position.x-2) + (coin.position.y+2) * 7])
                    if(coin.position.x - 3 > -1 && coin.position.y + 3 < 6 && this.coins[(coin.position.x-3) + (coin.position.y+3) * 7].player == coin.player){
                        accendLine.push(this.coins[(coin.position.x-3) + (coin.position.y+3) * 7])
                    }
                }
            }
            // pegar valores pra baixo
            if(coin.position.y < 3 && 
            this.coins[(coin.position.x) + (coin.position.y+1) * 7].player == coin.player &&
            this.coins[(coin.position.x) + (coin.position.y+2) * 7].player == coin.player &&
            this.coins[(coin.position.x) + (coin.position.y+3) * 7].player == coin.player) {
                isWin = true
                winnerCoins = [
                    coin,
                    this.coins[(coin.position.x) + (coin.position.y+1) * 7],
                    this.coins[(coin.position.x) + (coin.position.y+2) * 7],
                    this.coins[(coin.position.x) + (coin.position.y+3) * 7]
                ]
            }

            if(xLine.length > 3) {
                isWin = true
                winnerCoins = xLine
            }
            if(accendLine.length > 3) {
                isWin = true
                winnerCoins = accendLine
            }
            if(descendLine.length > 3) {
                isWin = true
                winnerCoins = descendLine
            }
            if (isWin) {
                this.isOver = true
                setTimeout(() => {
                    this.playerWin(coin.player)
                    this.winnerCoins = winnerCoins
                }, 1400);
                
            }
        },
        getColumHeigth (x) {
            let resp = 0
            let columCoins = [
                this.coins[ x + 35],
                this.coins[ x + 28],
                this.coins[ x + 21],
                this.coins[ x + 14],
                this.coins[ x + 7],
                this.coins[ x ],
            ]
            for (let index = 0; index < columCoins.length; index++) {
                const element = columCoins[index];
                if (element.player) resp++
            }
            return columCoins[resp]
        },
        hitboxHover (x) {
            document.getElementById('hover-id-' + x).style.display = 'block'
        },
        hitboxleave (x) {
            document.getElementById('hover-id-' + x).style.display = 'none'
        }
    },
    beforeMount () {
        let x = 0
        let y = 0
        for (let index = 0; index < 42; index++) {
            this.coins.push({
                id: index,
                player: undefined,
                position: {x:x,y:y}
            })
            if (x == 6){
                x=0
                y++
            } else x++
        }
    },
    created () {
        if (this.isCpuMatch && this.player != 1) setTimeout(this.cpuCoinClick, 500);
    }
}
</script>

<style scoped>
.board-container{
    width: 632px;
    height: 594px;
    position: relative;
}
.board-img1{
    position: absolute;
    z-index: 1;
    width: 632px;
    height: 594px;
}
.board-img2{
    position: absolute;
    z-index: 3;
    height: 584px;
    width: 632px;
}
.board-coin{
    position: absolute;
    z-index: 2;
    transition: top 1.5s;
    display: none;
}
.coin-hitbox{
    width: 65px;
    height: 65px;
    border-radius: 50%;
    position: absolute;
    z-index: 4;
    cursor: pointer;
    top: 3%;
    left: 3%;
}
.math-hover-icon{
    position: absolute;
    z-index: 8;
    margin-top: -7%;
    margin-left: 2%;
    display: none;
}
.coin-win-icon{
    border: 5px solid white;
    border-radius: 50%;
    width: 34px;
    height: 34px;
    position: absolute;
    z-index: 8;
    margin-top: 2%;
    margin-left: 2%;
}

@media screen and (max-width: 1050px) and (orientation: Portrait){
    .math-hover-icon{
        visibility: hidden;
    }
}

@media screen and (max-width: 550px) and (orientation: Portrait) {
    .board-container{
        height: 310px;
        width: 335px;
    }
    .board-img1{
        height: 310px;
        width: 335px;
    }
    .board-img2{
        height: 310px;
        width: 335px;
    }
    .board-coin{
        width: 38px;
        height: 38px;
        margin-top: 1%;
    }
    .coin-hitbox{
        width: 38px;
        height: 38px;
        margin-top: 1%;
    }
    .coin-win-icon{
        width: 15px;
        height: 15px;
        margin-top: 2.5%;
    }
}
</style>