<template>
  <div class="w-[70px] bg-white flex flex-col">
    <div class="flex justify-center items-center aspect-square">
      <img :src="smallVolodbLogo" alt="volodb-logo" />
    </div>
    <NavBarButton type="login" v-if="!userStore.loggedIn" />
    <NavBarButton type="dashboard" v-if="false" />
    <NavBarButton
      type="volunteers"
      @click="goToVolunteersView()"
      :active="$route.name == 'VolunteersView'"
      v-if="userStore.loggedIn"
    />
    <NavBarButton
      type="projects"
      @click="goToProjectsView()"
      :active="$route.name == 'ProjectsView'"
      v-if="userStore.loggedIn"
    />
    <NavBarButton type="seminars" v-if="false" />
    <div class="mt-auto"></div>
    <NavBarButton type="mail" v-if="false" />
    <NavBarButton type="settings" v-if="false" />
    <UserButton v-if="userStore.loggedIn" />
    <NavBarButton type="logout" @click="userStore.logout()" v-if="userStore.loggedIn" />
  </div>
</template>

<script>
import NavBarButton from '@/components/NavBarButton.vue'
import smallVolodbLogo from '@/assets/logo-volodb-small.svg'
import UserButton from '@/components/UserButton.vue'
import { useUserStore } from '@/stores/UserStore.js'

export default {
  components: { NavBarButton, UserButton },
  setup() {
    const userStore = useUserStore()

    return {
      userStore
    }
  },
  data() {
    return {
      smallVolodbLogo
    }
  },
  methods: {
    goToVolunteersView() {
      this.$router.push({ name: 'VolunteersView' })
    },
    goToProjectsView() {
      this.$router.push({ name: 'ProjectsView' })
    }
  }
}
</script>
