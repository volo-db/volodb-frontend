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
  <RouterView />
</template>

<script>

</script>

