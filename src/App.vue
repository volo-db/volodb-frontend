<template>
  <div class="h-screen overflow-hidden grid grid-cols-[70px,auto] divide-x">
    <NavigationBar>
      <template v-slot:nav-icon>
        <IconLogin />
      </template>
    </NavigationBar>
    <RouterView />
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue'
import IconLogin from '@/components/IconLogin.vue'

export default {
  components: { NavigationBar, IconLogin }
}
</script>
