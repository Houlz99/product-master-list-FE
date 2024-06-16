import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SkillIndex from '../views/skills/SkillIndex.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/skills',
      name: 'SkillIndex',
      component: SkillIndex
    },
    {
      path: '/skills/create',
      name: 'SkillCreate',
      component: () => import('../views/skills/SkillCreate.vue')
    },
    {
      path: '/skills/:id/edit',
      name: 'SkillEdit',
      component: () => import('../views/skills/SkillEdit.vue'),
      props: true,
    }
  ]
})

export default router
