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
                color: volunteerStore.activeSortProperty === sortParameter[index] ? 'blue' : ''
              }"
            @click="volunteerStore.fetchSortedNotes(sortParameter[index],this.$route.params.volunteerId)"
          >
            {{ title }}
            <IconTableSortArrows
            :upArrowColor="
                  sortParameter[index] === volunteerStore.activeSortProperty &&
                  volunteerStore.sortOrder === 'asc'
                    ? 'blue'
                    : 'lightgrey'
                "
                :downArrowColor="
                  sortParameter[index] === volunteerStore.activeSortProperty &&
                  volunteerStore.sortOrder === 'desc'
                    ? 'blue'
                    : 'lightgrey'
                "
              class="inline"
            />
          </td>
        </tr>
      </thead>
      <tbody v-for="(note, index) of volunteerStore.volunteerNotes.content" :key="note.id" class="bg-white">
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
            <p class="inline pl-4" v-else>{{ note.type }}</p></td>
          <td>{{ note.user }}</td>
          <td>{{ note.timestamp.split("T").slice(0,1).join().split("-").reverse().join(".") }}</td>
          <td><IconArrowShowDetailSummary :class="{ 'transform rotate-180' : expandedRows.includes(index) }" /></td>         
        </tr>
        
        <tr v-if="expandedRows.includes(index)" :key="note.id">
          <td colspan="4" class="h-14 px-12 pb-4 border-b">
            <div>
              <p>{{ note.note }}</p>         
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
import IconMail from './IconMail.vue';
import IconMemo from './IconMemo.vue';
import IconPhoneIngoing from './IconPhoneIngoing.vue';
import IconPhoneOutgoing from './IconPhoneOutgoing.vue';

export default {
  setup: () => {
    const volunteerStore = useVolunteerStore()
    return { volunteerStore }
  },
  components: { IconArrowShowDetailSummary, IconTableSortArrows, IconMail, IconMemo, IconPhoneIngoing, IconPhoneOutgoing },
  data() {
    return {
      tableHead: ['Typ', 'Erstellt von', 'Datum'],
      sortParameter: [ 'type', 'username', 'timestamp',],
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
  async beforeMount() {
    try {
      this.volunteerStore.sortOrder = 'desc'
      this.volunteerStore.activeSortProperty = 'timestamp'
      this.volunteerStore.getNotes(this.$route.params.volunteerId)
      console.log(this.$route.params.volunteerId)
    } catch (error) {
      console.error('Error fetching notes:', error)      
    }
  }
}
</script>
