<template>
  <main class="bg-vologray-100 px-8">
    <div class="flex justify-between pt-6">
      <div class="flex justify-between items-center w-96 h-11 bg-white px-4 py-2 border rounded-md">
        <input
          class="outline-none placeholder-vologray-300 w-full"
          type="text"
          placeholder="Suche nach Freiwilligen"
        />
        <IconSearch class="text-vologray-700" />
      </div>
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
import IconSearch from '../components/IconSearch.vue'
import ModalContainer from '@/components/ModalContainer.vue'
import NewVolunteer from '@/components/NewVolunteer.vue'
import TableComponent from '../components/TableComponent.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'

export default {
  name: 'VolunteersView',
  components: { BaseButton, IconSearch, ModalContainer, NewVolunteer, TableComponent },
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
      console.log(this.volunteerStore.volunteerPage.content)
    } catch (error) {
      console.error('Error fetching volunteers:', error)
    }
  }
}
</script>


