import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

const state = useStorage('user-store', {
  token: null,
  user: null,
  fetching: false
})

export const useUserStore = defineStore('userStore', {
  state: () => state,
  actions: {
    async login(email, password) {
      this.fetching = true
      await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email,
          password
        })
      })
        .then((res) => {
          if (!res.ok) throw Error(`VoloDB-ERROR\n🙅‍♀️ login failed! (${res.status})`)
          return res.json()
        })
        .then((res) => {
          this.token = res.accessToken

          this.getUser()
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
      })
        .then((res) => {
          if (!res.ok) {
            this.logout()
            throw Error(`VoloDB-ERROR\n🙅‍♀️ ups! invalid token. Maybe expired... (${res.status})`)
          }
          return res.json()
        })
        .then((user) => {
          this.user = user
        })
        .finally(() => (this.fetching = false))
    },
    logout() {
      this.token = null
      this.user = null
    }
  },
  getters: {
    loggedIn(state) {
      return Boolean(state.token)
    }
  }
})
