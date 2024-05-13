import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/UserStore'
import LoginView from '@/views/LoginView.vue'
import VolunteersView from '@/views/VolunteersView.vue'
import VolunteerDetailView from '@/views/VolunteerDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView
    },
    {
      path: '/',
      name: 'DashboardView',
      redirect: { name: 'VolunteersView' }
    },
    {
      path: '/volunteers',
      name: 'VolunteersView',
      component: VolunteersView
    },
    {
      path: '/volunteers/:volunteerId',
      name: 'VolunteersDetailView',
      component: VolunteerDetailView
    }
  ]
})

router.beforeEach(async (to) => {
  if (!useUserStore().loggedIn && to.name !== 'LoginView') return { name: 'LoginView' }
})

export default router
