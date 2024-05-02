<template>
  <div class="h-screen overflow-hidden grid grid-cols-[auto,auto,1fr] max-w-screen-2xl divide-x">
    <NavigationBar class="w-24" />
    
    <main class="">
      <form @submit.prevent="onSubmit">
        <label for="email">Email:</label>
        <input type="text" id="email" name="email" v-model="email" placeholder="E-Mail" required />
        <label for="password">Passwort:</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          placeholder="Passwort"
          required
        />
        <button type="submit" id="submit" class="border border-black bg-slate-500">
          Einloggen
        </button>
        <p v-if="errorMessage != ''" class="text-red-500">{{ errorMessage }}</p>
      </form>
    </main>

    <div class="flex justify-center items-center bg-vologray-100">
        <img :src="volodbLogo" alt="volodb-logo" class="" >
    </div>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue"
import volodbLogo from "@/assets/volodb-logo.svg"

export default {
    components: {NavigationBar},
  data() {
    return {
      email: '',
      password: '',
      //   baseUrl: import.meta.env.VITE_BASEURL,
      token: '',
      errorMessage: '',
      volodbLogo,
    }
  },
  methods: {
    onSubmit() {
      this.errorMessage = ''
      fetch(import.meta.env.VITE_BASEURL + '/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.email,
          password: this.password
        })
      })
        .then((response) => {
          if (!response.ok) {
            // errorhandling
            if (response.status == 403) {
              this.errorMessage = 'Pls check your password and mail'
            }
            return
          }
          return response.json()
        })
        .then((token) => (this.token = token))
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>
