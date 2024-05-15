<template> 
<div>
    <table class="w-full" v-if="volunteerStore.volunteers.length > 0" >
      <thead>
        <tr>
          <td class="pr-8 pb-3 pl-3 text-vologray-700 text-sm">
            Name<img :src="listSortArrows" class="pl-2 inline" />
          </td>
          <td class="pr-8 pb-3 text-vologray-700 text-sm">
            Vorname<img :src="listSortArrows" class="pl-2 inline" />
          </td>
          <td class="pr-8 pb-3 text-vologray-700 text-sm">
            Einsatzstelle<img :src="listSortArrows" class="pl-2 inline" />
          </td>
          <td class="pr-8 pb-3 text-vologray-700 text-sm">
            Jahrgang<img :src="listSortArrows" class="pl-2 inline" />
          </td>
          <td class="pr-8 pb-3 text-vologray-700 text-sm">
            Unterlagen<img :src="listSortArrows" class="pl-2 inline" />
          </td>
          <td class="pr-8 pb-3 text-vologray-700 text-sm">
            gebuchte Seminare<img :src="listSortArrows" class="pl-2 inline" />
          </td>
        </tr>
      </thead>
      <tbody class="bg-white outline outline-white rounded">
        <tr
          class="border-b h-11"
          v-for="volunteer of volunteerStore.volunteers"
          :key="volunteer.id"
        >
          <td class="pr-8 pl-3 font-bold">{{ volunteer.person.lastname }}</td>
          <td class="pr-8 font-bold">{{ volunteer.person.firstname }}</td>
          <td class="pr-8">{{ volunteer.birthplace }}</td>
          <td class="pr-8">2023/24</td>
          <td class="pr-8">2/5</td>
          <td class="pr-8">25/25</td>
          <td class="text-voloblue-100"><IconDetailViewArrow /></td>
        </tr>
        <td class="bg-white text-voloblue-200 text-sm text-center" colspan="7">1/5</td>
      </tbody>
    </table>
    <ModalContainer v-if="volunteerStore.fetching">
      <div class="p-4 flex flex-row gap-2 items-center text-md"><icon-spinner />loading ...</div>
    </ModalContainer>
  </div>
</template>

<script>
import listSortArrows from '../assets/logos/list-sort-arrows.svg'
import IconDetailViewArrow from './IconDetailViewArrow.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'
import ModalContainer from '@/components/ModalContainer.vue'
import IconSpinner from '@/components/IconSpinner.vue'

export default {
  components: { IconDetailViewArrow, ModalContainer, IconSpinner },
  setup: () => {
    const volunteerStore = useVolunteerStore()
    return { volunteerStore }
  },
  data() {
    return {
      listSortArrows
    }
  },
  created() {
    this.volunteerStore.getVolunteers().catch((error) => {
      console.error('Error fetching volunteers:', error)
    })
    console.log('created')
    console.log(this.volunteerStore.volunteers)
  }
}
</script>


