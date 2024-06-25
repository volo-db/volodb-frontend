<template>
  <div v-if="volunteerStore.volunteerDocuments">
    <table class="w-full">
      <thead>
        <tr>
          <td
            v-for="(title, index) in tableHead"
            :key="index"
            class="pb-3 text-vologray-700 text-sm cursor-pointer"
            :class="{ 'pl-4': index === 0 }"
            :style="{ color: sortBy === sortParameter[index] ? '#0025FF' : '#8C97AF' }"
            @click="sortDocumentsList(sortParameter[index])"
          >
            {{ title }}
            <IconTableSortArrows
              :upArrowColor="
                sortParameter[index] === sortBy && sortOrder === 'asc' ? '#0025FF' : 'lightgrey'
              "
              :downArrowColor="
                sortParameter[index] === sortBy && sortOrder === 'desc' ? '#0025FF' : 'lightgrey'
              "
              class="inline"
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
          class="h-14 cursor-pointer"
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
                index === volunteerStore.volunteerDocuments.content.length - 1 &&
                !expandedRows.includes(index)
            }"
          >
            {{ document.documentType.name }}
          </td>
          <td>
            {{ document.timestamp.split('T').slice(0, 1).join().split('-').reverse().join('.') }}
          </td>
          <td
            :class="{
              'rounded-tr-md ': index === 0,
              'rounded-br-md':
                index === volunteerStore.volunteerDocuments.content.length - 1 &&
                !expandedRows.includes(index)
            }"
          >
            <IconArrowShowDetailSummary
              :class="{
                'transform rotate-180': expandedRows.includes(index)
              }"
            />
          </td>
        </tr>
        <!-- row for expanded detail -->
        <tr v-if="expandedRows.includes(index)" :key="document.id">
          <td
            colspan="3"
            class="h-14 pl-4 border-b"
            :class="{
              'rounded-br-md':
                index === volunteerStore.volunteerDocuments.content.length - 1 &&
                expandedRows.includes(index),
              'rounded-bl-md':
                index === volunteerStore.volunteerDocuments.content.length - 1 &&
                expandedRows.includes(index)
            }"
          >
            <div>
              <!-- Your expanded content here -->
              <p class="">
                {{ document.documentType.description }}
              </p>
              <div class="flex gap-2 justify-end py-2 pr-6">
                <ButtonSendAndDownload>Senden</ButtonSendAndDownload>
                <ButtonSendAndDownload class="flex gap-1 justify-center items-center"
                  >Download<IconArrowDownload
                /></ButtonSendAndDownload>
              </div>
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
import ButtonSendAndDownload from './ButtonSendAndDownload.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'
import IconArrowDownload from './IconArrowDownload.vue'

export default {
  setup: () => {
    const volunteerStore = useVolunteerStore()
    return { volunteerStore }
  },
  components: {
    IconTableSortArrows,
    IconArrowShowDetailSummary,
    ButtonSendAndDownload,
    IconArrowDownload
  },
  data() {
    return {
      tableHead: ['Name', 'Datum'],
      sortParameter: ['documentType.name', 'timestamp'],
      expandedRows: [],
      sortOrder: 'desc',
      sortBy: 'timestamp',
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
          page: params.page,
          pageSize: params.pageSize,
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
