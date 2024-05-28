import { defineStore } from 'pinia'

export const useProjectStore = defineStore('ProjectStore', {
  state: () => {
    return {
      fetching: false,
      token: JSON.parse(localStorage.getItem('user-store')).token,
      projectsPage: null,
      sortOrder: 'asc',
      activeSortProperty: null
    }
  },
  actions: {
    async getProjects(pageNumber = 0) {
      this.fetching = true
      await fetch(
        `${import.meta.env.VITE_BASE_URL}/projects?page=${pageNumber}&sortField=capacity&sortOrder=asc`,
        {
          method: 'GET',
          headers: {
            authorization: `Bearer ${this.token}`
          }
        }
      )
        .then((res) => {
          if (!res.ok) throw Error(`VoloDB-ERROR\n🙅‍♀️ fetching new projects failed! (${res.status}`)
          return res.json()
        })
        .then((projectsPage) => {
          this.projectsPage = projectsPage
        })
        .finally(() => (this.fetching = false))
    }
  }
})
