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
          placeholder="Suche nach Aktivitäten"
        />
        <SearchBar v-if="selectedContextTab === 'dokumente'" placeholder="Suche nach Dokumenten" />
        <ButtonStandard
          v-if="selectedContextTab === 'dokumentation'"
          @click.prevent="newNotesModal = true"
          >Aktivität hinzufügen</ButtonStandard
        >
        <ButtonStandard v-if="selectedContextTab === 'dokumente'"
          >Dokument hinzufügen</ButtonStandard
        >
      </div>

      <VolunteerDetailNotes class="mt-16" v-if="selectedContextTab === 'dokumentation'" />

      <ContainerModal v-if="newNotesModal">
        <NotesFormular @saved="newNotesModal = false" @cancel="newNotesModal = false" />
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
      newNotesModal: false
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
    }
  }
}
</script>
