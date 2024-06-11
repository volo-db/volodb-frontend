<template>
  <div>
    <table class="w-full max-w-3xl">
      <thead>
        <tr>
          <td
            v-for="(title, index) in tableHead"
            :key="index"
            class="pb-3 text-vologray-700 text-sm cursor-pointer"
            :class="{'pl-4' : index === 0}"
          >
            {{ title }}
            <IconTableSortArrows class="inline" :upArrowColor="'lightgrey'" :downArrowColor="'lightgrey'"/>
          </td>
        </tr>
      </thead>
      <tbody
        v-for="(document, index) of volunteerStore.volunteerDocuments"
        :key="document.id"
        class="bg-white"
      >
        <tr
          @click="toggleExpand(index)"
          class="h-14 cursor-pointer hover:text-voloblue-100 hover:bg-gray-50 border-b"
          :class="{'border-none' : expandedRows.includes(index)}"
        >
          <td class="font-bold pl-4">{{ document.name }}</td>
          <td>{{ document.id }}</td>
          <td>
            <IconArrowShowDetailSummary :class="{ 'transform rotate-180': expandedRows.includes(index) }" />
          </td>
        </tr>
        <!-- row for expanded detail -->
        <tr v-if="expandedRows.includes(index)" :key="document.id">
          <td colspan="3" class="h-14 pl-4 border-b">
            <div>
              <!-- Your expanded content here -->
              <p>{{ document.description }}</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import IconArrowShowDetailSummary from './IconArrowShowDetailSummary.vue'
import IconTableSortArrows from './IconTableSortArrows.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'

export default {
  setup: () => {
    const volunteerStore = useVolunteerStore()
    return { volunteerStore }
  },
  components: {
    IconTableSortArrows,
    IconArrowShowDetailSummary,
   
  },
  data() {
    return {
      tableHead: ['Name', 'Datum'],
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
    this.volunteerStore.getDocuments()
  }
}
</script>
