<template>
  <div v-if="volunteerStore.volunteerNotes">
    <table class="w-full max-w-3xl">
      <thead>
        <tr>
          <td
            v-for="(title, index) in tableHead"
            :key="index"
            class="pb-3 text-vologray-700 text-sm cursor-pointer"
            :class="{ 'pl-4': index === 0 }"
          >
            {{ title }}
            <IconTableSortArrows
              class="inline"
              :upArrowColor="'lightgrey'"
              :downArrowColor="'lightgrey'"
            />
          </td>
        </tr>
      </thead>
      <tbody v-for="(note, index) of volunteerStore.volunteerNotes" :key="note.id" class="bg-white">
        <tr
          @click="toggleExpand(index)"
          class="h-14 cursor-pointer hover:text-voloblue-100 hover:bg-gray-50 border-b"
          :class="{ 'border-none': expandedRows.includes(index) }"
        >
          <td class="font-bold pl-4">{{ note.name }}</td>
          <td>{{ note.id }}</td>
          <td>
            <IconArrowShowDetailSummary
              :class="{ 'transform rotate-180': expandedRows.includes(index) }" />
          </td>
        </tr>
        <!-- row for expanded detail -->
        <tr v-if="expandedRows.includes(index)" :key="note.id">
          <td colspan="3" class="h-14 pl-4 border-b">
            <div>
              <!-- Your expanded content here -->
              <p>{{ note.description }}</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { useVolunteerStore } from '@/stores/VolunteerStore'
import IconArrowShowDetailSummary from './IconArrowShowDetailSummary.vue'
import IconTableSortArrows from './IconTableSortArrows.vue'

export default {
  setup: () => {
    const volunteerStore = useVolunteerStore()
    return { volunteerStore }
  },
  components: { IconArrowShowDetailSummary, IconTableSortArrows },
  data() {
    return {
      tableHead: ['Typ', 'Erstellt von', 'Datum'],
      expandedRows: []
    }
  },
  methods: {
    toggleExpand(index) {
      const rowIndex = this.expandedRows.indexOf(index)
      if (rowIndex > -1) {
        this.expandedRows.splice(rowIndex, 1)
      } else {
        this.expandedRows.push(index)
      }
    }
  },
  mounted() {
    try {
      this.volunteerStore.getNotes(this.$route.params.volunteerId)
      console.log(this.$route.params.volunteerId)
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }
}
</script>
