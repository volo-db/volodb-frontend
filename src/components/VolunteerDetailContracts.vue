<template>
  <div class="mt-0">
    <header class="flex justify-between mt-8">
      <SearchBar placeholder="Suche nach Vereinbarungen" />
      <ButtonStandard>Vereinbarung hinzufügen</ButtonStandard>
    </header>

    <!-- Grid -->
    <div class="grid grid-cols-2 gap-6 mt-8">
      <!-- Contract-Overview -->
      <section v-if="volunteerStore.selectedVolunteer" class="rounded bg-white p-5">
        <h2 class="inline font-medium">Vereinbarung</h2>
        <p class="inline text-vologray-400">
          - vom
          {{
            new Date(volunteerStore.selectedVolunteerRelevantContract.created).toLocaleDateString()
          }}
        </p>
        <!-- Pills -->
        <div class="flex gap-1">
          <div class="inline bg-voloblue-200 px-3 rounded-2xl">
            <p class="inline block text-white">FSJ</p>
          </div>
          <div class="inline bg-voloyellow-100 px-3 rounded-2xl">
            <p class="inline block">FSJ</p>
          </div>
        </div>
      </section>
      <section v-if="volunteerStore.selectedVolunteer" class="rounded bg-white p-5">
        <h2 class="inline font-medium">Vereinbarung</h2>
        <p class="inline text-vologray-400">
          - vom
          {{
            new Date(volunteerStore.selectedVolunteerRelevantContract.created).toLocaleDateString()
          }}
        </p>
      </section>
    </div>
  </div>
</template>
<script>
import { useVolunteerStore } from '@/stores/VolunteerStore'
import SearchBar from '@/components/SearchBar.vue'
import ButtonStandard from '@/components/ButtonStandard.vue'

export default {
  setup: () => {
    const volunteerStore = useVolunteerStore()
    return { volunteerStore }
  },
  components: {
    SearchBar,
    ButtonStandard
  }
}
</script>
