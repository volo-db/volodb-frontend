import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    token: null
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
          username: email,
          password: password
        })
      })
        .then((res) => {
          if (!res.ok) throw Error(`VoloDB-ERROR\n🙅‍♀️ login failed! (${res.status})`)
          return res.json()
        })
        .then((res) => {
          this.token = res.accessToken
        })
        .catch((err) => {
          console.error(err)
        })
    },
    logout() {
      this.token = null
    }
  }
})
