<template>
  <div class="overflow-x-auto" v-bind="$attrs">
    <table class="w-full" v-if="volunteerStore.volunteers">
      <thead>
        <tr>
          <td class="pb-3 pl-4 text-vologray-700 text-sm">
            Name<img :src="listSortArrows" class="pl-2 inline" />
          </td>
          <td class="pb-3 text-vologray-700 text-sm">
            Vorname<img :src="listSortArrows" class="pl-2 inline" />
          </td>
          <td class="pb-3 text-vologray-700 text-sm">
            Einsatzstelle<img :src="listSortArrows" class="pl-2 inline" />
          </td>
          <td class="pb-3 text-vologray-700 text-sm">
            Jahrgang<img :src="listSortArrows" class="pl-2 inline" />
          </td>
          <td class="pb-3 text-vologray-700 text-sm">
            Unterlagen<img :src="listSortArrows" class="pl-2 inline" />
          </td>
          <td class="pb-3 text-vologray-700 text-sm">
            gebuchte Seminare<img :src="listSortArrows" class="pl-2 inline" />
          </td>
        </tr>
      </thead>
      <tbody class="bg-white outline outline-white rounded">
        <tr
          class="border-b h-14"
          v-for="volunteer of volunteerStore.volunteers"
          :key="volunteer.id"
        >
          <td class="pl-4 font-bold">{{ volunteer.person.lastname }}</td>
          <td class="font-bold">{{ volunteer.person.firstname }}</td>
          <td>{{ volunteer.birthplace }}</td>
          <td>2023/24</td>
          <td>2/5</td>
          <td>25/25</td>
          <td class="text-voloblue-200"><IconDetailViewArrow /></td>
        </tr>
        <td class="bg-white text-voloblue-200 text-sm text-center py-2" colspan="7">
          <button @click="pageToFirst()">&lt;&lt;</button>
          <button @click="pageBackward()" class="px-12">&lt;</button
          >{{ volunteerStore.pageable.pageNumber + 1 }} / {{ volunteerStore.data.totalPages
          }}<button @click="pageForward()" class="px-12">&gt;</button>
          <button @click="pageToLast()">&gt;&gt;</button>
        </td>
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
  methods: {
    pageBackward() {
      if (this.volunteerStore.pageable.pageNumber != 0) {
        this.volunteerStore.pageable.pageNumber--
        this.volunteerStore.getVolunteers(this.volunteerStore.pageable.pageNumber)
        return
      }
    },
    pageForward() {
      if (this.volunteerStore.pageable.pageNumber !== this.volunteerStore.data.totalPages - 1) {
        this.volunteerStore.pageable.pageNumber++
        this.volunteerStore.getVolunteers(this.volunteerStore.pageable.pageNumber)
      }
      return
    },
    pageToLast() {
      this.volunteerStore.getVolunteers(this.volunteerStore.data.totalPages - 1)
      return
    },
    pageToFirst() {
      this.volunteerStore.getVolunteers(0)
      this.volunteerStore.pageable.pageNumber = 1
      return
    }
  },
  created() {
    this.volunteerStore.getVolunteers(0).catch((error) => {
      console.error('Error fetching volunteers:', error)
    })
    console.log('created')
    console.log(this.volunteerStore.volunteers)
  }
}
</script>
