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
      <tbody
        v-for="(note, index) of volunteerStore.volunteerNotes.content"
        :key="note.id"
        class="bg-white"
      >
        <tr
          @click="toggleExpand(index)"
          class="h-14 cursor-pointer hover:text-voloblue-100 hover:bg-gray-50 border-b"
          :class="{ 'border-none': expandedRows.includes(index) }"
        >
          <td class="font-bold pl-4">
            <IconMail class="text-vologray-600" v-if="note.type == 'email'" />
            <IconMemo v-if="note.type == 'note'" />
            <IconPhoneIngoing v-if="note.type == 'phone incoming'" />
            <IconPhoneOutgoing v-if="note.type == 'phone outgoing'" />
            <p class="inline pl-4" v-if="note.type == 'email'">E-Mail</p>
            <p class="inline pl-4" v-else-if="note.type == 'note'">Notiz</p>
            <p class="inline pl-4" v-else-if="note.type == 'phone incoming'">Telefonat</p>
            <p class="inline pl-4" v-else-if="note.type == 'phone outgoing'">Telefonat</p>
            <p class="inline pl-4" v-else>{{ note.type }}</p>
          </td>
          <td>{{ note.user }}</td>
          <td>{{ note.timestamp.split('T').slice(0, 1).join().split('-').reverse().join('.') }}</td>
          <td>
            <IconArrowShowDetailSummary
              class="mx-4"
              :class="{ 'transform rotate-180': expandedRows.includes(index) }"
            />
          </td>
        </tr>

        <tr v-if="expandedRows.includes(index)" :key="note.id">
          <td colspan="3" class="h-14 pl-8 pb-4 border-b">
            <p v-if="!edit" class="bg-vologray-100 px-4 py-2 mx-4">{{ note.note }}</p>
            <textarea v-if="edit" class="w-full" cols="3" :value="note.note" />
          </td>
          <td class="h-14 pb-4 border-b">
            <button><IconPenEdit class="mx-4" /></button>
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
import IconMail from './IconMail.vue'
import IconMemo from './IconMemo.vue'
import IconPhoneIngoing from './IconPhoneIngoing.vue'
import IconPhoneOutgoing from './IconPhoneOutgoing.vue'
import IconPenEdit from './IconPenEdit.vue'

export default {
  setup: () => {
    const volunteerStore = useVolunteerStore()
    return { volunteerStore }
  },
  components: {
    IconArrowShowDetailSummary,
    IconTableSortArrows,
    IconMail,
    IconMemo,
    IconPhoneIngoing,
    IconPhoneOutgoing,
    IconPenEdit
  },
  data() {
    return {
      tableHead: ['Typ', 'Erstellt von', 'Datum'],
      sortParameter: ['type', 'username', 'timestamp'],
      expandedRows: [],
      sortOrder: 'desc',
      sortBy: 'timestamp',
      page: 0,
      pageSize: 0,
      edit: true
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
          volunteerId: this.$route.params.volunteerId
        }

      try {
        await this.volunteerStore.getVolunteerNotes({
          sortOrder: params.sortOrder,
          sortBy: params.sortBy,
          page: params.page,
          pageSize: params.pageSize,
          volunteerId: params.volunteerId
        })
      } catch (error) {
        console.error('Error fetching notes:', error)
      }
    }
  },
  async beforeMount() {
    try {
      let params = {
        volunteerId: this.$route.params.volunteerId
      }
      this.volunteerStore.getVolunteerNotes(params)
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }
}
</script>
