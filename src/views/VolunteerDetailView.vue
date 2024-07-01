<template>
  <div class="flex overflow-auto">
    <VolunteerDetailOverview />
    <div class="flex-1 bg-vologray-100 p-8 overflow-auto">
      <VolunteerDetailNavigationbar
        :navigation="['Dokumentation', 'Dokumente', 'Vereinbarung']"
        :active="selectedContextTab"
        @navLinkClick="openTab"
      />
      <VolunteerDetailNotes class="mt-8" v-if="selectedContextTab === 'dokumentation'" />
    </div>
  </div>
</template>
<script>
import { useVolunteerStore } from '@/stores/VolunteerStore.js'
import VolunteerDetailNavigationbar from '@/components/VolunteerDetailNavigationbar.vue'
import VolunteerDetailNotes from '@/components/VolunteerDetailNotes.vue'
import VolunteerDetailOverview from '@/components/VolunteerDetailOverview.vue'
import debounce from 'lodash.debounce'

export default {
  components: {
    VolunteerDetailNavigationbar,
    VolunteerDetailNotes,
    VolunteerDetailOverview
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
  }
}
</script>
