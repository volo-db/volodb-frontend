<template>
  <div class="h-screen overflow-hidden grid grid-cols-[70px,auto] divide-x">
    <NavigationBar>
      <template v-slot:nav-icon>
        <IconLogout />
      </template>
    </NavigationBar>
    <RouterView />
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue'
import IconLogout from '@/components/IconLogout.vue'

export default {
  components: { NavigationBar, IconLogout }
}
</script>
