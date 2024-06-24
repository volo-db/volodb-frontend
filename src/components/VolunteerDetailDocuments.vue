<template>
  <div v-if="volunteerStore.volunteerDocuments">
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
      <tbody
        v-for="(document, index) of volunteerStore.volunteerDocuments.content"
        :key="document.id"
        class="bg-white"
      >
        <tr
          @click="toggleExpand(index)"
          class="h-14 cursor-pointer hover:text-voloblue-100 hover:bg-gray-50 border-b"
          :class="{
            'border-none': expandedRows.includes(index),
            ' hover:text-voloblue-100 hover:bg-gray-50 border-b': !expandedRows.includes(index)
          }"
        >
          <td
            class="font-bold pl-4"
            :class="{
              'rounded-tl-md': index === 0,
              'rounded-bl-md':
                index === volunteerStore.volunteerDocuments.length - 1 &&
                !expandedRows.includes(index)
            }"
          >
            {{ document.documentType.name }}
          </td>
          <td>
            {{ document.timestamp.split('T').slice(0, 1).join().split('-').reverse().join('.') }}
          </td>
          <td>
            <IconArrowShowDetailSummary
              class="mx-4"
              :class="{ 'transform rotate-180': expandedRows.includes(index) }"
            />
          </td>
        </tr>
        <!-- row for expanded detail -->
        <tr v-if="expandedRows.includes(index)" :key="document.id">
          <td colspan="3" class="h-14 pl-8 pb-4 border-b">
            <div>
              <!-- Your expanded content here -->
              <p class="bg-vologray-100 px-4 py-2 mx-4 rounded-md">
                {{ document.documentType.description }}
              </p>
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
    IconArrowShowDetailSummary
  },
  data() {
    return {
      tableHead: ['Name', 'Datum'],
      expandedRows: [],
      sortOrder: 'desc',
      sortBy: 'name',
      page: 0,
      pageSize: 10
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
    },
    sortDocumentsList(sortBy) {
      if (this.sortBy !== sortBy) {
        this.sortOrder === 'asc'
      } else {
        if (this.sortOrder === 'asc') {
          this.sortOrder = 'desc'
        } else {
          this.sortOrder = 'asc'
        }
      }

      this.sortBy = sortBy

      this.getDocuments()
    },
    async getDocuments(params) {
      if (!params)
        params = {
          sortOrder: this.sortOrder,
          sortBy: this.sortBy,
          page: this.page,
          pageSize: this.pageSize,
          volunteerId: this.$route.params.volunteerId
        }

      try {
        await this.volunteerStore.getVolunteerDocuments({
          sortOrder: params.sortOrder,
          sortBy: params.sortBy,
          // page: params.page,
          // pageSize: params.pageSize,
          volunteerId: params.volunteerId
        })
      } catch (error) {
        console.error('Error fetching documents:', error)
      }
    }
  },
  beforeMount() {
    try {
      let params = {
        volunteerId: this.$route.params.volunteerId
      }
      this.volunteerStore.getVolunteerDocuments(params)
    } catch (error) {
      console.error('Error fetching documents:', error)
    }
  }
}
</script>
