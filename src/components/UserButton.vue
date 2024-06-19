<template>
  <button class="w-full flex justify-center items-center">
    <img
      v-if="userStore.user"
      :src="baseUrl + '/files/' + userStore.user.avatar"
      alt="Benutzer-Avatar"
      class="aspect-square w-[39px] object-cover rounded-full"
    />
  </button>
</template>

<!-- class="border-[3px] border-vologray-100 rounded-e-full" -->

<script>
import { useUserStore } from '@/stores/UserStore.js'

export default {
  name: 'UserButton',
  components: {},
  setup() {
    const userStore = useUserStore()
    const baseUrl = import.meta.env.VITE_BASE_URL

    return {
      userStore,
      baseUrl
    }
  }
}
</script>
