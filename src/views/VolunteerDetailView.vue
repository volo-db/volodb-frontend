<template>
  <div class="flex overflow-auto">
    <VolunteerDetailOverview />
    <div class="flex-1 bg-vologray-100 p-8 overflow-auto">
      <VolunteerDetailNavigationbar
        :navigation="['Dokumentation', 'Dokumente', 'Vereinbarung']"
        :active="selectedContextTab"
        @navLinkClick="openTab"
      />

      <div
        v-if="selectedContextTab === 'dokumentation' || selectedContextTab === 'dokumente'"
        class="flex justify-between mt-8"
      >
        <SearchBar
          v-if="selectedContextTab === 'dokumentation'"
          v-model="searchQuery"
          placeholder="Suche nach Aktivitäten"
        />
        <SearchBar v-if="selectedContextTab === 'dokumente'" placeholder="Suche nach Dokumenten" />
        <ButtonStandard
          v-if="selectedContextTab === 'dokumentation'"
          @click.prevent="setNote = true"
          >Aktivität hinzufügen</ButtonStandard
        >
        <ButtonStandard v-if="selectedContextTab === 'dokumente'"
          >Dokument hinzufügen</ButtonStandard
        >
      </div>

      <VolunteerDetailNotes
        :searchQuery="debouncedSearchQuery"
        class="mt-16"
        v-if="selectedContextTab === 'dokumentation'"
      />

      <ContainerModal v-if="setNote">
        <NotesFormular
          @saved="(setNote = false), getNotes()"
          @cancel="setNote = false"
          id="new-note"
          :title="'Neue Notiz für ' + volunteerStore.selectedVolunteer.person.firstname"
          :description="
            'Lege eine neue Notiz für ' + volunteerStore.selectedVolunteer.person.firstname + ' an.'
          "
          loadingText="speichere neue Notiz ..."
          submitButtonText="Notiz anlegen"
        />
      </ContainerModal>
    </div>
  </div>
</template>
<script>
import { useVolunteerStore } from '@/stores/VolunteerStore.js'
import VolunteerDetailNavigationbar from '@/components/VolunteerDetailNavigationbar.vue'
import VolunteerDetailNotes from '@/components/VolunteerDetailNotes.vue'
import VolunteerDetailOverview from '@/components/VolunteerDetailOverview.vue'
import ButtonStandard from '@/components/ButtonStandard.vue'
import SearchBar from '@/components/SearchBar.vue'
import debounce from 'lodash.debounce'
import ContainerModal from '@/components/ContainerModal.vue'
import NotesFormular from '@/components/NotesFormular.vue'

export default {
  components: {
    VolunteerDetailNavigationbar,
    VolunteerDetailNotes,
    VolunteerDetailOverview,
    ButtonStandard,
    SearchBar,
    ContainerModal,
    NotesFormular
  },
  name: 'VolunteerDetailView.vue',
  setup() {
    const volunteerStore = useVolunteerStore()

    return {
      volunteerStore
    }
  },
  data() {
    return {
      setNote: false,
      searchQuery: '',
      debouncedSearchQuery: ''
    }
  },
  computed: {
    selectedContextTab() {
      return this.$route.params.contextTab.toLowerCase()
    }
  },
  methods: {
    openTab(tabName) {
      this.$router.push({
        name: 'VolunteerDetailViewWithContext',
        params: {
          volunteerId: this.$route.params.volunteerId,
          contextTab: String(tabName).toLowerCase()
        }
      })
    },
    async getNotes() {
      let params = { volunteerId: this.$route.params.volunteerId }
      try {
        await this.volunteerStore.getVolunteerNotes(params)
      } catch (error) {
        console.error('Error fetching notes:', error)
      }
    },
    debouncedSearch: debounce((input, searchFunction) => {
      searchFunction(input)
    }, 1000)
  },
  watch: {
    searchQuery(newValue) {
      this.$router.push({ query: { search: newValue } })
      this.debouncedSearch(this.searchQuery, (input) => {
        this.debouncedSearchQuery = input
      })
    }
  },
  mounted() {
    this.debouncedSearchQuery = this.$route.query.search || ''
    this.searchQuery = this.debouncedSearchQuery
  }
}
</script>
