import { defineStore } from 'pinia'

export const useVolunteerStore = defineStore('volunteerStore', {
  state: () => {
    return {
      fetching: false,
      token: JSON.parse(localStorage.getItem('user-store')).token,
      volunteerPage: null,
      activeSortProperty: '',
      sortOrder: 'asc'
    }
  },
  actions: {
    async saveVolunteer(volunteer) {
      // If there's no token, something went wrong
      if (!this.token) throw Error('VoloDB-ERROR\n🙅‍♀️ ups! not logged in.')

      this.fetching = true
      await fetch(`${import.meta.env.VITE_BASE_URL}/volunteers`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${this.token}`
        },
        body: JSON.stringify(volunteer)
      })
        .then((res) => {
          if (!res.ok) throw Error(`VoloDB-ERROR\n🙅‍♀️ posting new volunteer failed! (${res.status}`)
          return res.json()
        })
        .finally(() => (this.fetching = false))
    },
    async getVolunteers(pageNumber = 0) {
      this.fetching = true
      await fetch(
        `${import.meta.env.VITE_BASE_URL}/volunteers?page=${pageNumber}&sortField=person.lastname&sortOrder=asc`,
        {
          method: 'GET',
          headers: {
            authorization: `Bearer ${this.token}`
          }
        }
      )
        .then((res) => {
          console.log(res.status)
          if (!res.ok) {
            throw Error(`ERROR:${res.status}`)
          }
          return res.json()
        })
        .then((data) => {
          this.volunteerPage = data
        })
        .finally(() => (this.fetching = false))
    },
    async fetchSortedVolunteers(sortBy) {
      this.fetching = true
      // call function for sortOrder
      this.defineSortOrder(sortBy)
      await fetch(
        `${import.meta.env.VITE_BASE_URL}/volunteers?page=0&sortField=${sortBy}&sortOrder=${this.sortOrder}`,
        {
          method: 'GET',
          headers: {
            authorization: `Bearer ${this.token}`
          }
        }
      )
        .then((res) => {
          console.log(res.status)
          if (!res.ok) {
            throw Error(`ERROR:${res.status}`)
          }
          return res.json()
        })
        .then((data) => {
          this.volunteerPage = data
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
  },
  getters: {}
})
