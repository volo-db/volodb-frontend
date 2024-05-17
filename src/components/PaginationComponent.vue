<template>
    
      <td class="bg-white text-voloblue-200 text-sm text-center py-2" colspan="7">
        <button @click="pageToFirst()">&lt;&lt;</button>
        <button @click="pageBackward()" class="px-12">&lt;</button
        >{{ volunteerStore.fetchedData.pageable.pageNumber + 1 }} /
        {{ volunteerStore.fetchedData.totalPages
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
      if (this.volunteerStore.fetchedData.pageable.pageNumber !== 0) {
        this.volunteerStore.fetchedData.pageable.pageNumber--
        this.volunteerStore.getVolunteers(this.volunteerStore.fetchedData.pageable.pageNumber)
      }
      return
    },
    pageForward() {
      if (this.volunteerStore.fetchedData.pageable.pageNumber !== this.volunteerStore.fetchedData.totalPages - 1) {
        this.volunteerStore.fetchedData.pageable.pageNumber++
        this.volunteerStore.getVolunteers(this.volunteerStore.fetchedData.pageable.pageNumber)
      }
      return
    },
    pageToLast() {
      this.volunteerStore.getVolunteers(this.volunteerStore.fetchedData.totalPages - 1)
    },
    pageToFirst() {
      this.volunteerStore.getVolunteers(0)
      this.volunteerStore.fetchedData.pageable.pageNumber = 1
    }
  },
}
</script>