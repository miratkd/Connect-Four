import { createRouter, createWebHistory } from 'vue-router'
import MainMenu from '../views/MainMenu.vue'
import Rules from '../views/Rules.vue'
import Math from '../views/Math.vue'

const routes = [
  {
    path: '/',
    name: 'mainMenu',
    component: MainMenu
  },
  {
    path: '/regras',
    name: 'rulesPage',
    component: Rules
  },
  {
    path: '/partida',
    name: 'mathPage',
    component: Math
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
