<template>
  <div>
    <div class="flex justify-between mt-8">
      <SearchBar v-model="searchQuery" placeholder="Suche nach Dokumenten" />
      <ButtonStandard @click="uploadDocument = true">Dokument hinzufügen</ButtonStandard>
    </div>
    <div class="mt-16" v-if="volunteerStore.volunteerDocuments">
      <div
        v-if="!volunteerStore.volunteerDocuments || volunteerStore.volunteerDocuments.length == 0"
        class="flex flex-col items-center gap-8 text-vologray-700/30"
      >
        <p class="font-medium text-3xl">Noch keine Dokumente vorhanden</p>
        <IconFile class="text-[300px]" />
      </div>
      <table class="w-full">
        <thead v-if="volunteerStore.volunteerDocuments.length !== 0">
          <tr>
            <td
              v-for="(title, index) in tableHead"
              :key="index"
              class="pb-3 text-vologray-700 text-sm cursor-pointer"
              :class="{
                'pl-4': index === 0,
                'text-voloblue-200': sortBy === sortParameter[index],
                'text-black opacity-80': !(sortBy === sortParameter[index])
              }"
              @click="sortDocumentsList(sortParameter[index])"
            >
              {{ title }}
              <IconTableSortArrows
                :upArrowColor="
                  sortParameter[index] === sortBy && sortOrder === 'asc' ? '#0025FF' : 'darkgray'
                "
                :downArrowColor="
                  sortParameter[index] === sortBy && sortOrder === 'desc' ? '#0025FF' : 'darkgray'
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
              class="px-2"
              :class="{
                'rounded-tr-md ': index === 0,
                'rounded-br-md': index === volunteerStore.volunteerDocuments.length - 1
              }"
            >
              <div class="flex items-center gap-1">
                <div class="mr-auto">
                  <ButtonDownload class="flex gap-1 items-center"
                    >Download<IconArrowDownload
                  /></ButtonDownload>
                </div>

                <div class="flex gap-1" v-if="document.user == userStore.user.email">
                  <button title="editieren"><IconPenEdit class="opacity-80" /></button>
                  <button @click="handleDelete(document)" title="löschen">
                    <IconTrash class="opacity-80" />
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <ContainerModal v-if="uploadDocument"
        ><DocumentFormular
          @saved="(uploadDocument = false), getDocuments()"
          @cancel="uploadDocument = false"
        />
      </ContainerModal>
    </div>
  </div>
</template>

<script>
import IconTableSortArrows from './IconTableSortArrows.vue'
import ButtonDownload from './ButtonDownload.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'
import { useUserStore } from '@/stores/UserStore'
import IconArrowDownload from './IconArrowDownload.vue'
import ButtonStandard from '@/components/ButtonStandard.vue'
import SearchBar from '@/components/SearchBar.vue'
import debounce from 'lodash.debounce'
import ContainerModal from '@/components/ContainerModal.vue'
import DocumentFormular from '@/components/DocumentFormular.vue'
import IconPenEdit from './IconPenEdit.vue'
import IconTrash from './IconTrash.vue'
import IconFile from './IconFile.vue'

export default {
  setup: () => {
    const volunteerStore = useVolunteerStore()
    const userStore = useUserStore()

    return { volunteerStore, userStore }
  },
  components: {
    IconTableSortArrows,
    ButtonDownload,
    IconArrowDownload,
    ButtonStandard,
    SearchBar,
    ContainerModal,
    DocumentFormular,
    IconFile,
    IconPenEdit,
    IconTrash
  },
  data() {
    return {
      tableHead: ['Dokument', 'Typ', 'Name', 'Datum'],
      sortParameter: ['name', 'documentType.name', 'username', 'timestamp'],
      sortOrder: 'desc',
      sortBy: 'timestamp',
      searchQuery: '',
      debouncedSearchQuery: '',
      uploadDocument: false
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
    async handleDelete(document) {
      if (!window.confirm('Soll das Dokument wirklich gelöscht werden?')) return
      try {
        await this.volunteerStore.deleteDocument(document.id)
      } catch (error) {
        console.error('Error deleting document: ', error)
      } finally {
        this.getDocuments()
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
          const params = {
            sortOrder: this.sortOrder,
            sortBy: this.sortBy,
            search: input,
            volunteerId: this.$route.params.volunteerId
          }
          this.getDocuments(params)
        })
      },
      immediate: true // This option ensures that the api is called initially with the initial prop value
    }
  },
  mounted() {
    this.debouncedSearchQuery = this.$route.query.search || ''
    this.searchQuery = this.debouncedSearchQuery
  }
}
</script>
