<template>
  <div class="flex">
    <div class="bg-white"><VolunteerDetailOverview /></div>

    <div class="flex-1 bg-vologray-100 p-8">
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
        <ButtonStandard v-if="selectedContextTab === 'dokumentation'"
          >Aktivität hinzufügen</ButtonStandard
        >
        <ButtonStandard v-if="selectedContextTab === 'dokumente'"
          >Dokument hinzufügen</ButtonStandard
        >
      </div>

      <VolunteerDetailNotes class="mt-16" v-if="selectedContextTab === 'dokumentation'" />
      <VolunteerDetailDocuments class="mt-16" v-if="selectedContextTab === 'dokumente'" />
    </div>
  </div>
</template>
<script>
import { useVolunteerStore } from '@/stores/VolunteerStore.js'
import VolunteerDetailNavigationbar from '@/components/VolunteerDetailNavigationbar.vue'
import VolunteerDetailNotes from '@/components/VolunteerDetailNotes.vue'
import VolunteerDetailOverview from '@/components/VolunteerDetailOverview.vue'
import VolunteerDetailDocuments from '@/components/VolunteerDetailDocuments.vue'
import ButtonStandard from '@/components/ButtonStandard.vue'
import SearchBar from '@/components/SearchBar.vue'

export default {
  components: {
    VolunteerDetailNavigationbar,
    VolunteerDetailNotes,
    VolunteerDetailOverview,
    ButtonStandard,
    SearchBar,
    VolunteerDetailDocuments
  },
  name: 'VolunteerDetailView.vue',
  setup() {
    const volunteerStore = useVolunteerStore()

    return {
      volunteerStore
    }
  },
  data() {
    return {}
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
