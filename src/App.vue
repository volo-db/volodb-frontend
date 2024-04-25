<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      baseUrl: import.meta.env.VITE_BASEURL,
      token: ''
    }
  },
  methods: {
    login() {
      fetch(this.baseUrl + '/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.email,
          password: this.password
        })
      })
        .then((response) => response.json())
        .then((token) => (this.token = token))
    }
  }
}
</script>

<template>
  <form @submit.prevent="login">
    <label for="email" class="">Email:</label>
    <input type="text" id="email" v-model="email" class="border border-black" />
    <label for="password">Passwort:</label>
    <input type="password" id="password" v-model="password" class="border border-black" />
    <input type="submit" id="submit" value="submit" class="border border-black bg-slate-500" />
  </form>
</template>
