<template>
  <div class="h-screen overflow-hidden grid grid-cols-[70px,auto] divide-x">
    <NavigationBar />
    <RouterView />
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue'

export default {
  components: { NavigationBar }
}
</script>
