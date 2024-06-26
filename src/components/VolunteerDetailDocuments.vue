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
        v-for="(document, index) of volunteerStore.volunteerDocuments"
        :key="document.id"
        class="bg-white"
      >
        <tr class="h-14 border-b hover:text-voloblue-100 hover:bg-gray-50">
          <td
            class="font-bold pl-4"
            :class="{
              'rounded-tl-md': index === 0,
              'rounded-bl-md': index === volunteerStore.volunteerDocuments.length - 1
            }"
          >
            {{ document.name }}
          </td>
          <td>{{ document.documentType.name }}</td>
          <td>{{ document.user }}</td>
          <td>
            {{ document.timestamp.split('T').slice(0, 1).join().split('-').reverse().join('.') }}
          </td>
          <td
            :class="{
              'rounded-tr-md ': index === 0,
              'rounded-br-md': index === volunteerStore.volunteerDocuments.length - 1
            }"
          >
            <ButtonSendAndDownload class="flex gap-1 justify-center items-center"
              >Download<IconArrowDownload
            /></ButtonSendAndDownload>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
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
    ButtonSendAndDownload,
    IconArrowDownload
  },
  data() {
    return {
      tableHead: ['Dokument', 'Typ', 'Name', 'Datum'],
      sortParameter: ['name', 'documentType.name', 'user', 'timestamp'],
      sortOrder: 'desc',
      sortBy: 'timestamp'
    }
  },
  methods: {
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
          volunteerId: this.$route.params.volunteerId
        }

      try {
        await this.volunteerStore.getVolunteerDocuments({
          sortOrder: params.sortOrder,
          sortBy: params.sortBy,
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
