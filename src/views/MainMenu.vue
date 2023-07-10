<template>
    <div class="main-menu-container">
        <div class="main-menu-body">
            <img class="main-menu-icon" src="@/assets/menuIcon.svg" alt="">
            <MenuButton :action="cpuClick" :cpuMatch="true" text="PLAY VS CPU" style="margin-top: 2vh;"/>
            <MenuButton :action="playerClick" :playerMatch="true" text="PLAY VS PLAYER" style="margin-top: 2vh;" />
            <MenuButton :action="rulesClick" text="GAME RULES" style="margin-top: 2vh;" />

        </div>
    </div>
</template>

<script>
import MenuButton from '@/components/MenuButton.vue';
export default {
    name: 'MainMenuView',
    components:{
        MenuButton
    },
    methods:{
        cpuClick () {
            console.log('cpu');
        },
        playerClick () {
            console.log('player');
        },
        rulesClick () {
            console.log('rules');
        }
    }
}
</script>
<style scoped>
.main-menu-container{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
.main-menu-body{
    background-color: #7945FF;
    height: 50vh;
    width: 35vw;
    border-radius: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid black;
    box-shadow: 0 0.4em black;
}
.main-menu-icon{
    margin-top: 20%;
}
</style>