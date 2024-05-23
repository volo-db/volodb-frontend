import { defineStore } from 'pinia'

export const useVolunteerStore = defineStore('volunteerStore', {
  state: () => {
    return {
      fetching: false,
      token: JSON.parse(localStorage.getItem('user-store')).token,
      selectedVolunteer: null,
      volunteersPage: null
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
    async getVolunteer(volunteerId) {
      //clear selected Volunteer
      this.selectedVolunteer = null

      // If there's no token, something went wrong
      if (!this.token) throw Error('VoloDB-ERROR\n🙅‍♀️ ups! not logged in.')

      this.fetching = true
      await fetch(`${import.meta.env.VITE_BASE_URL}/volunteers/${volunteerId}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${this.token}`
        }
      })
        .then((res) => {
          if (!res.ok) throw Error(`VoloDB-ERROR\n🙅‍♀️ fetching volunteer failed! (${res.status}`)
          return res.json()
        })
        .then((volunteer) => {
          this.selectedVolunteer = volunteer
        })
        .finally(() => (this.fetching = false))
    },

    async getVolunteers(pageNumber = 0) {
      this.fetching = true

      // If there's no token, something went wrong
      if (!this.token) throw Error('VoloDB-ERROR\n🙅‍♀️ ups! not logged in.')

      await fetch(`${import.meta.env.VITE_BASE_URL}/volunteers?page=${pageNumber}`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${this.token}`
        }
      })
        .then((res) => {
          if (!res.ok)
            throw Error(`VoloDB-ERROR\n🙅‍♀️ fetching new volunteers failed! (${res.status}`)
          return res.json()
        })
        .then((volunteersPage) => {
          this.volunteersPage = volunteersPage
        })
        .finally(() => (this.fetching = false))
    }
  },
  getters: {}
})
