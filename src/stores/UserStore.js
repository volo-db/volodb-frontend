import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    token: null,
    user: null
  }),
  actions: {
    login(email, password) {
      if (!email || email === '') return console.error(`VoloDB-ERROR:\n🤌 no email provided`)

      if (!password || password === '')
        return console.error(`VoloDB-ERROR:\n🤌 no password provided`)

      fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
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
        .catch((err) => {
          console.error(err)
        })
    },
    getUser() {
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
        })
        .catch((err) => {
          console.error(err)
        })
    },
    logout() {
      this.token = null
      //router auf login-Seite
    }
  }
})
