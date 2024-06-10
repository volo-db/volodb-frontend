<template>
  <div class="flex overflow-hidden">
    <VolunteerDetailOverview />
    <div class="flex-1 bg-vologray-100 p-8">
      <VolunteerDetailNavigationbar
        :navigation="['Dokumentation', 'Dokumente', 'Vereinbarung']"
        :active="selectedContextTab"
        @navLinkClick="openTab"
      />
    <VolunteerDetailMemo v-if="selectedContextTab === 'dokumentation'" />
    <VolunteerDetailsDocuments v-if="selectedContextTab === 'dokumente'"
    class="mt-16" />

    </div>
  </div>
</template>
<script>
import { useVolunteerStore } from '@/stores/VolunteerStore.js'
import VolunteerDetailNavigationbar from '@/components/VolunteerDetailNavigationbar.vue'
import VolunteerDetailMemo from '@/components/VolunteerDetailMemo.vue'
import VolunteerDetailOverview from '@/components/VolunteerDetailOverview.vue'
import VolunteerDetailsDocuments from '@/components/VolunteerDetailsDocuments.vue';

export default {
  components: {
    VolunteerDetailNavigationbar,
    VolunteerDetailOverview,
    VolunteerDetailMemo,
    VolunteerDetailsDocuments
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
