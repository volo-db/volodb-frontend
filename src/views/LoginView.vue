<template>
  <div class="flex">
    <main class="bg-white flex flex-col justify-center items-center px-6 w-full lg:px-64">
      <div>
        <img :src="volodbLogo" alt="volodb-logo" class="lg:hidden pb-8" />
        <h1 class="text-3xl text-voloblue-200">Willkommen zurück!</h1>
        <h2 class="text-xl text-vologray-400 mt-2">Bitte logge dich in deinen Account ein.</h2>
        <form @submit.prevent="onSubmit" class="flex flex-col mt-12" novalidate>
          <div
            class="focus-within:border-l-voloblue-200 focus-within:border-l-4 outline outline-vologray-200 outline-1 border-l-4 border-transparent flex flex-col w-96 relative h-16"
            :class="{ 'error-animation': errorMail || userStore.loginErrorMessage }"
          >
            <label for="email" class="text-vologray-300 text-sm pt-2 pl-4">E-mail Adresse</label>
            <input
              class="placeholder-transparent outline-none pl-4"
              type="text"
              id="email"
              name="email"
              v-model="email"
              placeholder="E-Mail Adresse"
              required
              autocomplete="off"
              v-if="!errorMail"
            />
          </div>
          <div
            class="focus-within:border-l-voloblue-200 focus-within:border-l-4 outline outline-vologray-200 outline-1 border-l-4 border-transparent flex flex-col w-96 relative h-16"
            :class="{ 'error-animation': errorPassword || userStore.loginErrorMessage}"
          >
            <label for="password" class="text-vologray-300 text-sm pt-2 pl-4">Passwort</label>
            <input
              class="placeholder-transparent outline-none pl-4"
              type="password"
              id="password"
              name="password"
              v-model="password"
              placeholder="Passwort"
              required
              v-if="!errorPassword"
            />
          </div>
          <button
            type="submit"
            id="submit"
            class="border rounded-lg text-white text-sm bg-voloblue-200 w-28 h-11 mt-20"
          >
            Einloggen
          </button>
        </form>
      </div>
    </main>

    <div class="justify-center items-center bg-vologray-100 hidden lg:flex w-full px-4">
      <img :src="volodbLogo" alt="volodb-logo" />
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/UserStore'
import { useRouter } from 'vue-router'
import volodbLogo from '@/assets/logos/volodb-logo.svg'

export default {
  setup: () => {
    const userStore = useUserStore()

    if (userStore.loggedIn) useRouter().replace({ name: 'VolunteersView' })

    return {
      userStore
    }
  },
  data() {
    return {
      email: '',
      password: '',
      // errorMessageMail: '',
      // errorMessagePassword: '',
      volodbLogo,
      errorMail: false,
      errorPassword: false,
      errorLogin: false
    }
  },
  methods: {
    errorAnimationMail() {
      this.errorMail = true
      setTimeout(() => {
        this.errorMail = false
      }, 1000)
    },
    errorAnimationPassword() {
      this.errorPassword = true
      setTimeout(() => {
        this.errorPassword = false
      }, 1000)
    },
    onSubmit() {
      this.validate()
    // if (this.errorMessageMail || this.errorMessagePassword)
      if (this.errorMail || this.errorPassword) {
        return
      }
      try {
        this.userStore.login(this.email, this.password)
      } catch (error) {
        console.log("HI ERROR:" + error)
        this.errorAnimationMail()
        this.errorAnimationPassword()
      }
    },
    validate() {
      // this.errorMessageMail = ''
      // this.errorMessagePassword = ''

      if (!this.email) {
        // this.errorMessageMail = 'Keine E-Mail angegeben!'
        console.error(`VoloDB-ERROR:\n🤌 no email provided`)
        // console.log('Error message for email set:', this.errorMessageMail)
        this.errorAnimationMail()
      }

      if (!this.password) {
        // this.errorMessagePassword = 'Kein Passwort angegeben!'
        console.error(`VoloDB-ERROR:\n🤌 no password provided`)
        this.errorAnimationPassword()
      }
    }
  }
}
</script>
