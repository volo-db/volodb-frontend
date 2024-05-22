<template>
    
      <td class="bg-white text-voloblue-200 text-sm text-center py-2" colspan="7">
        <button @click="pageToFirst()">&lt;&lt;</button>
        <button @click="pageBackward()" class="px-12">&lt;</button
        >{{ volunteerStore.volunteerPage.pageable.pageNumber + 1 }} /
        {{ volunteerStore.volunteerPage.totalPages
        }}<button @click="pageForward()" class="px-12">&gt;</button>
        <button @click="pageToLast()">&gt;&gt;</button>
      </td>
   
  </template>
  <script>
import { useVolunteerStore } from '@/stores/VolunteerStore'

export default {
  
  setup: () => {
    const volunteerStore = useVolunteerStore()
    return { volunteerStore }
  },

  methods: {
    pageBackward() {
      if (this.volunteerStore.volunteerPage.pageable.pageNumber !== 0) {
        this.volunteerStore.volunteerPage.pageable.pageNumber--
        this.volunteerStore.getVolunteers(this.volunteerStore.volunteerPage.pageable.pageNumber)
      }
      return
    },
    pageForward() {
      if (this.volunteerStore.volunteerPage.pageable.pageNumber !== this.volunteerStore.volunteerPage.totalPages - 1) {
        this.volunteerStore.volunteerPage.pageable.pageNumber++
        this.volunteerStore.getVolunteers(this.volunteerStore.volunteerPage.pageable.pageNumber)
      }
      return
    },
    pageToLast() {
      this.volunteerStore.getVolunteers(this.volunteerStore.volunteerPage.totalPages - 1)
    },
    pageToFirst() {
      this.volunteerStore.getVolunteers(0)
      this.volunteerStore.volunteerPage.pageable.pageNumber = 1
    }
  },
}
</script>