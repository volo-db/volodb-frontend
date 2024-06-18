import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import router from '@/router'
import { vdbFetchData } from '@/utils/api'

const BASE_URL = import.meta.env.VITE_BASE_URL

const state = useStorage('user-store', {
  latestToken: null,
  tokenRefreshTime: null,
  user: null,
  fetching: false
})

export const useUserStore = defineStore('userStore', {
  state: () => state,
  actions: {
    async login(email, password) {
      this.fetching = true
      await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email,
          password
        })
      })
        .then((res) => {
          if (!res.ok) throw Error(`VoloDB-ERROR\n🙅‍♀️ login failed! (${res.status}`)
          return res.json()
        })
        .then((res) => {
          this.latestToken = res.accessToken
          this.tokenRefreshTime = Date.now()
          this.getUser()
        })
        // .catch((error) => {
        //   this.loginErrorMessage = error
        // })
        .finally(() => (this.fetching = false))
    },
    async getUser() {
      this.fetching = true
      this.user = await vdbFetchData('user', 'GET')
      this.fetching = false
    },
    logout() {
      this.latestToken = null
      this.user = null
      router.replace({ name: 'LoginView' })
    },
    refreshToken() {
      // exit if token is less then half an hour old
      const tokenDuration = 1000 * 60 * Number(import.meta.env.VITE_TOKEN_DURATION) // Duration in Milliseconds
      if (this.tokenRefreshTime > Date.now() - tokenDuration) return

      fetch(`${BASE_URL}/auth/refresh`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${this.latestToken}`
        }
      })
        .then((res) => {
          if (!res.ok) {
            this.logout()
            throw Error(
              `VoloDB-ERROR\n🙅‍♀️ upsi! invalid token: Token has probably expired. (${res.status})`
            )
          }
          return res.json()
        })
        .then((token) => {
          this.latestToken = token.accessToken
          this.tokenRefreshTime = Date.now()
        })
    }
  },
  getters: {
    loggedIn(state) {
      return Boolean(state.latestToken)
    },
    token(state) {
      this.refreshToken()
      return state.latestToken
    }
  }
})
