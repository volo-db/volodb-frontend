<template>
  <div>
    <div class="flex justify-between mt-8">
      <SearchBar v-model="searchQuery" placeholder="Suche nach Aktivitäten" />
      <ButtonStandard @click.prevent="setNote = true">Aktivität hinzufügen</ButtonStandard>
    </div>
    <div class="mt-16" v-if="volunteerStore.volunteerNotes">
      <table class="w-full">
        <thead>
          <tr>
            <td
              v-for="(title, index) in tableHead"
              :key="index"
              class="pb-3 text-sm cursor-pointer"
              :class="{ 'pl-4': index === 0 }"
              :style="{
                color: sortBy === sortParameter[index] ? '#0025FF' : 'black' // #8C97AF
              }"
              @click="sortNotesList(sortParameter[index])"
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
          v-for="(note, index) of volunteerStore.volunteerNotes"
          :key="note.id"
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
                  index === volunteerStore.volunteerNotes.length - 1 &&
                  !expandedRows.includes(index)
              }"
            >
              <VolunteerDetailNotesTypeData :type="note.type" />
            </td>
            <td>{{ note.user }}</td>
            <td>
              {{ note.timestamp.split('T').slice(0, 1).join().split('-').reverse().join('.') }}
            </td>
            <td
              class="px-4"
              :class="{
                'rounded-tr-md ': index === 0,
                'rounded-br-md':
                  index === volunteerStore.volunteerNotes.length - 1 &&
                  !expandedRows.includes(index)
              }"
            >
              <div class="flex justify-end">
                <IconArrowShowDetailSummary
                  class="text-voloblue-200/50"
                  :class="{ 'transform rotate-180': expandedRows.includes(index) }"
                />
              </div>
            </td>
          </tr>

          <tr v-if="expandedRows.includes(index)" :key="note.id">
            <td
              colspan="3"
              class="h-14 pl-8 pb-4 border-b"
              :class="{
                'rounded-bl-md':
                  index === volunteerStore.volunteerNotes.length - 1 && expandedRows.includes(index)
              }"
            >
              <p class="bg-vologray-100 px-4 py-2 mx-4 rounded-md">{{ note.note }}</p>
            </td>
            <td
              class="h-14 border-b"
              :class="{
                'rounded-br-md':
                  index === volunteerStore.volunteerNotes.length - 1 && expandedRows.includes(index)
              }"
            >
              <div class="flex gap-1 mr-2 justify-start" v-if="note.user == userStore.user.email">
                <button @click="openEditModal(note)" title="editieren">
                  <IconPenEdit class="text-vologray-600 opacity-60" />
                </button>
                <button @click="handleDelete(note)" title="löschen">
                  <IconTrash class="text-vologray-600 opacity-60" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <ContainerModal v-if="editNote">
        <NotesFormular
          @saved="(editNote = false), getNotes()"
          @cancel="editNote = false"
          id="edited-note"
          title="Notiz bearbeiten"
          :description="
            'Bearbeite hier deine Notiz für ' +
            volunteerStore.selectedVolunteer.person.firstname +
            '.'
          "
          loadingText="speichere bearbeitete Notiz ..."
          submitButtonText="Speichern"
          :noteCopy="selectedNote"
        />
      </ContainerModal>
      <ContainerModal v-if="setNote">
        <NotesFormular
          @saved="(setNote = false), getNotes()"
          @cancel="setNote = false"
          id="new-note"
          :title="'Neue Notiz für ' + volunteerStore.selectedVolunteer.person.firstname"
          :description="
            'Lege eine neue Notiz für ' + volunteerStore.selectedVolunteer.person.firstname + ' an.'
          "
          loadingText="speichere neue Notiz ..."
          submitButtonText="Notiz anlegen"
        />
      </ContainerModal>
    </div>
  </div>
</template>
<script>
import { useVolunteerStore } from '@/stores/VolunteerStore'
import { useUserStore } from '@/stores/UserStore'
import IconArrowShowDetailSummary from './IconArrowShowDetailSummary.vue'
import IconTableSortArrows from './IconTableSortArrows.vue'
import IconPenEdit from './IconPenEdit.vue'
import IconTrash from './IconTrash.vue'
import ContainerModal from '@/components/ContainerModal.vue'
import NotesFormular from '@/components/NotesFormular.vue'
import ButtonStandard from '@/components/ButtonStandard.vue'
import SearchBar from '@/components/SearchBar.vue'
import debounce from 'lodash.debounce'
import VolunteerDetailNotesTypeData from '@/components/VolunteerDetailNotesTypeData.vue'

export default {
  setup: () => {
    const volunteerStore = useVolunteerStore()
    const userStore = useUserStore()
    return { volunteerStore, userStore }
  },
  components: {
    IconArrowShowDetailSummary,
    IconTableSortArrows,
    IconPenEdit,
    ContainerModal,
    NotesFormular,
    ButtonStandard,
    SearchBar,
    IconTrash,
    VolunteerDetailNotesTypeData
  },

  data() {
    return {
      tableHead: ['Typ', 'Erstellt von', 'Datum'],
      sortParameter: ['type', 'username', 'timestamp'],
      expandedRows: [],
      sortOrder: 'desc',
      sortBy: 'timestamp',
      editNote: false,
      setNote: false,
      selectedNote: null,
      searchQuery: '',
      debouncedSearchQuery: ''
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
    sortNotesList(sortBy) {
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

      this.getNotes()
    },
    async getNotes(params) {
      if (!params)
        params = {
          sortOrder: this.sortOrder,
          sortBy: this.sortBy,
          search: this.searchQuery,
          volunteerId: this.$route.params.volunteerId
        }

      try {
        await this.volunteerStore.getVolunteerNotes({
          sortOrder: params.sortOrder,
          sortBy: params.sortBy,
          search: params.search,
          volunteerId: params.volunteerId
        })
      } catch (error) {
        console.error('Error fetching notes:', error)
      }
    },
    openEditModal(note) {
      this.selectedNote = note
      this.editNote = true
      console.log(this.selectedNote.note)
    },
    async handleDelete(note) {
      if (!window.confirm('Soll die Notiz wirklich gelöscht werden?')) return
      try {
        await this.volunteerStore.deleteNote(note.id)
      } catch (error) {
        console.error('Error deleting note: ', error)
      } finally {
        this.getNotes()
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
          this.getNotes(params)
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
