<template>
    <div data-test="restart-alert-container" class="restart-alert-container" v-on:click="close">
        <div class="restart-alert-modal" v-on:click.stop="">
            <h1>Tem certeza que deseja reiniciar a partida?</h1>
            <h2>A pontuação dos dois jogadores voltara para 0.</h2>
            <button data-test="restart-alert-button" v-on:click="submit" class="restart-alert-button">Sim, reiniciar a partida</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RestartAlert',
    props: ['close', 'submit']
}
</script>

<style scoped>
.restart-alert-container{
    position: fixed;
    top: 0;
    height: 100vh;
    width: 100%;
    z-index: 8;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
}
.restart-alert-modal{
    background-color: white;
    min-height: 40vh;
    width: 50vw;
    border: 2px solid black;
    box-shadow: 0 0.4em black;
    border-radius: 20px;
    padding: 2vh 5vw;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.restart-alert-button{
    color: white;
    font-size: 1em;
    background-color: #5C2DD5;
    text-transform: uppercase;
    padding: 1vh 2vw;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 3vh;
}
.restart-alert-button:hover{
    background-color: #FD6687;
}

@media screen and (max-width: 1050px) and (orientation: Portrait) {
    .restart-alert-modal{
        width: 80vw;
    }
}
</style>