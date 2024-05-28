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
    },
    async fetchSortedProjects(sortBy) {
      this.fetching = true
      // call function for sortOrder
      this.defineSortOrder(sortBy)
      await fetch(
        `${import.meta.env.VITE_BASE_URL}/projects?page=0&sortField=${sortBy}&sortOrder=${this.sortOrder}`,
        {
          method: 'GET',
          headers: {
            authorization: `Bearer ${this.token}`
          }
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error(`ERROR:${res.status}`)
          }
          return res.json()
        })
        .then((data) => {
          this.projectsPage = data
        })
        .finally(() => (this.fetching = false))
    },
    defineSortOrder(sortProperty) {
      if (sortProperty === this.activeSortProperty) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.activeSortProperty = sortProperty
        this.sortOrder = 'asc' // Reset sortOrder to 'asc' when a new sortProperty is selected
      }
    }
  }
})
