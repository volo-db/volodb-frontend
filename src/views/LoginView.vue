<template>
  <div class="bg-vologray-100">
    <div
      class="h-screen overflow-hidden grid grid-cols-[auto,1fr] lg:grid-cols-[auto,auto,1fr] max-w-screen-2xl divide-x"
    >
      <NavigationBar>
        <template v-slot:nav-button>
          <IconLogout />
        </template>
      </NavigationBar>

      <main class="bg-white flex flex-col justify-center items-baseline px-6 lg:px-64">
        <h1 class="text-4xl text-voloblue-200">Willkommen zurück!</h1>
        <h2 class="text-xl text-vologray-200 mt-2">Bitte logge dich in deinen Account ein.</h2>
        <form
          @submit.prevent="userStore.login(this.email, this.password)"
          class="flex flex-col mt-12"
        >
          <div class="border border-vologray-200 border-b-0 flex flex-col w-96 relative">
            <label class="hidden" for="email">E-mail Adresse</label>
            <span class="absolute top-0 left-1 text-left pt-1 text-gray-400 text-sm"
              >E-Mail Adresse</span
            >
            <input
              class="pt-6 outline-none focus:border-l-voloblue-200 focus:border-l-4 h-12 placeholder-transparent pl-1"
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
            <span class="absolute top-0 left-1 text-left pt-1 text-gray-400 text-sm">Passwort</span>
            <input
              class="pt-6 outline-none focus:border-l-voloblue-200 focus:border-l-4 h-12 placeholder-transparent pl-1"
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

          <!-- <p v-if="errorMessage != ''" class="text-red-500">{{ errorMessage }}</p> -->
        </form>
        <img :src="volodbLogo" alt="volodb-logo" class="lg:hidden text-start pt-20" />
        <!-- <button @click.prevent="userStore.logout()">logout</button>
        <p>{{ userStore.token }}</p> -->
      </main>

      <div class="justify-center items-center bg-vologray-100 hidden lg:flex">
        <img :src="volodbLogo" alt="volodb-logo" />
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/UserStore'
import NavigationBar from '@/components/NavigationBar.vue'
import volodbLogo from '@/assets/volodb-logo.svg'
import IconLogout from '@/components/IconLogout.vue'

export default {
  setup: () => {
    const userStore = useUserStore()

    return {
      userStore
    }
  },
  components: { NavigationBar, IconLogout },
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
