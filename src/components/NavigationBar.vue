<template>
  <div class="w-[70px] bg-white">
    <div class="flex justify-center items-center aspect-square">
      <img :src="smallVolodbLogo" alt="volodb-logo" />
    </div>
    <div>
      <NavBarButton type="login" />
      <NavBarButton type="dashboard" :active="true" />
      <NavBarButton type="volunteers" />
      <NavBarButton type="deployment-sites" />
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
  }
}
</script>
