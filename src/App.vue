<script>
import { useUserStore } from '@/stores/UserStore'

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
      password: ''
    }
  }
}
</script>

<template>
  <form @submit.prevent="userStore.login(this.email, this.password)">
    <label for="email" class="">Email:</label>
    <input type="text" id="email" v-model="email" class="border border-black" />
    <label for="password">Passwort:</label>
    <input type="password" id="password" v-model="password" class="border border-black" />
    <input type="submit" id="submit" value="login" class="border border-black bg-slate-500" />
    <p>{{ userStore.token }}</p>
  </form>
  <button @click.prevent="userStore.logout()">logout</button>
</template>
