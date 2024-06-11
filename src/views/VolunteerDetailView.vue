<template>
  <div class="flex overflow-hidden">
    <VolunteerDetailOverview />
    <div class="flex-1 bg-vologray-100 p-8">
      <VolunteerDetailNavigationbar
        :navigation="['Dokumentation', 'Dokumente', 'Vereinbarung']"
        :active="selectedContextTab"
        @navLinkClick="openTab"
      />
      <div class="flex justify-between mt-8 max-w-3xl">
        <SearchBar v-if="selectedContextTab === 'dokumente'" placeholder="Suche nach Dokumenten"/>
        <ButtonStandard v-if="selectedContextTab === 'dokumente'">Dokument hinzufügen</ButtonStandard>
      </div>
      
      <VolunteerDetailsDocuments v-if="selectedContextTab === 'dokumente'" class="mt-16" />

      <VolunteerDetailMemo v-if="selectedContextTab === 'dokumentation'" />
 
    </div>
  </div>
</template>
<script>
import { useVolunteerStore } from '@/stores/VolunteerStore.js'
import VolunteerDetailNavigationbar from '@/components/VolunteerDetailNavigationbar.vue'
import VolunteerDetailMemo from '@/components/VolunteerDetailMemo.vue'
import VolunteerDetailOverview from '@/components/VolunteerDetailOverview.vue'
import VolunteerDetailsDocuments from '@/components/VolunteerDetailsDocuments.vue'
import SearchBar from '@/components/SearchBar.vue'
import ButtonStandard from '@/components/ButtonStandard.vue'

export default {
  components: {
    VolunteerDetailNavigationbar,
    VolunteerDetailOverview,
    VolunteerDetailMemo,
    VolunteerDetailsDocuments,
    SearchBar,
    ButtonStandard
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
