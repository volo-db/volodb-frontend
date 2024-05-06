<template>
  <div class="flex">
    <!-- <div
      class="h-screen overflow-hidden grid grid-cols-[auto,1fr] lg:grid-cols-[auto,auto,1fr] max-w-screen-2xl divide-x"
    > -->
    <main class="bg-white flex flex-col justify-center items-center px-6 w-full lg:px-64">
      <div>
        <img :src="volodbLogo" alt="volodb-logo" class="lg:hidden pb-8" />
        <h1 class="text-3xl text-voloblue-200">Willkommen zurück!</h1>
      <h2 class="text-xl text-vologray-400 mt-2">Bitte logge dich in deinen Account ein.</h2>
      <form
        @submit.prevent="userStore.login(this.email, this.password)"
        class="flex flex-col mt-12"
      >
        <div class="border border-vologray-200 border-b-0 flex flex-col w-96 relative">
          <label class="hidden" for="email">E-mail Adresse</label>
          <span class="absolute top-0 left-0 text-left pt-2 pl-4 text-vologray-300 text-sm"
            >E-Mail Adresse</span
          >
          <input
            class="pt-6 outline-none  border-4 border-transparent focus:border-l-voloblue-200 focus:border-l-4 h-16 placeholder-transparent pl-3"
            type="text"
            id="email"
            name="email"
            v-model="email"
            placeholder="E-Mail Adresse"
            required
          />
        </div>

        <div class="border border-vologray-200 flex flex-col w-96 relative">
          <label class="hidden" for="password">Passwort</label>
          <span class="absolute top-0 left-0 text-left pt-2 pl-4 text-vologray-300 text-sm">Passwort</span>
          <input
            class="pt-6 outline-none border-4 border-transparent focus:border-l-voloblue-200 focus:border-l-4 h-16 placeholder-transparent pl-3"
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
import volodbLogo from '@/assets/logos/volodb-logo.svg'

export default {
  setup: () => {
    const userStore = useUserStore()

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
