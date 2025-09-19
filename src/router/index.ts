import { createRouter, createWebHistory } from 'vue-router'
import TodoBoard from '../components/TodoBoard.vue'
import RegistrationPage from '../views/RegistrationPage.vue'
import TestCreateNote from '../views/TestCreateNote.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodoBoard
    },
    {
      path: '/register',
      name: 'register',
      component: RegistrationPage
    },
    {
      path: '/board/:id',
      name: 'board',
      component: TodoBoard,
      props: true
    },
    {
      path: '/test-create-note',
      name: 'test-create-note',
      component: TestCreateNote
    }
  ]
})

export default router 