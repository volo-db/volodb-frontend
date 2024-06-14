<template>
  <div class="w-[70px] bg-white">
    <div class="flex justify-center items-center aspect-square">
      <img :src="smallVolodbLogo" alt="volodb-logo" />
    </div>
    <div>
      <NavBarButton type="login" />
      <NavBarButton type="dashboard" :active="$route.name == ''" />
      <NavBarButton
        type="volunteers"
        @click="goToVolunteersView()"
        :active="$route.name == 'VolunteersView'"
        class="hover:bg-vologray-100"
      />
      <NavBarButton
        type="projects"
        @click="goToProjectsView()"
        :active="$route.name == 'ProjectsView'"
        class="hover:bg-vologray-100"
      />
      <NavBarButton type="seminars" />
      <NavBarButton type="mail" />
      <NavBarButton type="settings" />
      <NavBarButton type="logout" />
      <NavBarButton type="user-button" />
    </div>
  </div>
</template>

<script>
import NavBarButton from '@/components/NavBarButton.vue'
import smallVolodbLogo from '@/assets/logo-volodb-small.svg'

export default {
  components: { NavBarButton },
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
