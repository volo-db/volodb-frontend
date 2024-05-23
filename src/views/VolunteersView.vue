<template>
  <main class="bg-vologray-100 px-8">
    <div class="flex justify-between pt-6">
      <div class="flex justify-between items-center w-96 h-11 bg-white px-4 py-2 border rounded-md">
        <input
          class="outline-none placeholder-vologray-300"
          type="text"
          placeholder="Suche nach Freiwilligen"
        />
        <IconSearch class="text-vologray-700" />
      </div>
      <ButtonStandard @click.prevent="newVolunteerModal = true"
        >Freiwillige:n anlegen</ButtonStandard
      >
      <ContainerModal v-if="newVolunteerModal">
        <VolunteerFormular @close="newVolunteerModal = false" />
      </ContainerModal>
    </div>

    <VolunteerTable class="w-full mt-12" />
  </main>
</template>

<script>
import ButtonStandard from '@/components/ButtonStandard.vue'
import IconSearch from '../components/IconSearch.vue'
import ContainerModal from '@/components/ContainerModal.vue'
import VolunteerFormular from '@/components/VolunteerFormular.vue'
import VolunteerTable from '../components/VolunteerTable.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'

export default {
  name: 'VolunteersView',
  components: { ButtonStandard, IconSearch, ContainerModal, VolunteerFormular, VolunteerTable },
  setup: () => {
    const volunteerStore = useVolunteerStore()
    return { volunteerStore }
  },
  data() {
    return {
      newVolunteerModal: false
    }
  }
}
</script>
