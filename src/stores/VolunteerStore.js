import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

const userStore = useStorage('user-store', {})

export const useVolunteerStore = defineStore('volunteerStore', {
  state: () => {
    return {
      fetching: false,
      userStore: userStore
    }
  },
  actions: {
    test(volunteer) {
      console.log(volunteer)
    },

    async saveVolunteer(volunteer) {
      this.fetching = true
      await fetch(`${import.meta.env.VITE_BASE_URL}/volunteers`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${this.userStore.token}`
        },
        body: JSON.stringify(volunteer)
      })
        .then((res) => {
          if (!res.ok) throw Error(`VoloDB-ERROR\n🙅‍♀️ posting new volunteer failed! (${res.status}`)
          return res.json()
        })
        .finally(() => (this.fetching = false))
    },
    async getUser() {
      this.fetching = true
      await fetch(`${import.meta.env.VITE_BASE_URL}/user`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${this.token}`
        }
      }).then((res) => {
        if (!res.ok) {
          this.logout()
          console.log(res.statusText)
          throw Error(`VoloDB-ERROR\n🙅‍♀️ ups! invalid token. Maybe expired... (${res.status})`)
        }
        return res.json()
      })
    }
  },
  getters: {}
})
