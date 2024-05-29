<template>
  <main class="bg-vologray-100 px-8">
    <div class="flex justify-between pt-6">
     <SearchBar placeholder="Suche nach Freiwilligen" />
      <ButtonStandard @click.prevent="newVolunteerModal = true"
        >Freiwillige:n anlegen</ButtonStandard
      >
      <ContainerModal v-if="newVolunteerModal">
        <VolunteerFormular @close="redirectToCreatedVolunteer" />
      </ContainerModal>
    </div>

    <VolunteerTable class="w-full mt-12" />
  </main>
</template>

<script>
import ButtonStandard from '@/components/ButtonStandard.vue'
import ContainerModal from '@/components/ContainerModal.vue'
import VolunteerFormular from '@/components/VolunteerFormular.vue'
import VolunteerTable from '../components/VolunteerTable.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'
import SearchBar from '@/components/SearchBar.vue'

export default {
  name: 'VolunteersView',
  components: { ButtonStandard, SearchBar, ContainerModal, VolunteerFormular, VolunteerTable },
  setup: () => {
    const volunteerStore = useVolunteerStore()
    return { volunteerStore }
  },
  data() {
    return {
      newVolunteerModal: false
    }
  },
  methods: {
    redirectToCreatedVolunteer(volunteerId) {
      this.$router.push('/volunteers/' + volunteerId)
      this.newVolunteerModal = false
    }
  }
}
</script>
