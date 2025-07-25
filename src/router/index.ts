// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../page/home/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
]

const router = createRouter({
  history: createWebHistory(), // 或 createWebHashHistory()
  routes,
})

export default router