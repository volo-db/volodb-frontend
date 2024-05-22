<template>
  <div class="overflow-x-auto" v-bind="$attrs">
    <table class="w-full" v-if="volunteerStore.volunteerPage">
      <thead>
        <tr class="pl-4">
          <td v-for="title in tableHead" :key="title" class="pb-3 text-vologray-700 text-sm">
            {{ title }}<img :src="listSortArrows" class="pl-2 inline" />
          </td>
        </tr>
      </thead>
      <tbody class="bg-white outline outline-white rounded">
        <tr
          class="border-b h-14"
          v-for="volunteer of volunteerStore.volunteerPage.content"
          :key="volunteer.id"
        >
          <td class="font-bold pl-4">{{ volunteer.person.lastname }}</td>
          <td class="font-bold">{{ volunteer.person.firstname }}</td>
          <td>{{ volunteer.birthplace }}</td>
          <td>2023/24</td>
          <td>2/5</td>
          <td>25/25</td>
          <td class="text-voloblue-200 pr-1"><IconDetailViewArrow /></td>
        </tr>
        <PaginationComponent class="w-full"/>
      </tbody>
    </table>
  </div>
  <ModalContainer v-if="volunteerStore.fetching">
    <div class="p-4 flex flex-row gap-2 items-center text-md"><icon-spinner />loading ...</div>
  </ModalContainer>
</template>

<script>
import listSortArrows from '../assets/logos/list-sort-arrows.svg'
import IconDetailViewArrow from './IconDetailViewArrow.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'
import ModalContainer from '@/components/ModalContainer.vue'
import IconSpinner from '@/components/IconSpinner.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
  components: { IconDetailViewArrow, ModalContainer, IconSpinner, PaginationComponent },
  setup: () => {
    const volunteerStore = useVolunteerStore()
    return { volunteerStore }
  },
  data() {
    return {
      listSortArrows,
      tableHead: ['Name', 'Vorname', 'Einsatzstelle', 'Jahrgang', 'Unterlagen', 'gebuchte Seminare']
    }
  }
}
</script>

