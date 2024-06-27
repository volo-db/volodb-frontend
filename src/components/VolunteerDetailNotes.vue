<template>
  <div v-if="volunteerStore.volunteerNotes">
    <table class="w-full">
      <thead>
        <tr>
          <td
            v-for="(title, index) in tableHead"
            :key="index"
            class="pb-3 text-vologray-700 text-sm cursor-pointer"
            :class="{ 'pl-4': index === 0 }"
            :style="{
              color: sortBy === sortParameter[index] ? '#0025FF' : '#8C97AF'
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
      <tbody v-for="(note, index) of volunteerStore.volunteerNotes" :key="note.id" class="bg-white">
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
                index === volunteerStore.volunteerNotes.length - 1 && !expandedRows.includes(index)
            }"
          >
            <IconMail
              class="text-vologray-600 opacity-60"
              v-if="note.type == 'email' || note.type == 'E-Mail'"
            />
            <IconMemo
              class="text-vologray-600 opacity-60"
              v-if="note.type == 'note' || note.type == 'Notiz'"
            />
            <IconPhoneIngoing
              class="text-vologray-600 opacity-60"
              v-if="note.type == 'phone incoming' || note.type == 'Eingehender Anruf'"
            />
            <IconPhoneOutgoing
              class="text-vologray-600 opacity-60"
              v-if="note.type == 'phone outgoing' || note.type == 'Ausgehender Anruf'"
            />
            <p class="inline pl-4" v-if="note.type == 'email' || note.type == 'E-Mail'">E-Mail</p>
            <p class="inline pl-4" v-else-if="note.type == 'note' || note.type == 'Notiz'">Notiz</p>
            <p
              class="inline pl-4"
              v-else-if="note.type == 'phone incoming' || note.type == 'Eingehender Anruf'"
            >
              Telefonat
            </p>
            <p
              class="inline pl-4"
              v-else-if="note.type == 'phone outgoing' || note.type == 'Ausgehender Anruf'"
            >
              Telefonat
            </p>
            <p class="inline pl-4" v-else>{{ note.type }}</p>
          </td>
          <td>{{ note.user }}</td>
          <td>{{ note.timestamp.split('T').slice(0, 1).join().split('-').reverse().join('.') }}</td>
          <td
            :class="{
              'rounded-tr-md ': index === 0,
              'rounded-br-md':
                index === volunteerStore.volunteerNotes.length - 1 && !expandedRows.includes(index)
            }"
          >
            <IconArrowShowDetailSummary
              class="text-voloblue-200 opacity-50"
              :class="{ 'transform rotate-180': expandedRows.includes(index) }"
            />
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
            <button v-if="note.user == userStore.user.email">
              <IconPenEdit class="text-vologray-600 opacity-60" @click="openEditModal(note)" />
            </button>
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
  </div>
</template>
<script>
import { useVolunteerStore } from '@/stores/VolunteerStore'
import { useUserStore } from '@/stores/UserStore'
import IconArrowShowDetailSummary from './IconArrowShowDetailSummary.vue'
import IconTableSortArrows from './IconTableSortArrows.vue'
import IconMail from './IconMail.vue'
import IconMemo from './IconMemo.vue'
import IconPhoneIngoing from './IconPhoneIngoing.vue'
import IconPhoneOutgoing from './IconPhoneOutgoing.vue'
import IconPenEdit from './IconPenEdit.vue'
import ContainerModal from '@/components/ContainerModal.vue'
import NotesFormular from '@/components/NotesFormular.vue'

export default {
  setup: () => {
    const volunteerStore = useVolunteerStore()
    const userStore = useUserStore()
    return { volunteerStore, userStore }
  },
  components: {
    IconArrowShowDetailSummary,
    IconTableSortArrows,
    IconMail,
    IconMemo,
    IconPhoneIngoing,
    IconPhoneOutgoing,
    IconPenEdit,
    ContainerModal,
    NotesFormular
  },
  props: {
    searchQuery: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableHead: ['Typ', 'Erstellt von', 'Datum'],
      sortParameter: ['type', 'username', 'timestamp'],
      expandedRows: [],
      sortOrder: 'desc',
      sortBy: 'timestamp',
      editNote: false,
      selectedNote: null
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
          page: this.page,
          pageSize: this.pageSize,
          search: this.searchQuery,
          volunteerId: this.$route.params.volunteerId
        }

      try {
        await this.volunteerStore.getVolunteerNotes({
          sortOrder: params.sortOrder,
          sortBy: params.sortBy,
          page: params.page,
          pageSize: params.pageSize,
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
    }
  },
  watch: {
    searchQuery: {
      async handler() {
        await this.getNotes()
      },
      immediate: true // This option ensures that the api is called initially with the initial prop value
    }
  }
}
</script>
