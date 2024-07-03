<template>
  <div class="border-[3px] border-green-300 rounded-full p-2">
    <img :src="src" :alt="alt" class="aspect-square w-[110px] object-cover rounded-full" />
  </div>
  <!-- <div class="flex justify-center items-center aspect-square w-[110px] object-cover rounded-full">
    <IconPenEdit />
  </div> -->
</template>

<script>
import { useVolunteerStore } from '@/stores/VolunteerStore.js'
// import IconPenEdit from '@/components/IconPenEdit.vue'

export default {
  setup() {
    const volunteerStore = useVolunteerStore()
    const baseUrl = import.meta.env.VITE_BASE_URL

    return {
      volunteerStore,
      baseUrl
    }
  },
  //   components: { IconPenEdit },
  props: ['src', 'alt']
}
</script>
