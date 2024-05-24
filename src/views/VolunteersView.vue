<template>
  <main class="bg-vologray-100 px-8">
    <div class="flex justify-between pt-6">
      <SearchBar />
      <base-button @click.prevent="newVolunteerModal = true">Freiwillige:n anlegen</base-button>
      <modal-container v-if="newVolunteerModal">
        <new-volunteer @close="newVolunteerModal = false" />
      </modal-container>
    </div>

    <TableComponent class="w-full mt-12" />
  </main>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
import SearchBar from '@/components/SearchBar.vue'
import ModalContainer from '@/components/ModalContainer.vue'
import NewVolunteer from '@/components/NewVolunteer.vue'
import TableComponent from '../components/TableComponent.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'

export default {
  name: 'VolunteersView',
  components: { BaseButton, ModalContainer, NewVolunteer, TableComponent, SearchBar },
  setup: () => {
    const volunteerStore = useVolunteerStore()
    return { volunteerStore }
  },
  data() {
    return {
      newVolunteerModal: false
    }
  },
  async created() {
    try {
      await this.volunteerStore.getVolunteers()
    } catch (error) {
      console.error('Error fetching volunteers:', error)
    }
  }
}
</script>
