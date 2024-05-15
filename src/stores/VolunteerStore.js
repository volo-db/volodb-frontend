import { defineStore } from 'pinia'

export const useVolunteerStore = defineStore('volunteerStore', {
  state: () => {
    return {
      fetching: false,
      token: JSON.parse(localStorage.getItem('user-store')).token,
      volunteers: {}
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
    async getVolunteers() {
      this.fetching = true
      await fetch(`${import.meta.env.VITE_BASE_URL}/volunteers`, {
        method: 'GET',
        headers: {
          // 'content-type': 'application/json',
          authorization: `Bearer ${this.token}`
        }
      })
        .then((res) => {
          console.log(res.status)
          if (!res.ok) {
            throw Error(`ERROR:${res.status}`)
          }
          return res.json()
        })
        .then((volunteers) => {
          this.volunteers = volunteers.content
        })
        .finally(() => (this.fetching = false))
    }
  },
  getters: {}
})