import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

const state = useStorage('user-store', {
  token: null,
  user: null,
  loggedIn: false,
  fetching: false
})

export const useUserStore = defineStore('userStore', {
  state: () => state,
  actions: {
    async login(email, password) {
      if (!email || email === '') return console.error(`VoloDB-ERROR:\n🤌 no email provided`)

      if (!password || password === '')
        return console.error(`VoloDB-ERROR:\n🤌 no password provided`)

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
          this.loggedIn = true
          this.getUser()
        })
        .catch((err) => {
          console.error(err)
          this.fetching = false
        })
    },
    getUser() {
      this.fetching = true
      fetch(`${import.meta.env.VITE_BASE_URL}/user`, {
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
          this.fetching = false
        })
        .catch((err) => {
          console.error(err)
          this.fetching = false
        })
    },
    logout() {
      state.value = null
    }
  }
})
