<template>
  <div>
    <div class="flex justify-between mt-8">
      <SearchBar v-model="searchQuery" placeholder="Suche nach Dokumenten" />
      <ButtonStandard>Dokument hinzufügen</ButtonStandard>
    </div>
    <div class="mt-16" v-if="volunteerStore.volunteerDocuments">
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
              <ButtonSendAndDownload class="flex gap-1 items-center mx-auto"
                >Download<IconArrowDownload
              /></ButtonSendAndDownload>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import IconTableSortArrows from './IconTableSortArrows.vue'
import ButtonSendAndDownload from './ButtonSendAndDownload.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'
import IconArrowDownload from './IconArrowDownload.vue'
import ButtonStandard from '@/components/ButtonStandard.vue'
import SearchBar from '@/components/SearchBar.vue'
import debounce from 'lodash.debounce'

export default {
  setup: () => {
    const volunteerStore = useVolunteerStore()
    return { volunteerStore }
  },
  components: {
    IconTableSortArrows,
    ButtonSendAndDownload,
    IconArrowDownload,
    ButtonStandard,
    SearchBar
  },
  data() {
    return {
      tableHead: ['Dokument', 'Typ', 'Name', 'Datum'],
      sortParameter: ['name', 'documentType.name', 'username', 'timestamp'],
      sortOrder: 'desc',
      sortBy: 'timestamp',
      searchQuery: '',
      debouncedSearchQuery: ''
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
          volunteerId: this.$route.params.volunteerId,
          search: this.searchQuery
        }

      try {
        await this.volunteerStore.getVolunteerDocuments({
          sortOrder: params.sortOrder,
          sortBy: params.sortBy,
          volunteerId: params.volunteerId,
          search: params.search
        })
      } catch (error) {
        console.error('Error fetching documents:', error)
      }
    },
    debouncedSearch: debounce((input, searchFunction) => {
      searchFunction(input)
    }, 1000)
  },
  watch: {
    searchQuery: {
      async handler(newValue) {
        this.$router.push({ query: { search: newValue } })

        this.debouncedSearch(newValue, (input) => {
          this.debouncedSearchQuery = input
        })

        await this.getDocuments()
      },
      immediate: true // This option ensures that the api is called initially with the initial prop value
    }
  },
  mounted() {
    this.debouncedSearchQuery = this.$route.query.search || ''
    this.searchQuery = this.debouncedSearchQuery
  }
  // beforeMount() {
  //   try {
  //     let params = {
  //       volunteerId: this.$route.params.volunteerId
  //     }
  //     this.volunteerStore.getVolunteerDocuments(params)
  //   } catch (error) {
  //     console.error('Error fetching documents:', error)
  //   }
  // }
}
</script>
