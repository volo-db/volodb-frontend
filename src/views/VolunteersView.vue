<template>
  <main class="bg-vologray-100 px-8">
    <div class="flex justify-between pt-6">
      <SearchBar v-model="searchQuery" placeholder="Suche nach Freiwilligen" />
      <ButtonStandard @click.prevent="newVolunteerModal = true"
        >Freiwillige:n anlegen</ButtonStandard
      >
    </div>
    <VolunteerTable :searchQuery="searchQuery" class="w-full mt-12" />

    <ContainerModal v-if="newVolunteerModal">
      <VolunteerFormular @saved="redirectToCreatedVolunteer" @cancel="newVolunteerModal = false" />
    </ContainerModal>
  </main>
</template>

<script>
import ButtonStandard from '@/components/ButtonStandard.vue'
import ContainerModal from '@/components/ContainerModal.vue'
import VolunteerFormular from '@/components/VolunteerFormular.vue'
import VolunteerTable from '../components/VolunteerTable.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'
import SearchBar from '@/components/SearchBar.vue'
import debounce from 'lodash.debounce'

export default {
  name: 'VolunteersView',
  components: {
    ButtonStandard,
    SearchBar,
    ContainerModal,
    VolunteerFormular,
    VolunteerTable
  },
  setup: () => {
    const volunteerStore = useVolunteerStore()
    return { volunteerStore }
  },
  data() {
    return {
      newVolunteerModal: false,
      searchQuery: ''
    }
  },
  watch: {
    searchQuery(newValue) {
      this.$router.push({ query: { search: newValue } })
    }
  },
  methods: {
    debouncedSearch: debounce((input, searchFunction) => {
      searchFunction(input)
    }, 1000),
    redirectToCreatedVolunteer(volunteerId) {
      this.$router.push('/volunteers/' + volunteerId)
      this.newVolunteerModal = false
    }
  },
  mounted() {
    this.searchQuery = this.$route.query.search || ''
  }
}
</script>
