import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/UserStore'
import LoginView from '../../pages/LoginView.vue'
import VolunteersView from '../../pages/VolunteersView.vue'
import VolunteerDetailView from '../../pages/VolunteerDetailView.vue'
import ProjectsView from '../../pages/ProjectsView.vue'

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
      name: 'VolunteerDetailView',
      redirect: (to) => {
        return {
          name: 'VolunteerDetailViewWithContext',
          params: { volunteerId: to.params.volunteerId, contextTab: 'dokumentation' }
        }
      }
    },
    {
      path: '/volunteers/:volunteerId/:contextTab',
      name: 'VolunteerDetailViewWithContext',
      component: VolunteerDetailView
    },
    {
      path: '/projects',
      name: 'ProjectsView',
      component: ProjectsView
    }
  ]
})

router.beforeEach(async (to) => {
  if (!useUserStore().loggedIn && to.name !== 'LoginView') return { name: 'LoginView' }
})

export default router
