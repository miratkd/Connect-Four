import { createRouter, createWebHistory } from 'vue-router'
import MainMenu from '../views/MainMenu.vue'
import Rules from '../views/Rules.vue'

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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
