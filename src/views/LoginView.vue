<template>
  <div class="flex">
    <main class="bg-white flex flex-col justify-center items-center px-6 w-full lg:px-64">
      <div>
        <img :src="volodbLogo" alt="volodb-logo" class="lg:hidden pb-8" />
        <h1 class="text-3xl text-voloblue-200">Willkommen zurück!</h1>
        <h2 class="text-xl text-vologray-400 mt-2">Bitte logge dich in deinen Account ein.</h2>
        <form
          @submit.prevent="userStore.login(this.email, this.password)"
          class="flex flex-col mt-12"
        >
          <div
            class="focus-within:border-l-voloblue-200 focus-within:border-l-4 outline outline-vologray-200 outline-1 border-l-4 border-transparent flex flex-col w-96 relative h-16"
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
            />
          </div>
          <div
            class="focus-within:border-l-voloblue-200 focus-within:border-l-4 outline outline-vologray-200 outline-1 border-l-4 border-transparent flex flex-col w-96 relative h-16"
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

    <div class="justify-center items-center bg-vologray-100 hidden lg:flex w-full">
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
      errorMessage: '',
      volodbLogo
    }
  }
}
</script>
