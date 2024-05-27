<template>
  <div class="overflow-x-auto" v-bind="$attrs">
    <table class="w-full" v-if="volunteerStore.volunteersPage">
      <thead>
        <tr>
          <td
            v-for="(title, index) in tableHead"
            @click="volunteerStore.fetchSortedVolunteers(sortParameter[index])"
            :key="index"
            class="pb-3 text-vologray-700 text-sm cursor-pointer"
            :class="{ 'pl-4': index === 0 }"
            :style="{
              color: volunteerStore.activeSortProperty === sortParameter[index] ? 'blue' : ''
            }"
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
              class="pl-2 inline w-5"
            />
          </td>
        </tr>
      </thead>
      <tbody class="bg-white outline outline-white rounded">
        <tr
          class="border-b h-14"
          v-for="volunteer of volunteerStore.volunteersPage.content"
          :key="volunteer.id"
        >
          <td class="font-bold pl-4">{{ volunteer.person.lastname }}</td>
          <td class="font-bold">{{ volunteer.person.firstname }}</td>
          <td>{{ volunteer.birthplace }}</td>
          <td>2023/24</td>
          <td>2/5</td>
          <td>25/25</td>
          <td class="text-voloblue-200"><IconArrowGoto /></td>
        </tr>
        <PaginationController class="w-full" />
      </tbody>
    </table>
  </div>
  <ModalContainer v-if="volunteerStore.fetching">
    <div class="p-4 flex flex-row gap-2 items-center text-md"><IconSpinner />loading ...</div>
  </ModalContainer>
</template>

<script>

import IconArrowGoto from './IconArrowGoto.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'
import ModalContainer from '@/components/ContainerModal.vue'
import IconSpinner from '@/components/IconSpinner.vue'
import PaginationController from '@/components/PaginationController.vue'

export default {
  components: { IconArrowGoto, ModalContainer, IconSpinner, PaginationController },
  setup: () => {
    const volunteerStore = useVolunteerStore()
    return { volunteerStore }
  },
  data() {
    return {
      tableHead: [
        'Name',
        'Vorname',
        'Einsatzstelle',
        'Jahrgang',
        'Unterlagen',
        'gebuchte Seminare'
      ],
      sortParameter: [
        'person.lastname',
        'person.firstname',
        'project',
        'year',
        'documents',
        'seminars'
      ]
    }
  },
  async beforeMount() {
    try {
      await this.volunteerStore.getVolunteers()
      console.log(this.volunteerStore.volunteersPage)
    } catch (error) {
      console.error('Error fetching volunteers:', error)
    }
  }
}
</script>
