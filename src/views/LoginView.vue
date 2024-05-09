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
            :class="{ 'error-animation': errorMail }"
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
            :class="{ 'error-animation': errorPassword }"
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
          <BaseButton type="submit">Einloggen</BaseButton>
        </form>
        <!-- <ModalContainer v-if="this.userStore.fetching"> -->
        <ModalContainer v-if="userStore.fetching">
          <div class="p-4 flex flex-row gap-2 items-center text-md">
            <icon-spinner />logging in ...
          </div>
        </ModalContainer>
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
import BaseButton from '@/components/BaseButton.vue'
import ModalContainer from '@/components/ModalContainer.vue'
import IconSpinner from '@/components/IconSpinner.vue'

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
      volodbLogo,
      errorMail: false,
      errorPassword: false
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
    async onSubmit() {
      this.validate()
      if (this.errorMail || this.errorPassword) {
        return
      }
      try {
        await this.userStore.login(this.email, this.password)
        this.$router.push({ name: 'DashboardView' })
      } catch (error) {
        console.log(error)
        this.errorAnimationMail()
        this.errorAnimationPassword()
        this.email = ''
        this.password = ''
      }
    },
    validate() {
      if (!this.email) {
        console.error(`VoloDB-ERROR:\n🤌 no email provided`)
        this.errorAnimationMail()
      }

      if (!this.password) {
        console.error(`VoloDB-ERROR:\n🤌 no password provided`)
        this.errorAnimationPassword()
      }
    }
  },
  components: {
    BaseButton,
    ModalContainer,
    IconSpinner
  }
}
</script>
