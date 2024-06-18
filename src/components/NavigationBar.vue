<template>
  <div class="w-[70px] bg-white">
    <div class="flex justify-center items-center aspect-square">
      <img :src="smallVolodbLogo" alt="volodb-logo" />
    </div>
    <div>
      <NavBarButton type="login" v-if="false" />
      <NavBarButton type="dashboard" v-if="false" />
      <NavBarButton
        type="volunteers"
        @click="goToVolunteersView()"
        :active="$route.name == 'VolunteersView'"
      />
      <NavBarButton
        type="projects"
        @click="goToProjectsView()"
        :active="$route.name == 'ProjectsView'"
      />
      <NavBarButton type="seminars" v-if="false" />
      <NavBarButton type="mail" v-if="false" />
      <NavBarButton type="settings" v-if="false" />
      <NavBarButton type="user-button" />
      <NavBarButton type="logout" v-if="false" />
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
