<template>
    <div data-test="menu-buttom" class="menu-button-container" :class="getContainerClass()" v-on:click="action()">
        <h2 :data-test="getDataTest()">{{ text }}</h2>
        <img class="menu-button-icon" src="@/assets/player-icon.svg" v-if="playerMatch" alt="">
        <img class="menu-button-icon" src="@/assets/cpu-icon.svg" v-if="cpuMatch" alt="">
    </div>
</template>

<script>
export default {
    name: 'MenuButtonComponent',
    props:['text', 'playerMatch', 'cpuMatch', 'action'],
    methods: {
        getContainerClass () {
            if (this.playerMatch) return 'menu-button-container-player'
            if (this.cpuMatch) return 'menu-button-container-cpu'
        },
        getDataTest(){
            if (this.playerMatch) return 'player-button'
            else if (this.cpuMatch) return 'cpu-button'
            else return 'rules-button'
        }
    }
}
</script>

<style scoped>
.menu-button-container{
    background-color: white;
    width: 85%;
    padding: 1vh 2vw;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 3px solid black;
    border-radius: 20px;
    box-shadow: 0 0.5em black;
    cursor: pointer;
}
.menu-button-container-player{
    background-color: #FFCE67;
}
.menu-button-container-cpu{
    background-color: #FD6687;
    color: white;
}
.menu-button-container:hover{
    box-shadow: 0 0.3em #5C2DD5;
    border: 3px solid #5C2DD5;
}
.menu-button-icon{
    height: 90%;
}
</style>