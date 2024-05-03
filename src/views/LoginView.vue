<template>
  <div class="bg-vologray-100">
  <div class="h-screen overflow-hidden grid grid-cols-[auto,1fr] lg:grid-cols-[auto,auto,1fr] max-w-screen-2xl divide-x">
    <NavigationBar  />   
    <main class="bg-white">
      <img :src="volodbLogo" alt="volodb-logo" class="lg:hidden m-auto mt-4" >
      <h1 class="text-4xl text-voloblue-100  mt-40  ml-12  ">Willkommen zurück!</h1>
          <h2 class="text-xl text-vologray-200 ml-12 mt-3">Bitte logge dich in deinen Account ein.</h2>
      <form @submit.prevent="userStore.login(this.email, this.password)" class="flex flex-col mt-12 mx-12">
        
        <div class="border border-vologray-200 border-b-0 flex flex-col w-96 relative">
          <label class="hidden" for="email">E-mail Adresse</label>
          <input class="outline-none  focus:border-l-voloblue-100 focus:border-l-4 h-12 placeholder-transparent mt-4 pl-1" type="text" id="email" name="email" v-model="email" placeholder="E-Mail Adresse" required />
          <span class="absolute top-0 left-1 text-left pt-1 text-gray-400">E-Mail Adresse</span>
        </div>

     <div  class="border border-vologray-200 flex flex-col  w-96">
      <label  class="hidden" for="password">Passwort</label>
        <input
        class="outline-none  focus:border-l-voloblue-100 focus:border-l-4 h-16"
          type="password"
          id="password"
          name="password"
          v-model="password"
          placeholder="Passwort"
          required
        />
    </div>
        
        <button type="submit" id="submit" class="border rounded text-white bg-voloblue-100 w-28 h-11 mt-12">
          Einloggen
        </button>
        <!-- <p v-if="errorMessage != ''" class="text-red-500">{{ errorMessage }}</p> -->
      </form>
      <button @click.prevent="userStore.logout()">logout</button>
      <p>{{ userStore.token }}</p>
    </main>

    <div class="justify-center items-center bg-vologray-100 hidden lg:flex">
        <img :src="volodbLogo" alt="volodb-logo" class="" >
    </div>
  </div>
</div>
</template>

<script>
import { useUserStore } from '@/stores/UserStore'
import NavigationBar from "@/components/NavigationBar.vue"
import volodbLogo from "@/assets/volodb-logo.svg"

export default {
  setup: () => {
    const userStore = useUserStore()

    return {
      userStore
    }
  },
  components: {NavigationBar},
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      volodbLogo,
    }
  },
  // methods: {
  //   onSubmit() {
  //     this.errorMessage = ''
  //     fetch(import.meta.env.VITE_BASEURL + '/api/v1/auth/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         username: this.email,
  //         password: this.password
  //       })
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           // errorhandling
  //           if (response.status == 403) {
  //             this.errorMessage = 'Pls check your password and mail'
  //           }
  //           return
  //         }
  //         return response.json()
  //       })
  //       .then((token) => (this.token = token))
  //       .catch((error) => {
  //         console.error(error)
  //       })
  //   }
  // }
}
</script>
