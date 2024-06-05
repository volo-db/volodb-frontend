<template>
  <div class="overflow-x-auto" v-bind="$attrs">
    <div v-if="volunteerStore.volunteersPage">
      <table class="w-full">
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
            class="border-b h-14 cursor-pointer hover:text-voloblue-100 hover:bg-gray-50"
            v-for="volunteer of volunteerStore.volunteersPage.content"
            :key="volunteer.id"
            @click="goToDetails(volunteer.id)"
          >
            <td class="font-bold pl-4">{{ volunteer.person.lastname }}</td>
            <td class="font-bold">{{ volunteer.person.firstname }}</td>
            <td>{{ volunteer.birthplace }}</td>
            <td>2023/24</td>
            <td>2/5</td>
            <td>25/25</td>
            <td class="text-voloblue-200 pr-4 md:pr-1"><IconArrowGoto /></td>
          </tr>
        </tbody>
      </table>
      <PaginationController
        :currentPage="volunteerStore.volunteersPage.pageable.pageNumber"
        :totalPages="volunteerStore.volunteersPage.totalPages"
        @updatePage="updateVolunteerPage"
      />
    </div>
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
import IconTableSortArrows from './IconTableSortArrows.vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    IconArrowGoto,
    ModalContainer,
    IconSpinner,
    PaginationController,
    IconTableSortArrows
  },
  setup: () => {
    const volunteerStore = useVolunteerStore()
    const router = useRouter()
    return { volunteerStore, router }
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
  methods: {
    goToDetails(volunteerId) {
      this.$router.push({ name: 'VolunteerDetailView', params: { volunteerId } })
    },
    updateVolunteerPage(pageNumber) {
      this.volunteerStore.volunteersPage.pageable.pageNumber = pageNumber
      this.volunteerStore.getVolunteers(pageNumber)
    }
  },
  async beforeMount() {
    try {
      this.volunteerStore.sortOrder = 'asc'
      this.volunteerStore.activeSortProperty = 'person.lastname'
      await this.volunteerStore.getVolunteers()
    } catch (error) {
      console.error('Error fetching volunteers:', error)
    }
  }
}
</script>
