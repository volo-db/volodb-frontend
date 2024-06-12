<template>
  <div class="flex overflow-hidden">
    <VolunteerDetailOverview />
    <div class="flex-1 bg-vologray-100 p-8">
      <VolunteerDetailNavigationbar
        :navigation="['Dokumentation', 'Dokumente', 'Vereinbarung']"
        :active="selectedContextTab"
        @navLinkClick="openTab"
      />

      <div class="flex justify-between mt-8">
        <SearchBar placeholder="Suche nach Aktivitäten" />
        <ButtonStandard>Aktivität hinzufügen</ButtonStandard>
      </div>

      <VolunteerDetailNotes class="mt-16" v-if="selectedContextTab === 'dokumentation'" />
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

export default {
  components: {
    VolunteerDetailNavigationbar,
    VolunteerDetailNotes,
    VolunteerDetailOverview,
    ButtonStandard,
    SearchBar
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
  },
  async beforeMount() {
    await this.volunteerStore.getVolunteerNotes(this.$route.params.volunteerId)
  }
}
</script>
