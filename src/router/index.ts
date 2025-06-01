import { createRouter, createWebHistory } from 'vue-router'
import TodoBoard from '../components/TodoBoard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodoBoard
    },
    {
      path: '/board/:id',
      name: 'board',
      component: TodoBoard,
      props: true
    }
  ]
})

export default router 